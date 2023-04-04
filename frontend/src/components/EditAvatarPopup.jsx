import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      id="4"
      title="Обновить аватар"
      name="avatar"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__label">
        <input
          ref={avatarRef}
          type="url"
          className="popup__input"
          id="avatar-link"
          name="avatar-link"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__error avatar-link-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
