/**
 * apollo-client.ts
 */
import { ApolloClient, ApolloLink, HttpLink } from '@apollo/client';
import { RetryLink } from '@apollo/client/link/retry';
import QueueLink from 'apollo-link-queue';
import { isServer } from '../utils';
import { cache } from './apollo-cache';

const offlineLink = new QueueLink();

if (!isServer()) {
  // Note: remove these listeners when your app is shut down to avoid leaking listeners.
  window.addEventListener('offline', () => offlineLink.close());
  window.addEventListener('online', () => offlineLink.open());
}

// Initialize Apollo client with cache and state
export const apolloClient = new ApolloClient({
  ssrMode: isServer(),
  cache,
  // uri: process.env.NEXT_PUBLIC_GRAPHQL_SERVER + '/graphql',
  connectToDevTools: true,
  link: ApolloLink.from([
    new RetryLink(),
    offlineLink,
    new HttpLink({ uri: process.env.NEXT_PUBLIC_GRAPHQL_SERVER + '/graphql' })
  ])
});
