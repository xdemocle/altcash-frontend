import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { MuiThemeProvider } from '@material-ui/core/styles'
// import apolloClient from './graphql/apollo-client'
import App, { routerBasename, theme } from './components/App'
import * as serviceWorker from './serviceWorker'
import './index.css'

import appSyncConfig from './aws-exports'
import AWSAppSyncClient, { defaultDataIdFromObject } from 'aws-appsync'
import { Rehydrated } from 'aws-appsync-react'

const client = new AWSAppSyncClient({
  url: appSyncConfig.aws_appsync_graphqlEndpoint,
  region: appSyncConfig.aws_appsync_region,
  auth: {
    type: appSyncConfig.aws_appsync_authenticationType,
    apiKey: appSyncConfig.aws_appsync_apiKey
  },
  cacheOptions: {
    dataIdFromObject: (obj) => {
      let id = defaultDataIdFromObject(obj)

      if (!id) {
        const { __typename: typename } = obj
        switch (typename) {
          case 'Comment':
            return `${typename}:${obj.commentId}`
          default:
            return id
        }
      }

      return id
    }
  }
})

const render = (Component) => {
  // eslint-disable-next-line react/no-render-return-value
  return ReactDOM.render(
    <ApolloProvider client={client}>
      <Rehydrated>
        <MuiThemeProvider theme={theme}>
          <BrowserRouter basename={routerBasename}>
            <Component />
          </BrowserRouter>
        </MuiThemeProvider>
      </Rehydrated>
    </ApolloProvider>,
    document.getElementById('root')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default
    render(NextApp)
  })
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
if (process.env.NODE_ENV === 'production') {
  serviceWorker.register()
} else {
  serviceWorker.unregister()
}
