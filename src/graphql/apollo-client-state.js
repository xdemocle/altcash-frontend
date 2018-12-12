/**
 * apollo-client-state.js
 */
import { merge } from 'lodash'
import { withClientState } from 'apollo-link-state'
import { cache } from './apollo-cache'

import app from './resolvers/app'
import networkStatus from './resolvers/network-status'
import allMarkets from './resolvers/allMarkets'

// Initialize the local state manager
export default withClientState({
  ...merge(app, networkStatus, allMarkets),
  cache
})
