function Card({
  onCardClick,
  onCardLike,
  currentUser,
  onDeletePlace,
  card,
  setCard,
}) {
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `cards__heart ${
    isLiked && "cards__heart_active"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    setCard(card);
    onDeletePlace();
  }

  return (
    <li className="cards__card">
      {isOwn && (
        <button className="cards__delete" onClick={handleDeleteClick} />
      )}
      <button className="cards__image-button">
        <div
          className="cards__image"
          style={{ backgroundImage: `url(${card.link})` }}
          onClick={handleClick}
        />
      </button>
      <div className="cards__cell">
        <h2 className="cards__text">{card.name}</h2>
        <div className="cards__container">
          <button
            type="button"
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
          />
          <p className="cards__likes">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
