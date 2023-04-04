function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup-image ${card && "popup_opened"}`}>
      <div className="popup-image__container">
        <img src={card?.link} alt="Фотография" className="popup-image__photo" />
        <p className="popup-image__text">{card?.name}</p>
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
