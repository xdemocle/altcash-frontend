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

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

registerServiceWorker()
