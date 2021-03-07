import { ApolloProvider } from '@apollo/client'
import { MuiThemeProvider } from '@material-ui/core/styles'
import React from 'react'
import ReactDOM from 'react-dom'
import 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import { apolloClient } from './common/apollo/apollo-client'
import { theme } from './common/theme'
import App from './containers/App'
import './index.css'
import * as serviceWorker from './serviceWorker'

const rootElement = document.getElementById('root')

// add .root class for global styles overwrites
if (rootElement) {
  rootElement.className = 'root'
}

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MuiThemeProvider>
  </ApolloProvider>,
  rootElement
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
if (process.env.NODE_ENV === 'production') {
  serviceWorker.register()
} else {
  serviceWorker.unregister()
}
