const { each, filter, find } = require('lodash')
const { RESTDataSource } = require('apollo-datasource-rest')
const names = require('./names')

class CoinsAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://api.bittrex.com/v3/'
  }

  async getAllMarkets() {
    let response = await this.get('markets')
    const missingNames = []
    const missingNamesObj = []

    // Removing not needed markets
    response = filter(response, (coin) => {
      if (coin.tags.length) {
        if (coin.tags.indexOf('TOKENIZED_SECURITY') !== -1) {
          return false
        }
      }

      return coin.quoteCurrencySymbol === 'BTC'
    })

    // Add names
    each(response, (coin) => {
      const nameCoin = find(names, (name) => {
        return name.symbol === coin.baseCurrencySymbol
      })

      if (!nameCoin) {
        if (missingNames.indexOf(coin.baseCurrencySymbol) === -1) {
          missingNames.push(coin.baseCurrencySymbol)
        }
      }

      coin.id = coin.baseCurrencySymbol
      coin.name = nameCoin && nameCoin.name
      coin.symbol = coin.symbol.replace('-BTC', '')
    })

    // Order by name
    response.sort((a, b) => {
      // ignore upper and lowercase
      const nameA = a.name.toUpperCase()
      const nameB = b.name.toUpperCase()

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
      missingNamesObj.push({
        symbol: name,
        name: name
      })
    })

    if (!!missingNamesObj.length) {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(missingNamesObj))
    }

    return response
  }

  async getMarket(symbol) {
    const marketSymbol = `${symbol}-BTC`.toLowerCase()
    const response = await this.get(`markets/${marketSymbol}`)

    // Add names
    const nameCoin = find(names, (name) => {
      return name.symbol === response.baseCurrencySymbol
    })

    response.id = response.symbol = response.baseCurrencySymbol
    response.name = nameCoin && nameCoin.name

    return response
  }

  async getAllSummaries() {
    let response = await this.get('markets/summaries')

    // Removing not needed markets
    response = filter(response, (coin) => {
      return coin.symbol.search('-BTC') !== -1
    })

    each(response, (coin) => {
      coin.id = coin.symbol = coin.symbol.replace('-BTC', '')
    })

    return response
  }

  async getSummary(symbol) {
    const marketSymbol = `${symbol}-BTC`.toLowerCase()

    return await this.get(`markets/${marketSymbol}/summary`)
  }

  async getAllTickers() {
    let response = await this.get('markets/tickers')

    // Removing not needed markets
    response = filter(response, (coin) => {
      return coin.symbol.search('-BTC') !== -1
    })

    each(response, (coin) => {
      coin.id = coin.symbol = coin.symbol.replace('-BTC', '')
    })

    return response
  }

  async getTicker(symbol) {
    const marketSymbol = `${symbol}-BTC`.toLowerCase()

    return await this.get(`markets/${marketSymbol}/ticker`)
  }

  // get baseURL() {
  //   if (this.context.env === 'development') {
  //     return 'https://movies-api-dev.example.com/'
  //   } else {
  //     return 'https://movies-api.example.com/'
  //   }
  // }
}

module.exports = CoinsAPI
