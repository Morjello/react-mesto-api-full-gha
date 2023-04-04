import LoginForm from "./LoginForm";
import React, { useState } from "react";

function Login({ onLoginUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLoginUser({
      email: email,
      password: password,
    });
    setEmail("");
    setPassword("");
  }

  return (
    <LoginForm
      id="6"
      title="Вход"
      name="login"
      submitButtonText="Войти"
      onSubmit={handleSubmit}
    >
      <div className="popup__label">
        <input
          value={email || ""}
          onChange={handleEmailChange}
          type="text"
          className="login__input"
          placeholder="Email"
          id="email"
          name="email"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="popup__error email-error"></span>
      </div>
      <div className="popup__label">
        <input
          value={password || ""}
          onChange={handlePasswordChange}
          type="password"
          className="login__input"
          placeholder="Пароль"
          id="password"
          name="password"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="popup__error password-error"></span>
      </div>
    </LoginForm>
  );
}

export default Login;
