import PopupWithForm from "./PopupWithForm";

function DeletePlacePopup({ isOpen, onClose, onDeleteCard, cardData }) {
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
    />
  );
}

export default DeletePlacePopup;
