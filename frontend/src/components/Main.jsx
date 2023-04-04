import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";
import CardContext from "../contexts/CardContext";
import { useContext } from "react";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onDeletePlace,
  setCard,
  cardClick,
  cardLike,
}) {
  const currentUser = useContext(CurrentUserContext);
  const cards = useContext(CardContext);

  return (
    <main className="main">
      <section className="profile">
        <div
          id="avatar"
          className="profile__image"
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
          onClick={onEditAvatar}
        />
        <div className="profile__info">
          <div className="profile__cell">
            <h1 className="profile__title" id="profileName">
              {currentUser.name}
            </h1>
            <button
              type="button"
              className="profile__edit-button"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__text" id="about">
            {currentUser.about}
          </p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="cards">
        <ul className="cards__table">
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                setCard={setCard}
                card={card}
                onCardClick={cardClick}
                onCardLike={cardLike}
                currentUser={currentUser}
                onDeletePlace={onDeletePlace}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
