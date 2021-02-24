import { gql } from '@apollo/client'

// https://www.apollographql.com/docs/react/v2/caching/cache-interaction/#the-connection-directive
// @connection(key: "feed", filter: ["type"])

export const GET_COINS = gql`
  query Coins($offset: Int, $limit: Int, $term: String, $symbols: String) {
    coins(offset: $offset, limit: $limit, term: $term, symbols: $symbols) {
      id
      name
      symbol
      status
    }
  }
`

export const GET_COIN = gql`
  query Coin($id: String) {
    coin(id: $id) {
      id
      symbol
      baseCurrencySymbol
      quoteCurrencySymbol
      minTradeSize
      precision
      status
      createdAt
      name
    }
  }
`

export const GET_SUMMARIES = gql`
  query Summaries {
    summaries {
      id
      symbol
      high
      percentChange
    }
  }
`

export const GET_SUMMARY = gql`
  query Summary($id: String) {
    summary(id: $id) {
      id
      symbol
      high
      percentChange
    }
  }
`

export const GET_TICKERS = gql`
  query Tickers {
    tickers {
      id
      # symbol
      # lastTradeRate
      # bidRate
      askRate
    }
  }
`

export const GET_TICKER = gql`
  query Ticker($id: String) {
    ticker(id: $id) {
      id
      # symbol
      # lastTradeRate
      # bidRate
      askRate
    }
  }
`

export const GET_PAGE_DATA = gql`
  query PageData($id: String) {
    coin(id: $id) {
      id
      symbol
      baseCurrencySymbol
      quoteCurrencySymbol
      minTradeSize
      precision
      status
      createdAt
      name
    }

    summary(id: $id) {
      id
      high
      low
      volume
      quoteVolume
      percentChange
      updatedAt
    }

    ticker(id: $id) {
      id
      lastTradeRate
      bidRate
      askRate
    }
  }
`

export const GET_META_COIN = gql`
  query MetaCoin($id: String) {
    metaCoin(id: $id) {
      id
      name
      symbol
      slug
      description
      logo
      urls {
        website
        twitter
        chat
      }
    }
  }
`

export const GET_META_COIN_LOGO = gql`
  query Query {
    metaCoinAll {
      logo
      symbol
    }
  }
`

export const GET_COUNT = gql`
  query Counts {
    count {
      name
      count
    }
  }
`
