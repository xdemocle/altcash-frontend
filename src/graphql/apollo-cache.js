/**
 * apollo-cache.js
 *
 * Todo: add apollo-link-persisted-queries cache for very large queries that can
 *       become bottlenecks for client performance.
 */
import { persistCache } from 'apollo-cache-persist'
import { InMemoryCache } from 'apollo-cache-inmemory'
import localforage from 'localforage'

// This is the same cache you pass into new ApolloClient and we going to use
// it also for persisting the cache locally.
const cache = new InMemoryCache()

// This will use a different driver order.
localforage.config({
  driver: [localforage.WEBSQL, localforage.INDEXEDDB]
})

const persistCacheInstance = persistCache({
  cache,
  storage: localforage
})

export { cache, persistCacheInstance }
