import React from 'react'
import globalHook from 'use-global-hook'

const initialState = {
  isSidebarOpen: false
}

const actions = {
  updateIsSidebarOpen: (store, isSidebarOpen) => {
    store.setState({ isSidebarOpen })
  }
}

export default globalHook(React, initialState, actions)
