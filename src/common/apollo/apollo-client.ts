/**
 * apollo-client.ts
 */
import { ApolloClient, ApolloLink, HttpLink } from '@apollo/client';
import { RetryLink } from '@apollo/client/link/retry';
import { isServer } from '../utils';
import { cache } from './apollo-cache';

const uri =
  process.env.NODE_ENV !== 'development'
    ? 'https://altcash.vercel.app/graphql'
    : process.env.NEXT_PUBLIC_GRAPHQL_SERVER + '/graphql';

// Initialize Apollo client with cache and state
export const apolloClient = new ApolloClient({
  ssrMode: isServer(),
  cache,
  link: ApolloLink.from([new RetryLink(), new HttpLink({ uri })])
});
