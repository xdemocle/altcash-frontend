import { filter, isUndefined } from 'lodash';
import { DataSources, Summary } from '../types';

const querySummaries = async (
  _: unknown,
  { symbols }: { symbols: string },
  { dataSources }: { dataSources: DataSources }
): Promise<Summary[]> => {
  let summaries = await dataSources.coinsAPI.getAllSummaries();

  // Search feature or symbols one
  if (!isUndefined(symbols)) {
    summaries = filter(summaries, (coin) => {
      return symbols.split('|').includes(coin.symbol);
    });
  }

  return summaries;
};

const querySummary = async (
  _: unknown,
  { id }: { id: string },
  { dataSources }: { dataSources: DataSources }
): Promise<Summary> => {
  const response = await dataSources.coinsAPI.getSummary(id);

  // Add the id for client caching purpouse
  response.id = response.symbol = response.symbol.replace('-BTC', '');

  return response;
};

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    summaries: querySummaries,
    summary: querySummary
  }
};

export default resolvers;
