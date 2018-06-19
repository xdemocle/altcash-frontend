/**
 * Main file for the app store
 */
import {createStore} from 'redux'
import {responsiveStoreEnhancer} from 'redux-responsive'
import rootReducer from './_reducers'

const store = createStore(rootReducer, responsiveStoreEnhancer)

// or, if you have an initial state for the store
// const store = createStore(rootReducer, initialState, responsiveStoreEnhancer)

export default store
