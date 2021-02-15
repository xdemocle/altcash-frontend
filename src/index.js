import 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import { MuiThemeProvider } from '@material-ui/core/styles'
import apolloClient from './common/apollo/apollo-client'
import App, { theme } from './components/App'
import * as serviceWorker from './serviceWorker'
import './index.css'

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MuiThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
if (process.env.NODE_ENV === 'production') {
  serviceWorker.register()
} else {
  serviceWorker.unregister()
}
