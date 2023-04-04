import LoginForm from "./LoginForm";
import React, { useState } from "react";

function Register({ onRegisterUser }) {
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
    onRegisterUser({
      email: email,
      password: password,
    });
    setEmail("");
    setPassword("");
  }

  return (
    <LoginForm
      id="5"
      title="Регистрация"
      name="register"
      submitButtonText="Зарегистрироваться"
      onSubmit={handleSubmit}
      buttonText="Уже зарегистрированы? Войти"
    >
      <div className="popup__label">
        <input
          value={email || ""}
          onChange={handleEmailChange}
          type="email"
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

export default Register;
