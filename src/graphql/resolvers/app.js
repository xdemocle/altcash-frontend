/**
 * Initial state
 */
const app = {
  __typename: 'app',
  isSidebarOpen: true,
  coinPageNeedle: ''
}

/**
 * Resolvers
 */
const updateIsSidebarOpen = (_, { isSidebarOpen }, { cache }) => {
  const data = {
    app: {
      __typename: 'app',
      isSidebarOpen
    }
  }
  cache.writeData({ data })
  return null
}

const updateCoinPageNeedle = (_, { coinPageNeedle }, { cache }) => {
  const data = {
    app: {
      __typename: 'app',
      coinPageNeedle
    }
  }
  cache.writeData({ data })
  return null
}

export default {
  defaults: {
    app
  },
  resolvers: {
    Mutation: {
      updateIsSidebarOpen,
      updateCoinPageNeedle
    }
  }
}
