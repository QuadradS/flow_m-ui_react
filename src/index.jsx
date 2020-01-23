import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Router } from 'react-router'
import {createBrowserHistory} from 'history'


ReactDOM.render(<Router history={createBrowserHistory()}>
  <App/>
</Router>, document.getElementById('root'))

