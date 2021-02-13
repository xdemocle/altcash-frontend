/**
 * apollo-cache.js
 *
 * Todo: add apollo-link-persisted-queries cache for very large queries that can
 *       become bottlenecks for client performance.
 */
import { InMemoryCache } from '@apollo/client'
import {
  // offsetLimitPagination,
  // relayStylePagination,
  concatPagination
} from '@apollo/client/utilities'
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist'

// This is the same cache you pass into new ApolloClient and we going to use
// it also for persisting the cache locally.
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        coins: concatPagination(['term', 'symbols'])
      }
    }
  }
})

const persistCacheInstance = persistCache({
  cache,
  storage: new LocalStorageWrapper(window.localStorage)
})

export { cache, persistCacheInstance }
