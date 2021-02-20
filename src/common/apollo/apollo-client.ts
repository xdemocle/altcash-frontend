/**
 * apollo-client.ts
 */
import { ApolloClient } from '@apollo/client'
import { cache } from './apollo-cache'

// Initialize Apollo client with cache and state
export const apolloClient = new ApolloClient({
  cache,
  // uri: 'http://localhost:4000/graphql',
  uri: '/graphql',
  // headers: {
  //   authorization: localStorage.getItem('token') || '',
  //   'client-name': 'Space Explorer [web]',
  //   'client-version': '1.0.0',
  // },
  connectToDevTools: true
})
