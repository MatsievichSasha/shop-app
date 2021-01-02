import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => (
  <nav>
    <div className="nav nav-tabs" id="nav-tab" role="tablist">
      <Link exact to="/" className="nav-link" >
        Все товары
      </Link>
      <Link to="/create-card" className="nav-link" >
        Добавить товар
      </Link>
{/*       <Link to="/reduct-card" className="nav-link" >
        Редактировать товар
      </Link> */}
      <Link to="/profile" className="nav-link" >
        Profile
      </Link>
    </div>
  </nav>
);
