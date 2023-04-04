import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header({ email, logText, logoutText, path }) {
  const navigate = useNavigate();
  function signOut() {
    localStorage.removeItem("jwt");
    navigate("/sign-in");
  }

  return (
    <header className="header">
      <Link to="/" className="header__logo"></Link>
      <div className="header__container">
        <Link to={path} className="header__button">
          {logText}
        </Link>
        <p className="header__button">{email}</p>
        <p onClick={signOut} className="header__button">
          {logoutText}
        </p>
      </div>
    </header>
  );
}

export default Header;
