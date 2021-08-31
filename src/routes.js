import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import io from "socket.io-client";
import makeToast from "./Toaster";

import Dashboard from './pages/Dashboard/Dashboard'
import Info from './pages/Info/Info'
import Trading from './pages/Trading/Trading'
import AuthPage from './pages/AuthPage'
import Trader from './pages/Trader/Trader'
import Profile from './pages/Profile/Profile'
import Predict from './pages/Predict/Predict'
import Chatroom from './pages/chatroom/Chatroom'
import DashboardChat from './pages/chatroom/DashboardChat'

export const useRoutes = isAutentificated => {
    const [socket, setSocket] = React.useState(null);

    const setupSocket = () => {
      const token = localStorage.getItem("CC_Token");
      if (token && !socket) {
        const newSocket = io("http://localhost:5000", {
          query: {
            token: localStorage.getItem("CC_Token"),
          },
        });
  
        newSocket.on("disconnect", () => {
          setSocket(null);
          setTimeout(setupSocket, 3000);
          makeToast("error", "Socket Disconnected!");
        });
  
        newSocket.on("connect", () => {
          makeToast("success", "Socket Connected!");
        });
  
        setSocket(newSocket);
      }
    };
      
      React.useEffect(() => {
        setupSocket();
        //eslint-disable-next-line
      }, []);

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
            <Route path="/dashboardChat">
                <DashboardChat socket={socket} />
            </Route>
            <Route path="/chatroom/:id">
                <Chatroom socket={socket} />
            </Route>
            <Redirect to="/dashboard" />
        </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/" exact>
            <AuthPage setupSocket={setupSocket} />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
    
    }