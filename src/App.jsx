//@flow
import React from 'react'
import { Route, Switch } from 'react-router'
import Home from './pages/home'

const App = () => {
  return (
    <Switch>
      <Route component={Home}/>
    </Switch>
  )
}
export default App
