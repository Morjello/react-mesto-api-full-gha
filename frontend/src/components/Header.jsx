import React from "react";
import { Link } from "react-router-dom";

function Header({ email, logText, logoutText, path, onSignOut }) {

  return (
    <header className="header">
      <Link to="/" className="header__logo"></Link>
      <div className="header__container">
        <Link to={path} className="header__button">
          {logText}
        </Link>
        <p className="header__button">{email}</p>
        <p onClick={onSignOut} className="header__button">
          {logoutText}
        </p>
      </div>
    </header>
  );
}

export default Header;
