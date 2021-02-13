import React from 'react'
import globalHook from 'use-global-hook'

const initialState = {
  isSidebarOpen: false,
  coinPageNeedle: '',
  userCoinFavourites: window.localStorage.getItem('userCoinFavourites')
    ? JSON.parse(window.localStorage.getItem('userCoinFavourites'))
    : []
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
  }
}

export default globalHook(React, initialState, actions)

function persistCoinFavourites(coins) {
  // console.log('userCoinFavourites', coins)
  window.localStorage.setItem('userCoinFavourites', JSON.stringify(coins))
}
