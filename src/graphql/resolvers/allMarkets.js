/* eslint-disable no-debugger */
/**
 * Initial state
 */
const allMarkets = {
  __typename: 'allMarkets',
  markets: {}
}

/**
 * Resolvers
 */
const updateMarket = (_, { market }, { cache, getCacheKey }) => {
  // const id = getCacheKey({ __typename: 'Market', id: market.MarketName })

  const data = {
    __typename: 'Market',
    ask: market.Ask
  }

  cache.writeData({ data })
  return null
}

export default {
  defaults: {
    allMarkets
  },
  resolvers: {
    Mutation: {
      updateMarket
    }
  }
}
