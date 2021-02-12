const { ApolloServer, gql } = require('apollo-server')
// const { RedisCache } = require('apollo-server-cache-redis')
// const { each } = require('lodash')
const resolvers = require('./resolvers')
const namesAPI = require('./datasources/names')
const CoinsAPI = require('./datasources/coins')

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Coin {
    symbol: String!
    baseCurrencySymbol: String!
    quoteCurrencySymbol: String!
    minTradeSize: Float
    precision: Float
    status: String
    createdAt: String
    name: String
    # name: CoinName!
  }

  type Count {
    name: String!
    count: Float!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  type Query {
    coins(offset: Int, limit: Int, term: String): [Coin!]
    count: [Count!]
  }
`

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    coinsAPI: new CoinsAPI(),
    namesAPI: namesAPI
  })
})

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(` 🚀 Server ready at ${url}`)
})
