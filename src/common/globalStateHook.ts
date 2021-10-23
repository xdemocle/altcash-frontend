import React from 'react'
import globalHook, { Store } from 'use-global-hook'

// eslint-disable-next-line
const userCoinFavouritesLocal = window.localStorage.getItem(
  'userCoinFavourites'
)

// Defining your own state and associated actions is required
type MyState = {
  isSidebarOpen: boolean
  coinPageNeedle: string | undefined
  coinListPage: number
  tab: number
  userCoinFavourites: []
}

// Associated actions are what's expected to be returned from globalHook
type MyAssociatedActions = {
  updateIsSidebarOpen: (isSidebarOpen: boolean) => void
  updateCoinPageNeedle: (coinPageNeedle: string) => void
  addUserCoinFavourites: (symbol: string) => void
  removeUserCoinFavourites: (symbol: string) => void
  updateBitcoinRandPrice: () => void
  setCoinListPage: (page: number) => void
  setTab: (tab: number) => void
}

const initialState: MyState = {
  isSidebarOpen: false,
  coinPageNeedle: undefined,
  coinListPage: 1,
  tab: 0,
  userCoinFavourites: userCoinFavouritesLocal
    ? JSON.parse(userCoinFavouritesLocal)
    : []
}

const actions = {
  updateIsSidebarOpen: (
    store: Store<MyState, MyAssociatedActions>,
    isSidebarOpen: boolean
  ) => {
    store.setState({ ...store.state, isSidebarOpen })
  },
  updateCoinPageNeedle: (
    store: Store<MyState, MyAssociatedActions>,
    coinPageNeedle: string
  ) => {
    store.setState({ ...store.state, coinPageNeedle })
  },
  addUserCoinFavourites: (
    store: Store<MyState, MyAssociatedActions>,
    symbol: string
  ) => {
    const userCoinFavourites = store.state.userCoinFavourites

    userCoinFavourites.push(symbol as never)

    persistCoinFavourites(userCoinFavourites)

    store.setState({ ...store.state, userCoinFavourites })
  },
  removeUserCoinFavourites: (
    store: Store<MyState, MyAssociatedActions>,
    symbol: string
  ) => {
    const userCoinFavourites = store.state.userCoinFavourites

    const findIx = userCoinFavourites.indexOf(symbol as never)

    userCoinFavourites.splice(findIx, 1)

    persistCoinFavourites(userCoinFavourites)

    store.setState({ ...store.state, userCoinFavourites })
  },
  setCoinListPage: async (
    store: Store<MyState, MyAssociatedActions>,
    page: number
  ) => {
    store.setState({ ...store.state, coinListPage: page })
  },
  setTab: async (store: Store<MyState, MyAssociatedActions>, tab: number) => {
    store.setState({ ...store.state, tab })
  }
}

export default globalHook<MyState, MyAssociatedActions>(
  React,
  initialState,
  actions
)

function persistCoinFavourites(coins: []) {
  window.localStorage.setItem('userCoinFavourites', JSON.stringify(coins))
}
