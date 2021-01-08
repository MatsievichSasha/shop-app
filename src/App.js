import React from "react";
import AuthProvider from "./contexts/AuthContext";
import SignUp from "./components/auth/SignUp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Privetroute from "./components/Privetroute";
import ForgotPassword from "./components/auth/ForgorPassword";
import UpdateProfile from "./components/auth/UpdateProfile";
import Profile from "./components/auth/Profile";
import Cards from "./components/cards/Cards";
import CreateCard from "./components/cards/CreateCard";
import EditCard from "./components/cards/EditCard"
import CardsProvider from "../src/components/cards/cardsContext/cardsContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CardsProvider>
          <Switch>
            {/*  <Privetroute exact path="/" component={Cards} /> */}
            <Privetroute path="/" component={CreateCard} />
            {/* <Privetroute path="/create-card" component={CreateCard} /> */}
            {/* <Privetroute path="/edit-card" component={EditCard} /> */}
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
