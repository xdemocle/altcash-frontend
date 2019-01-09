import gql from 'graphql-tag'

export const GET_APP = gql`
  query {
    app @client {
      isSidebarOpen
      coinPageNeedle
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
  query coins($offset: Int, $limit: Int, $needle: String) {
    allCoins(orderBy: name_ASC, skip: $offset, first: $limit, filter: {
      OR: [{
        name_contains: $needle,
      }, {
        symbol_contains: $needle
      }]
    }) {
      id
      name
      symbol
      markets {
        isActive
        exchanger
        market
        askPrice
      }
    }
    _allCoinsMeta (filter: {
      OR: [{
        name_contains: $needle,
      }, {
        symbol_contains: $needle
      }]
    }) {
      count
    }
  }
`
export const LOGIN_USER = gql`
  query user($email: String, $password: String) {
    User(email: $email, password: $password) {
      id
      name
    }
  }
`

export const FETCH_CART_ITEM_FOR_USER = gql`
  query fetchCartItemForUser($user: User) {
    Cart(user: $user) {
      id
      coins
    }
  }
`

export const FETCH_WISHLIST_FOR_USER = gql`
  query fetchWishListForUser($user: User) {
    WishList(user: $user) {
      coins
    }
  }
`
// export const GET_COIN_PRICE = gql`
//   query {
//     app @client {
//       isSidebarOpen
//       coinPageNeedle
//     }
//   }
// `
