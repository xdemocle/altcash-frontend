import { ApolloServer, gql } from 'apollo-server'
import { RedisCache } from 'apollo-server-cache-redis'
import responseCachePlugin from 'apollo-server-plugin-response-cache'
import CoinsAPI from './datasources/coins'
import MetadataAPI from './datasources/metadata'
import MybitxAPI from './datasources/mybitx'
import NamesAPI from './datasources/names'
import resolvers from './resolvers'

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

  type Metadata @cacheControl(maxAge: 604800) {
    id: String!
    metadataId: Float
    name: String
    symbol: String
    slug: String
    description: String
    logo: String
    urls: MetadataUrls
  }

  type MetadataUrls {
    website: [String]
    twitter: [String]
    chat: [String]
    message_board: [String]
    explorer: [String]
    reddit: [String]
    technical_doc: [String]
    source_code: [String]
    announcement: [String]
  }

  type Count {
    name: String!
    count: Float!
  }

  type Pair {
    ask: String
    bid: String
    last_trade: String
    pair: String
    rolling_24_hour_volume: String
    status: String
    timestamp: Float
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  type Query {
    coins(offset: Int, limit: Int, term: String, symbols: String): [Coin!]
    coin(id: String): Coin!
    metaCoin(id: String): Metadata!
    metaCoinAll: [Metadata!]
    metaExperiment: [Metadata!]
    summaries(symbols: String): [Summary!]
    summary(id: String): Summary!
    tickers(symbols: String): [Ticker!]
    ticker(id: String): Ticker!
    count: [Count!]
    pair(pair: String): Pair!
  }
`

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    coinsAPI: new CoinsAPI(),
    metadataAPI: new MetadataAPI(),
    namesAPI: new NamesAPI(),
    mybitxAPI: new MybitxAPI()
  }),
  cache: new RedisCache(
    process.env.REDIS_URL || {
      // https://github.com/luin/ioredis
      host: '127.0.0.1',
      port: 6379
    }
  ),
  plugins: [responseCachePlugin()],
  cacheControl: {
    defaultMaxAge: 20
  }
  // cors: {
  //   origin: '*',
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   preflightContinue: false,
  //   optionsSuccessStatus: 204,
  //   credentials: true
  // }
})

// The `listen` method launches a web server.
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(` 🚀 Server ready at ${url}`)
})
