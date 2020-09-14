import { Route, Switch, Redirect } from 'react-router-dom'
import React from 'react'
import Register from './Components/Register'
import Landing from './Components/Landing'
import Dashboard from './Components/Dashboard'
import Profile from './Components/Profile'

export default (
  <Switch>
    <Route exact path='/' component={Landing} />
    <Route path='/register' component={Register} />
    <Route path='/dashboard' component={Dashboard} />
    <Route path='/profile' component={Profile} />
    <Route render={() => <Redirect to='/' />} />
  </Switch>
)
