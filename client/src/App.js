import React, { useEffect } from 'react';
import './App.css';
import Register from "./component/Register"
import Login from "./component/Login"
import Account from "./component/Account"
import {Route,Switch} from "react-router-dom";
import setAuthToken from "./token/authtoken";
import PrivateRoute from "./component/privateroute";
import Dashboard from "./component/Dashboard";
import Home from "./component/Home";

function App() {
  // Check for token to keep user logged in
  useEffect(() => {
    if (localStorage.token) {
      // Set auth token header auth
      const token = localStorage.token;
      setAuthToken(token);
    }
  });

  return (
    <div className="App">
      <div className="App_center">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />

          <PrivateRoute exact path="/myaccount" component={Account} />

          
              <PrivateRoute exact  path="/dashboard" component={Dashboard} />
              
            </Switch>
            </div>


         
    </div>
  );
}

export default App;
