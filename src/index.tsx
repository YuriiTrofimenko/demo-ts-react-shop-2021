import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import {store, StoreContext} from './stores/Store'
import './scss/style.scss'
import './fontawesome'

ReactDOM.render(
  <React.StrictMode>
      <StoreContext.Provider value={store}>
          <App />
      </StoreContext.Provider>,
  </React.StrictMode>,
  document.getElementById('root')
)
