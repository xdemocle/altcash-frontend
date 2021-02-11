/**
 * apollo-cache.js
 *
 * Todo: add apollo-link-persisted-queries cache for very large queries that can
 *       become bottlenecks for client performance.
 */
import { InMemoryCache } from '@apollo/client'
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist'
// import localforage from 'localforage'

// This is the same cache you pass into new ApolloClient and we going to use
// it also for persisting the cache locally.
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        coins: {
          read(existing, { args: { offset, limit } }) {
            // A read function should always return undefined if existing is
            // undefined. Returning undefined signals that the field is
            // missing from the cache, which instructs Apollo Client to
            // fetch its value from your GraphQL server.
            return existing && existing.slice(offset, offset + limit)
          },

          // The keyArgs list and merge function are the same as above.
          keyArgs: [],
          merge(existing, incoming, { args: { offset = 0 } }) {
            const merged = existing ? existing.slice(0) : []
            for (let i = 0; i < incoming.length; ++i) {
              merged[offset + i] = incoming[i]
            }
            return merged
          }
        }
      }
    }
  }
})

// This will use a different driver order.
// localforage.config({
//   driver: [localforage.WEBSQL, localforage.INDEXEDDB]
// })

const persistCacheInstance = persistCache({
  cache,
  // storage: localforage
  storage: new LocalStorageWrapper(window.localStorage)
})

export { cache, persistCacheInstance }
