/**
 * index.js
 *
 * Description: root file of our React app with Apollo/GraphQL support.
 */
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'

import 'tachyons'
import './index.css'

import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

const rootEl = document.getElementById('root')

ReactDOM.render(
  <App />,
  rootEl
)

registerServiceWorker()

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default
    ReactDOM.render(
      <NextApp />,
      rootEl
    )
  })
}
