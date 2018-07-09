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
      # homepage
    }
  }
`
