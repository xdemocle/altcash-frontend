import { gql } from '@apollo/client'

const UPDATE_NETWORK_STATUS = gql`
  mutation updateNetworkStatus($isConnected: Boolean) {
    updateNetworkStatus(isConnected: $isConnected) @client
  }
`

const UPDATE_MARKET = gql`
  mutation updateMarket($market: Market) {
    updateMarket(market: $market) @client
  }
`

const UPDATE_IS_SIDEBAR_OPEN = gql`
  mutation updateIsSidebarOpen($isSidebarOpen: Boolean) {
    updateIsSidebarOpen(isSidebarOpen: $isSidebarOpen) @client
  }
`

const UPDATE_COIN_PAGE_NEEDLE = gql`
  mutation updateCoinPageNeedle($needle: String) {
    updateCoinPageNeedle(coinPageNeedle: $needle) @client
  }
`

export {
  UPDATE_NETWORK_STATUS,
  UPDATE_MARKET,
  UPDATE_IS_SIDEBAR_OPEN,
  UPDATE_COIN_PAGE_NEEDLE
}

/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCoin = /* GraphQL */ `
  mutation CreateCoin($input: CreateCoinInput!) {
    createCoin(input: $input) {
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
export const updateCoin = /* GraphQL */ `
  mutation UpdateCoin($input: UpdateCoinInput!) {
    updateCoin(input: $input) {
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
export const deleteCoin = /* GraphQL */ `
  mutation DeleteCoin($input: DeleteCoinInput!) {
    deleteCoin(input: $input) {
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
