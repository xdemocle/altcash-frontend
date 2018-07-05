/**
 * apollo-client-state.js
 */
import { withClientState } from 'apollo-link-state'
import { cache } from './apollo-cache'
import { networkStatus, updateNetworkStatus } from './state/network-status'
import { app, updateIsSidebarOpen } from './state/app'

// Initialize the local state manager
export default withClientState({
  cache,
  resolvers: {
    Mutation: {
      updateNetworkStatus,
      updateIsSidebarOpen
    }
  },
  defaults: {
    app,
    networkStatus
  }
})
