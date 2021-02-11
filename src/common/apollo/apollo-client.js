/**
 * apollo-client.js
 */
import { ApolloClient } from '@apollo/client'
import { cache } from './apollo-cache'

// Initialize Apollo client with cache and state
export default new ApolloClient({
  cache,
  uri: 'http://localhost:4000/graphql',
  // headers: {
  //   authorization: localStorage.getItem('token') || '',
  //   'client-name': 'Space Explorer [web]',
  //   'client-version': '1.0.0',
  // },
  connectToDevTools: true
})
