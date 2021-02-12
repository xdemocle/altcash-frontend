const { filter } = require('lodash')

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    // eslint-disable-next-line space-before-function-paren
    coins: async (parent, { limit, offset = 0, term }, { dataSources }) => {
      let coins = await dataSources.coinsAPI.getAllMarkets()

      // Search feature
      if (term) {
        coins = filter(coins, (coin) => {
          return (
            coin.name.toLowerCase().search(term) !== -1 ||
            coin.baseCurrencySymbol.toLowerCase().search(term) !== -1
          )
        })

        limit = limit || 20
      }

      // Pagination feature
      if (limit) {
        coins = coins.slice(offset, offset + limit)
      }

      return coins
    },
    // eslint-disable-next-line space-before-function-paren
    count: async (parent, { limit }, { dataSources }) => {
      const counts = []
      let coins = await dataSources.coinsAPI.getAllMarkets()

      counts.push({
        name: 'coins',
        count: coins.length
      })

      return counts
    }
  }
}

module.exports = resolvers
