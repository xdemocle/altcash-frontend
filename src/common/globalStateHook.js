import React from 'react'
import axios from 'axios'
import globalHook from 'use-global-hook'

const initialState = {
  isSidebarOpen: false,
  coinPageNeedle: undefined,
  coinListPage: 1,
  userCoinFavourites: window.localStorage.getItem('userCoinFavourites')
    ? JSON.parse(window.localStorage.getItem('userCoinFavourites'))
    : [],
  bitcoinRandPrice: window.localStorage.getItem('bitcoinRandPrice')
    ? JSON.parse(window.localStorage.getItem('bitcoinRandPrice'))
    : 0
}

const actions = {
  updateIsSidebarOpen: (store, isSidebarOpen) => {
    store.setState({ isSidebarOpen })
  },
  updateCoinPageNeedle: (store, coinPageNeedle) => {
    store.setState({ coinPageNeedle })
  },
  addUserCoinFavourites: (store, symbol) => {
    const userCoinFavourites = store.state.userCoinFavourites

    userCoinFavourites.push(symbol)

    persistCoinFavourites(userCoinFavourites)

    store.setState({ userCoinFavourites })
  },
  removeUserCoinFavourites: (store, symbol) => {
    const userCoinFavourites = store.state.userCoinFavourites

    const findIx = userCoinFavourites.indexOf(symbol)

    userCoinFavourites.splice(findIx, 1)

    persistCoinFavourites(userCoinFavourites)

    store.setState({ userCoinFavourites })
  },
  updateBitcoinRandPrice: async (store) => {
    const response = await axios.get('/api/1/ticker?pair=XBTZAR')

    persistBitcoinRandPrice(response.data.ask)

    store.setState({ bitcoinRandPrice: response.data.ask })
  },
  setCoinListPage: async (store, page) => {
    store.setState({ coinListPage: page })
  }
}

export default globalHook(React, initialState, actions)

function persistCoinFavourites(coins) {
  window.localStorage.setItem('userCoinFavourites', JSON.stringify(coins))
}

function persistBitcoinRandPrice(price) {
  window.localStorage.setItem('bitcoinRandPrice', JSON.stringify(price))
}
