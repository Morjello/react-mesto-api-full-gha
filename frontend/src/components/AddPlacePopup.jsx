import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddCard }) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddCard({
      name: title,
      link: link,
    });
  }

  return (
    <PopupWithForm
      id="2"
      title="Новое место"
      name="add"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          type="text"
          className="popup__input"
          id="title"
          name="title"
          value={title || ""}
          onChange={handleTitleChange}
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="popup__error title-error"></span>
      </label>
      <label className="popup__label">
        <input
          type="url"
          className="popup__input"
          id="link"
          name="link"
          value={link || ""}
          onChange={handleLinkChange}
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__error link-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
