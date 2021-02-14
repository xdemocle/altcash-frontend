const { filter, find, isUndefined } = require('lodash')

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
        coin.baseCurrencySymbol.toLowerCase().search(term.toLowerCase()) !== -1
      )
    })
  }

  // Pagination feature
  if (limit) {
    coins = coins.slice(offset, offset + limit)
  }

  return coins
}

const queryCoin = async (parent, { id }, { dataSources }) => {
  const coins = await dataSources.coinsAPI.getAllMarkets()

  return find(coins, { id })
}

const querySummaries = async (parent, { symbols }, { dataSources }) => {
  let summaries = await dataSources.coinsAPI.getAllSummaries()

  // Search feature or symbols one
  if (!isUndefined(symbols)) {
    symbols = symbols.split('|')

    summaries = filter(summaries, (coin) => {
      return symbols.includes(coin.symbol)
    })
  }

  return summaries
}

const querySummary = async (parent, { id }, { dataSources }) => {
  const summaries = await dataSources.coinsAPI.getAllSummaries()

  return find(summaries, { id })
}

const queryTickers = async (parent, { symbols }, { dataSources }) => {
  let tickers = await dataSources.coinsAPI.getAllTickers()

  // Search feature or symbols one
  if (!isUndefined(symbols)) {
    symbols = symbols.split('|')

    tickers = filter(tickers, (coin) => {
      return symbols.includes(coin.symbol)
    })
  }

  return tickers
}

const queryTicker = async (parent, { id }, { dataSources }) => {
  const response = await dataSources.coinsAPI.getTicker(id)

  // Add the id for client caching purpouse
  response.id = response.symbol = response.symbol.replace('-BTC', '')

  return response
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
    coin: queryCoin,
    summaries: querySummaries,
    summary: querySummary,
    tickers: queryTickers,
    ticker: queryTicker,
    count: queryCount
  }
}

module.exports = resolvers
