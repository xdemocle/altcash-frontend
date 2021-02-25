import { each, filter, find, isUndefined } from 'lodash'
import {
  Coin,
  Count,
  DataSources,
  Metadata,
  MissingMarket,
  Pair,
  Summary,
  Ticker
} from './types'

const queryCoins = async (
  _: unknown,
  {
    limit,
    offset = 0,
    term,
    symbols
  }: {
    limit?: number
    offset: number
    term: string
    symbols: string
  },
  { dataSources }: { dataSources: DataSources }
): Promise<Coin[]> => {
  let markets = await dataSources.coinsAPI.getAllMarkets()
  const names = await dataSources.namesAPI.getAll()
  const missingNames: string[] = []
  const missingNamesArr: MissingMarket[] = []

  // Add names
  each(markets, (coin) => {
    const nameCoin = find(names, (name) => {
      return name.symbol === coin.baseCurrencySymbol
    })

    if (!nameCoin) {
      if (missingNames.indexOf(coin.baseCurrencySymbol) === -1) {
        missingNames.push(coin.baseCurrencySymbol)
      }
    } else {
      coin.name = nameCoin.name
    }

    coin.id = coin.baseCurrencySymbol
    coin.symbol = coin.symbol.replace('-BTC', '')
  })

  // Order by name
  markets.sort((a: Coin, b: Coin) => {
    // ignore upper and lowercase
    const nameA = a.name && a.name.toUpperCase()
    const nameB = b.name && b.name.toUpperCase()

    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }

    // names must be equal
    return 0
  })

  // Prepare array of missing names stringified
  each(missingNames, (name) => {
    missingNamesArr.push({
      symbol: name,
      name: name
    })
  })

  if (!!missingNamesArr.length) {
    // eslint-disable-next-line no-console
    console.log('missingNamesArr', JSON.stringify(missingNamesArr))
  }

  // Search feature or symbols one
  if (!isUndefined(symbols)) {
    limit = limit || 20

    if (!symbols.length) {
      markets = []
    } else {
      markets = filter(markets, (coin) => {
        return symbols.split('|').includes(coin.baseCurrencySymbol)
      })
    }
  } else if (term && term.length) {
    limit = limit || 20

    markets = filter(markets, (coin) => {
      return (
        (coin.name && coin.name.toLowerCase().search(term) !== -1) ||
        coin.baseCurrencySymbol.toLowerCase().search(term.toLowerCase()) !== -1
      )
    })
  }

  // Pagination feature
  if (limit) {
    markets = markets.slice(offset, offset + limit)
  }

  return markets
}

const queryCoin = async (
  _: unknown,
  { id }: { id: string },
  { dataSources }: { dataSources: DataSources }
): Promise<Coin> => {
  const response = await dataSources.coinsAPI.getMarket(id)
  const names = await dataSources.namesAPI.getAll()

  // Add names
  const nameMarket = find(names, (name) => {
    return name.symbol === response.baseCurrencySymbol
  })

  if (nameMarket) {
    response.name = nameMarket.name
  }

  // Add the id for client caching purpouse
  response.id = response.symbol = response.baseCurrencySymbol

  return response
}

const queryMetaCoin = async (
  _: unknown,
  { id }: { id: string },
  { dataSources }: { dataSources: DataSources }
): Promise<Metadata> => {
  const response: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
  } = await dataSources.metadataAPI.getCoin(id)

  const coin = response[id]

  coin.metadataId = coin.id
  coin.id = id

  return coin
}

const queryMetaAllCoins = async (
  _: unknown,
  __: unknown,
  { dataSources }: { dataSources: DataSources }
): Promise<Metadata[]> => {
  const response = await dataSources.namesAPI.getAll()

  return response
}

const queryMetaExperiment = async (
  _: unknown,
  __: unknown,
  { dataSources }: { dataSources: DataSources }
): Promise<Metadata[]> => {
  const response = await dataSources.metadataAPI.missingData()

  return response
}

const querySummaries = async (
  _: unknown,
  { symbols }: { symbols: string },
  { dataSources }: { dataSources: DataSources }
): Promise<Summary[]> => {
  let summaries = await dataSources.coinsAPI.getAllSummaries()

  // Search feature or symbols one
  if (!isUndefined(symbols)) {
    summaries = filter(summaries, (coin) => {
      return symbols.split('|').includes(coin.symbol)
    })
  }

  return summaries
}

const querySummary = async (
  _: unknown,
  { id }: { id: string },
  { dataSources }: { dataSources: DataSources }
): Promise<Summary> => {
  const response = await dataSources.coinsAPI.getSummary(id)

  // Add the id for client caching purpouse
  response.id = response.symbol = response.symbol.replace('-BTC', '')

  return response
}

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

const queryCount = async (
  _: unknown,
  { limit }: { limit: number },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  { dataSources }: { dataSources: DataSources }
): Promise<Count[]> => {
  const counts = []
  const markets = await dataSources.coinsAPI.getAllMarkets()
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

const queryPair = async (
  _: unknown,
  { pair }: { pair: string },
  { dataSources }: { dataSources: DataSources }
): Promise<Pair> => {
  const response = await dataSources.mybitxAPI.getPair(pair)

  return response
}

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    coins: queryCoins,
    coin: queryCoin,
    metaCoin: queryMetaCoin,
    metaCoinAll: queryMetaAllCoins,
    metaExperiment: queryMetaExperiment,
    summaries: querySummaries,
    summary: querySummary,
    tickers: queryTickers,
    ticker: queryTicker,
    count: queryCount,
    pair: queryPair
  }
}

export default resolvers
