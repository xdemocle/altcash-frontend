import { DataSources, Summary } from '../types';

const querySummary = async (
  _: unknown,
  { id }: { id: string },
  { dataSources }: { dataSources: DataSources }
): Promise<Summary> => {
  const response = await dataSources.marketsAPI.getSummary(id);

  // Add the id for client caching purpouse
  response.id = response.symbol = response.symbol.replace('-BTC', '');

  return {
    id: response.symbol,
    symbol: response.symbol,
    high: response.highPrice,
    low: response.lowPrice,
    volume: response.volume,
    quoteVolume: response.quoteVolume,
    percentChange: response.priceChange
  };
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
