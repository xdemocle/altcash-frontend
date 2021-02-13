import { gql } from '@apollo/client'

export const GET_COINS_LIST = gql`
  query allCoins($offset: Int, $limit: Int, $term: String, $symbols: String) {
    coins(offset: $offset, limit: $limit, term: $term, symbols: $symbols) {
      name
      baseCurrencySymbol
      status
    }
    count {
      name
      count
    }
  }
`

export const GET_COUNT = gql`
  query counts {
    counts {
      name
      count
    }
  }
`
