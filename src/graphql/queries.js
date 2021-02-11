import { gql } from '@apollo/client'

export const GET_COINS_LIST = gql`
  query allCoins($offset: Int, $limit: Int, $needle: String) {
    coins(offset: $offset, limit: $limit, coin: $needle) {
      name
      symbol
    }
  }
`

export const GET_COINS_LIST_WITH_MARKETS = gql`
  # query coins($offset: Int, $limit: Int, $needle: String) {
  query AllCoins {
    allCoins {
      id
      name
      symbol
      markets {
        id
        market
        exchanger
        isActive
      }
    }
  }
`
export const getCoin = /* GraphQL */ `
  query GetCoin($id: ID!) {
    getCoin(id: $id) {
      id
      name
      symbol
      markets {
        id
        market
        exchanger
        isActive
      }
    }
  }
`
export const listCoins = /* GraphQL */ `
  query ListCoins(
    $filter: TableCoinFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCoins(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        symbol
      }
      nextToken
    }
  }
`
