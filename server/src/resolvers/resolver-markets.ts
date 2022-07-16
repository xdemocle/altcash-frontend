import { each, filter, find, isUndefined } from 'lodash';
import { Market, DataSources, MissingMarket } from '../types';

const queryMarkets = async (
  _: unknown,
  {
    limit,
    offset = 0,
    term,
    symbols
  }: {
    limit?: number;
    offset: number;
    term: string;
    symbols: string;
  },
  { dataSources }: { dataSources: DataSources }
): Promise<Market[]> => {
  let markets = await dataSources.marketsAPI.getAllMarkets();
  const names = await dataSources.namesAPI.getAll();
  const missingNames: string[] = [];
  const missingNamesArr: MissingMarket[] = [];

  // Add names
  each(markets, (market) => {
    const nameCoin = find(names, (name) => {
      return name.symbol === market.baseAsset;
    });

    if (!nameCoin) {
      if (missingNames.indexOf(market.baseAsset) === -1) {
        missingNames.push(market.baseAsset);
      }
    } else {
      market.name = nameCoin.name;
    }

    market.id = market.symbol = market.baseAsset;
  });

  // Order by name
  markets.sort((a: Market, b: Market) => {
    // ignore upper and lowercase
    const nameA = a.name && a.name.toUpperCase();
    const nameB = b.name && b.name.toUpperCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });

  // Prepare array of missing names stringified
  each(missingNames, (name) => {
    missingNamesArr.push({
      symbol: name,
      name: name
    });
  });

  if (missingNamesArr.length > 0) {
    // eslint-disable-next-line no-console
    console.log('missingNamesArr', JSON.stringify(missingNamesArr));
  }

  // Search feature or symbols one
  if (!isUndefined(symbols)) {
    limit = limit || 20;

    if (!symbols.length) {
      markets = [];
    } else {
      markets = filter(markets, (coin) => {
        return symbols.split('|').includes(coin.baseAsset);
      });
    }
  } else if (term && term.length) {
    limit = limit || 20;

    markets = filter(markets, (coin) => {
      return (
        (coin.name && coin.name.toLowerCase().search(term) !== -1) ||
        coin.baseAsset.toLowerCase().search(term.toLowerCase()) !== -1
      );
    });
  }

  // Pagination feature
  if (limit) {
    markets = markets.slice(offset, offset + limit);
  }

  return markets;
};

const queryMarket = async (
  _: unknown,
  { id }: { id: string },
  { dataSources }: { dataSources: DataSources }
): Promise<Market> => {
  const response = await dataSources.marketsAPI.getMarket(id);
  const names = await dataSources.namesAPI.getAll();

  // Add names
  const nameMarket = find(names, (name) => {
    return name.symbol === response.baseAsset;
  });

  if (nameMarket) {
    response.name = nameMarket.name;
  }

  // Add the id for client caching purpouse
  response.id = response.symbol = response.baseAsset;

  return response;
};

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    markets: queryMarkets,
    market: queryMarket
  }
};

export default resolvers;
