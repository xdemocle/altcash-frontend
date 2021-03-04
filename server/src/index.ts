import { AccountsModule } from '@accounts/graphql-api'
import { Mongo } from '@accounts/mongo'
import { AccountsPassword } from '@accounts/password'
import { AccountsServer } from '@accounts/server'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchemaSync } from '@graphql-tools/load'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { RedisCache } from 'apollo-server-cache-redis'
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express'
import responseCachePlugin from 'apollo-server-plugin-response-cache'
import express from 'express'
import mongoose from 'mongoose'
import { join } from 'path'
import CoinsAPI from './datasources/coins'
import MetadataAPI from './datasources/metadata'
import MybitxAPI from './datasources/mybitx'
import NamesAPI from './datasources/names'
import resolverCoin from './resolvers/resolver-coins'
import resolverCount from './resolvers/resolver-count'
import resolverMeta from './resolvers/resolver-meta'
import resolverPair from './resolvers/resolver-pair'
import resolverSummaries from './resolvers/resolver-summaries'
import resolverTickers from './resolvers/resolver-tickers'

// We connect mongoose to our local mongodb database
mongoose.connect(
  `${process.env.MONGODB_URI || 'mongodb://localhost:27017/altstack'}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)

// We tell accounts-js to use the mongo connection
const accountsMongo = new Mongo(mongoose.connection)

const accountsPassword = new AccountsPassword({
  // You can customise the behavior of the password service by providing some options
})

const accountsServer = new AccountsServer(
  {
    // We link the mongo adapter to the server
    db: accountsMongo,
    // Replace this value with a strong random secret
    tokenSecret: 'my-super-random-secret'
  },
  {
    // We pass a list of services to the server, in this example we just use the password service
    password: accountsPassword
  }
)

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = loadSchemaSync(join(__dirname, 'schema.graphql'), {
  loaders: [new GraphQLFileLoader()]
})

// We generate the accounts-js GraphQL module
const accountsGraphQL = AccountsModule.forRoot({ accountsServer })

// A new schema is created combining our schema and the accounts-js schema
const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs([typeDefs, accountsGraphQL.typeDefs]),
  resolvers: mergeResolvers([
    accountsGraphQL.resolvers,
    resolverCoin,
    resolverCount,
    resolverMeta,
    resolverPair,
    resolverSummaries,
    resolverTickers
  ]),
  schemaDirectives: {
    ...accountsGraphQL.schemaDirectives
  }
})

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  schema,
  context: accountsGraphQL.context,
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
    defaultMaxAge: 29
  }
  // cors: {
  //   origin: '*',
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   preflightContinue: false,
  //   optionsSuccessStatus: 204,
  //   credentials: true
  // }
})

const app = express()

server.applyMiddleware({ app })

// The `listen` method launches a web server.
app.listen({ port: process.env.PORT || 4000 }, () =>
  // eslint-disable-next-line no-console
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT || 4000}${
      server.graphqlPath
    }`
  )
)
