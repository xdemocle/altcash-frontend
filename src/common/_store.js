/**
 * Main file for the app store
 */
import { createStore } from 'redux'
import { responsiveStoreEnhancer } from 'redux-responsive'
import mainReducer from './_reducers'

const store = createStore(mainReducer, responsiveStoreEnhancer)

// or, if you have an initial state for the store
// const store = createStore(mainReducer, initialState, responsiveStoreEnhancer)

export default store
