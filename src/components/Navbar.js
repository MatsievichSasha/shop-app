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
    <nav className="navbar navbar-expand-sm">
      <a class="navbar-brand" href="#">Панель навигации</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Переключатель навигации">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div className="nav justify-content-center navbar-background fixed-top collapse navbar-collapse" id="navbarNav">
        <Link to="/" onClick={stateReset} className="nav-link nav-link-color" >
          Все товары
        </Link>
        <Link to="/create-card" onClick={stateReset} className="nav-link nav-link-color" >
          Добавить товар
        </Link>
        <Link to="/profile" onClick={stateReset} className="nav-link nav-link-color" >
          Profile
        </Link>
      </div>
    </nav>
  );
}


