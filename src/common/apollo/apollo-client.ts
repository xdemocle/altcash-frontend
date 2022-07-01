/**
 * apollo-client.ts
 */
import { ApolloClient } from '@apollo/client';
import { isServer } from '../utils';
import { cache } from './apollo-cache';

// Initialize Apollo client with cache and state
export const apolloClient = new ApolloClient({
  ssrMode: isServer(),
  cache,
  uri: isServer()
    ? process.env.NEXT_PUBLIC_GRAPHQL_SERVER + '/graphql'
    : '/graphql',
  connectToDevTools: true
});
