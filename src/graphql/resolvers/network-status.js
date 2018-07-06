/**
 * Initial state
 */
const networkStatus = {
  __typename: 'NetworkStatus',
  isConnected: true
}

/**
 * Resolvers
 */
const updateNetworkStatus = (_, { isConnected }, { cache }) => {
  const data = {
    networkStatus: {
      __typename: 'NetworkStatus',
      isConnected
    }
  }
  cache.writeData({ data })
  return null
}

export default {
  defaults: {
    networkStatus
  },
  resolvers: {
    Mutation: {
      updateNetworkStatus
    }
  }
}
