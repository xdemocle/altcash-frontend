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
import cron from 'node-cron';
import { join } from 'path';
import BinanceAPI from './datasources/binance';
import MetadataAPI from './datasources/metadata';
import MybitxAPI from './datasources/mybitx';
import NamesAPI from './datasources/names';
import OrdersAPI from './datasources/orders';
import OrdersQueueAPI from './datasources/orders-queue';
import OrderModel from './models/orders';
import OrderQueueModel from './models/orders-queue';
import resolverCount from './resolvers/resolver-count';
import resolverMarkets from './resolvers/resolver-markets';
import resolverMeta from './resolvers/resolver-meta';
import resolverOrders from './resolvers/resolver-orders';
import resolverPair from './resolvers/resolver-pair';
import resolverSummaries from './resolvers/resolver-summaries';
import resolverTickers from './resolvers/resolver-tickers';

// We connect mongoose to our local mongodb database
const connectMongo = async () => {
  await mongoose.connect(
    `${process.env.MONGODB_URI || 'mongodb://localhost:27017/altstack'}`
  );
};

connectMongo()
  .then(() => console.debug('🎉 connected to MongoDB database successfully'))
  .catch((error) => console.error(error));

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
      resolverMarkets,
      resolverCount,
      resolverMeta,
      resolverPair,
      resolverSummaries,
      resolverTickers,
      resolverOrders
    ]),
    // context: accountsGraphQL.context,
    dataSources: () => ({
      marketsAPI: new BinanceAPI(),
      metadataAPI: new MetadataAPI(),
      namesAPI: new NamesAPI(),
      mybitxAPI: new MybitxAPI(),
      ordersAPI: new OrdersAPI(OrderModel)
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
  });

  await server.start();

  server.applyMiddleware({ app });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );

  // Start crons
  cron.schedule('*/5 * * * * *', async () => {
    const ordersApi = new OrdersAPI(OrderModel);
    const ordersQueueApi = new OrdersQueueAPI(OrderQueueModel);

    ordersQueueApi.importAndCheckOrders(
      await ordersApi.checkPendingPaidOrders()
    );
  });

  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer();
