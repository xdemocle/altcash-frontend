/**
 * apollo-client.js
 */
import { ApolloClient } from 'apollo-client'
import link from './apollo-http-link'
import { cache } from './apollo-cache'

// Initialize Apollo client with cache and state
export default new ApolloClient({
  cache,
  link,
  connectToDevTools: true
})
