const { RESTDataSource } = require('apollo-datasource-rest')
// const { each, filter, find } = require('lodash')
const names = require('./names')

const CMC_PRO_API_KEY = '8bc55a35-8d5b-4c69-ad40-d55a2b5a5b59'

class MetadataAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://pro-api.coinmarketcap.com/v1'
  }

  willSendRequest(request) {
    request.headers.set('X-CMC_PRO_API_KEY', CMC_PRO_API_KEY)
  }

  async getCoin(symbol) {
    let response = await this.get(`cryptocurrency/info?symbol=${symbol}`)

    return response
  }

  async getAllLogos() {
    return names
  }

  async missingData() {
    // const symbols = 'AR,ETH,EOS,FCT,GO,NEO,SG,SMBSWAP,TFC'
    const symbols = 'IOTA'
    let response = await this.get(`cryptocurrency/info?symbol=${symbols}`)
    console.log(response)

    const obj = []

    for (const [key, value] of Object.entries(response.data)) {
      arr.push({
        id: key,
        bittrexId: value.id,
        symbol: key,
        name: value.name,
        slug: value.slug,
        description: value.description,
        logo: value.logo
      })
    }

    return arr
  }
}

module.exports = MetadataAPI
