/**
 * apollo-cache.js
 *
 * Todo: add apollo-link-persisted-queries cache for very large queries that can
 *       become bottlenecks for client performance.
 */
import { persistCache } from 'apollo-cache-persist'
import { InMemoryCache } from 'apollo-cache-inmemory'

// This is the same cache you pass into new ApolloClient and we going to use
// it also for persisting the cache locally.
const cache = new InMemoryCache()

const persistCacheInstance = persistCache({
  cache,
  storage: window.localStorage
})

// This is the same cache you pass into new ApolloClient and we going to use
// it also for local state.
export { cache, persistCacheInstance }
