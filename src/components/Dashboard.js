import React from "react";
import AuthProvider from "../contexts/AuthContext";
import UpdateProfile from "./auth/UpdateProfile";
import Profile from "./auth/Profile";
import Cards from "./cards/Cards";
import CreateCard from "../components/cards/CreateCard";
import { Navbar } from "./Navbar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CardsProvider from "../contexts/CardsContext";
import Privetroute from "./Privetroute";

export default function Dashboard({to, ...rest}) {
  return (
    <Route
      path={to}
      children={() => (
        <>
          <Navbar />
          <Link to={to} {...rest} />
        </>
      )}
    />
  );
}
