import { gql } from '@apollo/client';

const UPDATE_MARKET = gql`
  mutation updateMarket($market: Market) {
    updateMarket(market: $market) @client
  }
`;

export { UPDATE_MARKET };
