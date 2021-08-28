import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import Dashboard from './pages/Dashboard/Dashboard'
import Info from './pages/Info/Info'
import Trading from './pages/Trading/Trading'
import AuthPage from './pages/AuthPage'
import Trader from './pages/Trader/Trader'
import Profile from './pages/Profile/Profile'
import Predict from './pages/Predict/Predict'

export const useRoutes = isAutentificated => {
    if (isAutentificated) {
        return (
        <Switch>
            <Route path="/dashboard" exact>
                <Dashboard />
            </Route>
            <Route path="/info" exact>
                <Info />
            </Route>
            <Route path="/trading/:id">
                <Trading />
            </Route>
            <Route path="/trader">
                <Trader />
            </Route>
            <Route path="/profile">
                <Profile />
            </Route>
            <Route path="/predict">
                <Predict />
            </Route>
            <Redirect to="/dashboard" />
        </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/" exact>
            <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
    
    }