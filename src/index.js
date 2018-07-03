import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import store from './common/_store';
import { Provider } from 'react-redux'

import './index.css'

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);

registerServiceWorker();
