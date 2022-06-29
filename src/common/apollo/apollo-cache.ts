/**
 * apollo-cache.ts
 *
 * Todo: add apollo-link-persisted-queries cache for very large queries that can
 *       become bottlenecks for client performance.
 */
import { InMemoryCache } from '@apollo/client';
import {
  offsetLimitPagination // relayStylePagination,
  // concatPagination
} from '@apollo/client/utilities';
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';

// This is the same cache you pass into new ApolloClient and we going to use
// it also for persisting the cache locally.
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // coins: concatPagination(['term', 'symbols'])
        coins: offsetLimitPagination(['term', 'symbols'])
        // coins: {
        //   keyArgs: ['term', 'symbols'],
        //   merge(existing, incoming, { args: { offset, limit } }) {
        //     const merged = existing ? existing.slice(0) : []
        //     const start = offset ? offset : merged.length
        //     const end = start + incoming.length
        //     for (let i = start; i < end; ++i) {
        //       merged[i] = incoming[i - start]
        //     }
        //     debugger
        //     return merged.splice(start, limit)
        //   }
        // }
      }
    }
  }
});

let persistCacheInstance: Promise<void> | null = null;

if (typeof window !== 'undefined') {
  console.log('testrok');
  persistCacheInstance = persistCache({
    cache,
    storage: new LocalStorageWrapper(window.localStorage)
  });
} else {
  persistCacheInstance = persistCache({
    cache,
    storage: new LocalStorageWrapper({
      getItem: (key: string) => key || null,
      setItem: (key: string) => key || null,
      removeItem: (key: string) => key || null
    })
  });
}

export { cache, persistCacheInstance };
