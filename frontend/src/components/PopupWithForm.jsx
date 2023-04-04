function PopupWithForm({
  name,
  title,
  id,
  isOpen,
  children,
  onClose,
  buttonText,
  onSubmit,
}) {
  return (
    <div className="root__wrapper">
      <div className={`popup ${isOpen && "popup_opened"}`}>
        <div className="popup__container">
          <h2 className="popup__title">{title}</h2>
          <form
            className="popup__form profile-popup__form"
            name={name}
            id={id}
            onSubmit={onSubmit}
          >
            {children}
            <button className="popup__button" type="submit">
              {buttonText}
            </button>
          </form>
          <button
            type="button"
            className="popup__close"
            onClick={onClose}
          ></button>
        </div>
      </div>
    </div>
  );
}

export default PopupWithForm;
