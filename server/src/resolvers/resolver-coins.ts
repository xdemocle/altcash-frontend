import { each, filter, find, isUndefined } from 'lodash'
import { Coin, DataSources, MissingMarket } from '../types'

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

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    coins: queryCoins,
    coin: queryCoin
  }
}

export default resolvers
