import { DataSources, Summary } from '../types';

const querySummary = async (
  _: unknown,
  { id }: { id: string },
  { dataSources }: { dataSources: DataSources }
): Promise<Summary> => {
  const response = await dataSources.marketsAPI.getSummary(id);

  response.symbol = response.symbol.replace('BTC', '');

  return {
    // Add the id for client caching purpouse
    id: response.symbol,
    symbol: response.symbol,
    high: Number(response.highPrice),
    low: Number(response.lowPrice),
    volume: response.volume,
    quoteVolume: response.quoteVolume,
    percentChange: Number(response.priceChange)
  };
};

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    summary: querySummary
  }
};

export default resolvers;
