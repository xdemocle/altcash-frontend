import { DataSources, Metadata } from '../types';

const queryMetaCoin = async (
  _: unknown,
  { id }: { id: string },
  { dataSources }: { dataSources: DataSources }
): Promise<Metadata> => {
  const idUppercase = id.toUpperCase();
  const idLowerCase = id.toLowerCase();
  const response: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  } = await dataSources.metadataAPI.getCoin(idLowerCase);

  const coin = response[idUppercase][0];

  coin.metadataId = coin.id;
  coin.id = idUppercase;

  return coin;
};

const queryMetaAllCoins = async (
  _: unknown,
  __: unknown,
  { dataSources }: { dataSources: DataSources }
): Promise<Metadata[]> => {
  const response = await dataSources.namesAPI.getAll();
  return response;
};

const queryMetaExperiment = async (
  _: unknown,
  __: unknown,
  { dataSources }: { dataSources: DataSources }
): Promise<Metadata[]> => {
  const response = await dataSources.metadataAPI.missingData();

  return response;
};

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    metaCoin: queryMetaCoin,
    metaCoinAll: queryMetaAllCoins,
    metaExperiment: queryMetaExperiment
  }
};

export default resolvers;
