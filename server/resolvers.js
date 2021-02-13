/* eslint-disable space-before-function-paren */
const { filter, isUndefined } = require('lodash')

const queryCoins = async (
  parent,
  { limit, offset = 0, term, symbols },
  { dataSources }
) => {
  let coins = await dataSources.coinsAPI.getAllMarkets()

  // Search feature or symbols one
  if (!isUndefined(symbols)) {
    limit = limit || 20

    if (!symbols.length) {
      coins = []
    } else {
      symbols = symbols.split('|')

      coins = filter(coins, (coin) => {
        return symbols.includes(coin.baseCurrencySymbol)
      })
    }
  } else if (term && term.length) {
    limit = limit || 20

    coins = filter(coins, (coin) => {
      return (
        coin.name.toLowerCase().search(term) !== -1 ||
        coin.baseCurrencySymbol.toLowerCase().search(term) !== -1
      )
    })
  }

  // Pagination feature
  if (limit) {
    coins = coins.slice(offset, offset + limit)
  }

  return coins
}

const queryCount = async (parent, { limit }, { dataSources }) => {
  const counts = []
  let markets = await dataSources.coinsAPI.getAllMarkets()
  const activeMarkets = filter(markets, { status: 'ONLINE' })

  counts.push({
    name: 'markets',
    count: markets.length
  })

  counts.push({
    name: 'activeMarkets',
    count: activeMarkets.length
  })

  return counts
}

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    coins: queryCoins,
    count: queryCount
  }
}

module.exports = resolvers
