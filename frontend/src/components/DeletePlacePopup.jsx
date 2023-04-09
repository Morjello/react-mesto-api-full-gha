import PopupWithForm from "./PopupWithForm";

function DeletePlacePopup({ isOpen, onClose, onDeleteCard, cardData, onClickOverlay }) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard(cardData);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      id="3"
      title="Вы уверены?"
      name="delete"
      buttonText="Да"
      onClickOverlay={onClickOverlay}
    />
  );
}

export default DeletePlacePopup;
