function InfoTooltip({ isOpen, onClose, infoTooltipText, infoTooltipImage }) {
  return (
    <div className="root__wrapper">
      <div className={`popup ${isOpen && "popup_opened"}`}>
        <div className="info-tooltip__container">
          <div
            className="info-tooltip__image"
            style={{
              backgroundImage: `url(${infoTooltipImage})`,
            }}
          ></div>
          <h2 className="info-tooltip__text">{infoTooltipText}</h2>
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

export default InfoTooltip;
