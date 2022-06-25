import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { RedisCache } from 'apollo-server-cache-redis';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import responseCachePlugin from 'apollo-server-plugin-response-cache';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { join } from 'path';
import CoinsAPI from './datasources/coins';
import MetadataAPI from './datasources/metadata';
import MybitxAPI from './datasources/mybitx';
import NamesAPI from './datasources/names';
import resolverCoin from './resolvers/resolver-coins';
import resolverCount from './resolvers/resolver-count';
import resolverMeta from './resolvers/resolver-meta';
import resolverPair from './resolvers/resolver-pair';
import resolverSummaries from './resolvers/resolver-summaries';
import resolverTickers from './resolvers/resolver-tickers';

// We connect mongoose to our local mongodb database
mongoose.connect(
  `${process.env.MONGODB_URI || 'mongodb://localhost:27017/altstack'}`
  // {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true
  // }
);

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = loadSchemaSync(join(__dirname, 'schema.graphql'), {
  loaders: [new GraphQLFileLoader()]
});

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);

  // The ApolloServer constructor requires two parameters: your schema
  // definition and your set of resolvers.
  const server = new ApolloServer({
    typeDefs: mergeTypeDefs([typeDefs]),
    resolvers: mergeResolvers([
      resolverCoin,
      resolverCount,
      resolverMeta,
      resolverPair,
      resolverSummaries,
      resolverTickers
    ]),
    // context: accountsGraphQL.context,
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
    csrfPrevention: true,
    plugins: [
      responseCachePlugin(),
      ApolloServerPluginDrainHttpServer({ httpServer })
    ]
    // cacheControl: {
    //   defaultMaxAge: 29
    // }
    // cors: {
    //   origin: '*',
    //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    //   preflightContinue: false,
    //   optionsSuccessStatus: 204,
    //   credentials: true
    // }
  });

  await server.start();

  server.applyMiddleware({ app });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );

  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer();
