const { ApolloServer, gql } = require('apollo-server')
const responseCachePlugin = require('apollo-server-plugin-response-cache')
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
    id: String!
    symbol: String!
    baseCurrencySymbol: String!
    quoteCurrencySymbol: String!
    minTradeSize: Float
    precision: Float
    status: String
    notice: String
    createdAt: String
    name: String
  }

  type Summary {
    id: String!
    symbol: String!
    high: Float
    low: Float
    volume: Float
    quoteVolume: Float
    percentChange: Float
    updatedAt: String
  }

  type Ticker {
    id: String!
    symbol: String!
    lastTradeRate: Float
    bidRate: Float
    askRate: Float
  }

  type Count {
    name: String!
    count: Float!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  type Query {
    coins(offset: Int, limit: Int, term: String, symbols: String): [Coin!]
    coin(id: String): Coin!
    summaries(symbols: String): [Summary!]
    summary(id: String): Summary!
    tickers(symbols: String): [Ticker!]
    ticker(id: String): Ticker!
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
  }),
  plugins: [responseCachePlugin()],
  cacheControl: {
    defaultMaxAge: 5
  }
})

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(` 🚀 Server ready at ${url}`)
})
