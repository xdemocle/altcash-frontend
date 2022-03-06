import { filter } from 'lodash';
import { Count, DataSources } from '../types';

const queryCount = async (
  _: unknown,
  { limit }: { limit: number },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  { dataSources }: { dataSources: DataSources }
): Promise<Count[]> => {
  const counts = [];
  const markets = await dataSources.coinsAPI.getAllMarkets();
  const activeMarkets = filter(markets, { status: 'ONLINE' });

  counts.push({
    name: 'markets',
    count: markets.length
  });

  counts.push({
    name: 'activeMarkets',
    count: activeMarkets.length
  });

  return counts;
};

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    count: queryCount
  }
};

export default resolvers;
