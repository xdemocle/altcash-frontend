import gql from 'graphql-tag'

export const GET_APP = gql`
  query {
    app @client {
      isSidebarOpen
    }
  }
`

export const GET_COINS_LIST = gql`
  query {
    allCoins {
      id
      name
      symbol
    }
  }
`

export const GET_COINS_LIST_WITH_SYMBOLS = gql`
  query {
    allCoins (orderBy: name_ASC) {
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
