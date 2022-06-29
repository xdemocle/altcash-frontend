/**
 * apollo-client.ts
 */
import { ApolloClient } from '@apollo/client';
import { cache } from './apollo-cache';

// Initialize Apollo client with cache and state
export const apolloClient = new ApolloClient({
  cache,
  uri: process.env.NEXT_PUBLIC_API_URL || '/graphql',
  connectToDevTools: true
});
