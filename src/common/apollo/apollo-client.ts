/**
 * apollo-client.ts
 */
import { ApolloClient } from '@apollo/client'
import { cache } from './apollo-cache'

const ROOT_URL =
  process.env.NODE_ENV !== 'development' ? '/altcash-fullstack' : ''

// Initialize Apollo client with cache and state
export const apolloClient = new ApolloClient({
  cache,
  uri: `${ROOT_URL}/graphql`,
  connectToDevTools: true
})
