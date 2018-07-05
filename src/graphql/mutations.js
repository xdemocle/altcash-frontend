import gql from 'graphql-tag'

const UPDATE_NETWORK_STATUS = gql`
  mutation updateNetworkStatus($isConnected: Boolean) {
    updateNetworkStatus(isConnected: $isConnected) @client
  }
`

const UPDATE_IS_SIDEBAR_OPEN = gql`
  mutation updateIsSidebarOpen($isSidebarOpen: Boolean) {
    updateIsSidebarOpen(isSidebarOpen: $isSidebarOpen) @client
  }
`

export {
  UPDATE_NETWORK_STATUS,
  UPDATE_IS_SIDEBAR_OPEN
}
