import React from "react";
import { Link } from "react-router-dom";
import { useCards } from "../components/cards/cardsContext/cardsContext"
import { ACTIONS } from "../components/cards/cardsContext/cardsReduser"

export const Navbar = () => {

  const { dispatch, initialFieldValues } = useCards()
  const stateReset = () => {
    dispatch({ type: ACTIONS.RESET, payload: initialFieldValues })
  }

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-sm fixed-top">
      <div className="container">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <Link to="/" onClick={stateReset} className="nav-link nav-link-color" >
                Все товары
              </Link>
            </li>
            <li class="nav-item active">
              <Link to="/create-card" onClick={stateReset} className="nav-link nav-link-color" >
                Добавить товар
              </Link>
            </li>
            <li class="nav-item active">
              <Link to="/profile" onClick={stateReset} className="nav-link nav-link-color" >
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
    </nav>
  );
}


