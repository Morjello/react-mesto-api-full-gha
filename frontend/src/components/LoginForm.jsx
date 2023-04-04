import React from "react";
import { Link } from "react-router-dom";

function LoginForm({
  name,
  title,
  id,
  children,
  submitButtonText,
  onSubmit,
  buttonText,
  onInfoTooltip,
}) {
  return (
    <div className="login">
      <h2 className="login__title">{title}</h2>
      <form className="login__form" name={name} id={id} onSubmit={onSubmit}>
        {children}
        <button
          className="login__submit-button"
          type="submit"
          onClick={onInfoTooltip}
        >
          {submitButtonText}
        </button>
      </form>
      <Link to="/sign-in" className="login__button">
        {buttonText}
      </Link>
    </div>
  );
}

export default LoginForm;
