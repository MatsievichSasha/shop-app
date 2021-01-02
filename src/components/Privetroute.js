import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Navbar } from "./Navbar";

export default function Privetroute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <>
            <Navbar />
            <Component {...props} />
          </>
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}
