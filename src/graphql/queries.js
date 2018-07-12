import gql from 'graphql-tag'

export const GET_APP = gql`
  query {
    app @client {
      isSidebarOpen
    }
  }
`

export const GET_COINS_LIST = gql`
  query allCoins($offset: Int, $limit: Int) {
    allCoins(orderBy: name_ASC, skip: $offset, first: $limit) {
      id
      name
      symbol
    }
  }
`

export const GET_COINS_LIST_WITH_MARKETS = gql`
  query allCoins($offset: Int, $limit: Int) {
    allCoins(orderBy: name_ASC, skip: $offset, first: $limit) {
      id
      name
      symbol
      markets {
        isActive
        exchanger
        market
      }
    }
  }
`
