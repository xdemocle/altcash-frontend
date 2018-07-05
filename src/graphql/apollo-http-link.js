/**
 * apollo-http-link.js
 */
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import stateLink from './apollo-client-state'

export default ApolloLink.from([
  stateLink,
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        // eslint-disable-next-line no-console
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      )
    }
    if (networkError) {
      // eslint-disable-next-line no-console
      console.log(`[Network error]: ${networkError}`)
    }
  }),
  new HttpLink({
    uri: 'https://api.graph.cool/simple/v1/cjj71t3v94zjs0110qulaqo8n'
  })
])
