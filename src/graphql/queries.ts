import { gql } from '@apollo/client';

// https://www.apollographql.com/docs/react/v2/caching/cache-interaction/#the-connection-directive
// @connection(key: "feed", filter: ["type"])

export const GET_MARKETS = gql`
  query Markets($offset: Int, $limit: Int, $term: String, $symbols: String) {
    markets(offset: $offset, limit: $limit, term: $term, symbols: $symbols) {
      id
      name
      symbol
      status
    }
  }
`;

export const GET_MARKET = gql`
  query Market($id: String) {
    market(id: $id) {
      id
      symbol
      baseAsset
      quoteAsset
      quotePrecision
      minTradeSize
      minNotional
      stepSize
      status
      name
    }
  }
`;

export const GET_TICKERS = gql`
  query Tickers {
    tickers {
      id
      price
    }
  }
`;

export const GET_TICKER = gql`
  query Ticker($id: String) {
    ticker(id: $id) {
      id
      price
    }
  }
`;

export const GET_PAGE_DATA = gql`
  query PageData($id: String) {
    market(id: $id) {
      id
      symbol
      baseAsset
      quoteAsset
      quotePrecision
      minTradeSize
      minNotional
      stepSize
      status
      name
    }

    summary(id: $id) {
      id
      high
      low
      volume
      quoteVolume
      percentChange
    }

    ticker(id: $id) {
      id
      price
    }
  }
`;

export const GET_META_COIN = gql`
  query MetaCoin($id: String) {
    metaCoin(id: $id) {
      id
      name
      symbol
      description
      logo
      urls {
        website
        twitter
        chat
      }
    }
  }
`;

export const GET_META_COIN_LOGO = gql`
  query Query {
    metaCoinAll {
      logo
      symbol
    }
  }
`;

export const GET_COUNT = gql`
  query Counts {
    count {
      name
      count
    }
  }
`;

export const GET_PAIR = gql`
  query Pair($pair: String) {
    pair(pair: $pair) {
      pair
      last_trade
      timestamp
    }
  }
`;

// export const GET_ORDERS = gql`
//   query getOrders {
//     getOrders {
//       _id
//       amount
//       total
//       isPaid
//       isPending
//       isWithdrawn
//       wallet
//       reference
//       email
//       pin
//       timestamp
//     }
//   }
// `;

export const GET_ORDER = gql`
  query getOrder($id: String) {
    getOrder(id: $id) {
      _id
      amount
      total
      isPaid
      isPending
      isWithdrawn
      wallet
      reference
      email
      pin
      orderReferences
      hasErrors
      timestamp
    }
  }
`;

export const GET_ORDER_IS_PENDING = gql`
  query getOrder($id: String) {
    getOrder(id: $id) {
      _id
      isPending
      orderReferences
      hasErrors
    }
  }
`;

export const GET_CAN_TRADE = gql`
  query Query {
    canTrade {
      canTrade
      msg
    }
  }
`;
