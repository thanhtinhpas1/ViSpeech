/* eslint-disable no-undef */
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { store, persistor } from './redux/store'

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <Route path="/" component={App} />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
