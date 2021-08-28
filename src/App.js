import React, {useState} from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import {useRoutes} from './routes'
import { useAuth } from './hooks/auth.hook'
import { Fetch } from './fetch'
import { AuthContext } from './context/AuthContext'
import {Navbar} from './pages/Navbar'
import 'materialize-css'

function App() {
  const {token, login, logout, userId, userName} = useAuth()
  const {getAvatar, myAvatar, name, setName, myUser, setMyUser, users, getUsers, data, coins, postApi, setPostApi, getApi, getPosition, getCrypto, appState, setAppState, refreshPosition, setMyAccount, myAccount, myAccFiltred, setMyAccFiltred} = Fetch()
  const isAutenticated = !!token
  const routes = useRoutes(isAutenticated)

  const value = {
    token, 
    login, 
    logout, 
    userId, 
    isAutenticated, 
    data, 
    getPosition, 
    getCrypto, 
    coins, 
    appState, 
    setAppState,
    refreshPosition,
    postApi,
    getApi,
    setPostApi,
    setMyAccount,
    myAccount,
    myAccFiltred, 
    setMyAccFiltred,
    users,
    getUsers,
    myUser,
    setMyUser,
    name,
    setName,
    userName,
    getAvatar,
    myAvatar

  }

  return (
    <AuthContext.Provider value={value}>
    <Router>
      {isAutenticated && <Navbar />}
    <div className="container">
      {routes}
    </div>
    </Router>
    </AuthContext.Provider>
  );
}

export default App;
