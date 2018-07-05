/**
 * Initial state
 */
const app = {
  __typename: 'app',
  isSidebarOpen: true
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

export {
  app,
  updateIsSidebarOpen
}
