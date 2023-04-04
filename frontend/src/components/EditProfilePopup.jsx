import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      id="1"
      title="Редактировать профиль"
      name="profile"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__label">
        <input
          value={name || ""}
          onChange={handleNameChange}
          type="text"
          className="popup__input"
          placeholder="Ваше имя"
          id="name"
          name="name"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="popup__error name-error"></span>
      </div>
      <div className="popup__label">
        <input
          value={description || ""}
          onChange={handleDescriptionChange}
          type="text"
          className="popup__input"
          placeholder="Род деятельности"
          id="bio"
          name="bio"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="popup__error bio-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
