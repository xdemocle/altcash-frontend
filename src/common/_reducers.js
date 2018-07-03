/**
 * Main file for the app reducers
 */
import { combineReducers } from 'redux'
import { createResponsiveStateReducer } from 'redux-responsive'

export default combineReducers({
  browser: createResponsiveStateReducer({
    extraSmall: 420,
    small: 600,
    medium: 960,
    large: 1280,
    extraLarge: 1920
}),
})
