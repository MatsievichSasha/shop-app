import React from "react";
import AuthProvider from "../contexts/AuthContext";
import SignUp from "./auth/SignUp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./auth/Login";
import Privetroute from "./Privetroute";
import ForgotPassword from "./auth/ForgorPassword";
import UpdateProfile from "./auth/UpdateProfile";
import Profile from "./auth/Profile";
import Cards from "./cards/Cards";
import CreateCard from "../components/cards/CreateCard";
import CardsProvider from "../contexts/CardsContext";
import { Navbar } from "./Navbar";


function App() {

  return (
    <Router>
      <AuthProvider>
        <CardsProvider>
          <Switch>
            <Privetroute exact path="/" component={Cards} />
            <Privetroute path="/create-card" component={CreateCard} />
            <Privetroute path="/profile" component={Profile} />
            <Privetroute path="/update-profile" component={UpdateProfile} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </Switch>
        </CardsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
