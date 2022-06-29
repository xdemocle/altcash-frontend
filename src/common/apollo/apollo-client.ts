/**
 * apollo-client.ts
 */
import { ApolloClient } from '@apollo/client';
import { cache } from './apollo-cache';

const isServer = typeof window === 'undefined';

// Initialize Apollo client with cache and state
export const apolloClient = new ApolloClient({
  ssrMode: isServer,
  cache,
  uri: '/graphql',
  connectToDevTools: true
});
