/**
 * index.js
 *
 * Description: root file of our React app with Apollo/GraphQL support.
 *
 * Todo: add apollo-link-persisted-queries cache for very large queries that can
 *       become bottlenecks for client performance.
 */
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'
import { withClientState } from 'apollo-link-state'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'

import 'tachyons'
import './index.css'

import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

// This is the same cache you pass into new ApolloClient and we going to use
// it also for local state.
const cache = new InMemoryCache()

persistCache({
  cache,
  storage: window.localStorage
})

// Initialize the local state manager
const stateLink = withClientState({
  cache,
  resolvers: {
    Mutation: {
      updateNetworkStatus: (_, { isConnected }, { cache }) => {
        const data = {
          networkStatus: {
            __typename: 'NetworkStatus',
            isConnected
          }
        }
        cache.writeData({ data })
        return null
      }
    }
  }
})

// Initialize Apollo client with cache and state
const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
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
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)

registerServiceWorker()
