import gql from 'graphql-tag'

const GET_APP = gql`
  query {
    app @client {
      isSidebarOpen
    }
  }
`

export {
  GET_APP
}
