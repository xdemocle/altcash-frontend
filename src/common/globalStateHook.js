import React from 'react'
import globalHook from 'use-global-hook'

const initialState = {
  isSidebarOpen: false,
  coinPageNeedle: ''
}

const actions = {
  updateIsSidebarOpen: (store, isSidebarOpen) => {
    store.setState({ isSidebarOpen })
  },
  updateCoinPageNeedle: (store, coinPageNeedle) => {
    store.setState({ coinPageNeedle })
  }
}

export default globalHook(React, initialState, actions)
