/**
 * apollo-http-link.js
 */
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import stateLink from './apollo-client-state'

const uri = 'https://api.graph.cool/simple/v1/cjqnphxf13jgp0123cba1kp7f'

export default ApolloLink.from([
  stateLink,
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      )
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`)
    }
  }),
  new HttpLink({ uri })
])
