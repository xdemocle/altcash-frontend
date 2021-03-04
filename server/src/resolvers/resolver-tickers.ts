import { filter, isUndefined } from 'lodash'
import { DataSources, Ticker } from '../types'

const queryTickers = async (
  _: unknown,
  { symbols }: { symbols: string },
  { dataSources }: { dataSources: DataSources }
): Promise<Ticker[]> => {
  let tickers = await dataSources.coinsAPI.getAllTickers()

  // Search feature or symbols one
  if (!isUndefined(symbols)) {
    tickers = filter(tickers, (coin) => {
      return symbols.split('|').includes(coin.symbol)
    })
  }

  return tickers
}

const queryTicker = async (
  _: unknown,
  { id }: { id: string },
  { dataSources }: { dataSources: DataSources }
): Promise<Ticker> => {
  const response = await dataSources.coinsAPI.getTicker(id)

  // Add the id for client caching purpouse
  response.id = response.symbol = response.symbol.replace('-BTC', '')

  return response
}

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    tickers: queryTickers,
    ticker: queryTicker
  }
}

export default resolvers
