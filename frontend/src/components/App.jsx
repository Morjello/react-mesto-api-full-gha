import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { api } from "../utils/Api";
import { authApi } from "../utils/AuthApi";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import CardContext from "../contexts/CardContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePlacePopup from "./DeletePlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import union from "../images/Union.jpg";
import unionFail from "../images/UnionFail.png";

function App() {
  const navigate = useNavigate();
  // стейт авторизации пользователя
  const [loggedIn, setLoggedIn] = useState(false);
  // стейт попапов
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = useState(false);
  const [infoTooltipText, setInfoTooltipText] = useState("");
  const [infoTooltipImage, setInfoTooltipImage] = useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  // стейт данных пользователя
  const [currentUser, setCurrentUser] = useState({});
  // стейт карточек
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  //стейт карточки
  const [cardData, setCardData] = useState("");
  //стейт токена
  const [userEmail, setUserEmail] = useState("");

  //открытие попапов
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleDeletePlaceClick() {
    setIsDeletePlacePopupOpen(true);
  }

  function openInfoTooltipPopup() {
    setIsInfoTooltipOpen(true);
  }

  // закрытие попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  // передача данных карточки
  function handleCardClick(card) {
    setSelectedCard(...card);
  }

  // поставить убрать лайк
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (!isLiked) {
      api
        .putLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log("Ошибка добавления лайка", err);
        });
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log("Ошибка удаления лайка", err);
        });
    }
  }

  // обновление данных пользователя
  function handleUpdateUser({ name, about }) {
    api
      .editProfileInfo({ name, about })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка обновления данных пользователя", err);
      });
  }

  // обновление аватара
  function handleUpdateAvatar({ avatar }) {
    api
      .editUserAvatar(avatar)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка обновления аватара", err);
      });
  }

  // добавление новой карточки
  function handleAddPlaceSubmit({ name, link }) {
    api
      .addNewCard({ name, link })
      .then((cardData) => {
        setCards([cardData, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка добавления новой карточки", err);
      });
  }

  function handleSetCard(cardData) {
    setCardData(cardData);
  }

  // удаление карточки
  function handleDeletePlaceSubmit(card) {
    api
      .deleteCard(card._id)
      .then((del) => {
        setCards((state) => state.filter((d) => d._id !== card._id && del));
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка удаления карточки", err);
      });
  }

  // получение данных пользователя
  useEffect(() => {
    if (loggedIn) {
      getUserData();
    }
  }, [loggedIn]);

  function getUserData() {
    Promise.all([api.getProfileInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => {
        console.log("Ошибка загрузки данных пользователя", err);
      });
  }

  // регистрация пользователя
  function handleRegisterUser({ password, email }) {
    authApi
      .register(password, email)
      .then(() => {
        setInfoTooltipText("Вы успешно зарегистрировались!");
        setInfoTooltipImage(union);
        openInfoTooltipPopup();
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        setInfoTooltipText("Что-то пошло не так! Попробуйте ещё раз.");
        setInfoTooltipImage(unionFail);
        openInfoTooltipPopup();
        console.log("Регистрация не удалась", err);
      });
  }

  // авторизация пользователя
  function handleLoginUser({ password, email }) {
    authApi
      .login(password, email)
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          setUserEmail(email);
          setInfoTooltipText("Вы успешно авторизовались!");
          setInfoTooltipImage(union);
          openInfoTooltipPopup();
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        setInfoTooltipText("Что-то пошло не так! Попробуйте ещё раз.");
        setInfoTooltipImage(unionFail);
        openInfoTooltipPopup();
        console.log("Ошибка входа", err);
      });
  }

  // проверка токена
  useEffect(() => {
    tokenCheck();
  }, []);

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      authApi
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserEmail(res.data.email);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          console.log("Ошибка валидности токена", err);
        });
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardContext.Provider value={cards}>
        <Routes>
          <Route
            path="/sign-up"
            element={
              <>
                <Header logText={"Войти"} path={"/sign-in"} />
                <Register onRegisterUser={handleRegisterUser} />
              </>
            }
          />
          <Route
            path="/sign-in"
            element={
              <>
                <Header logText={"Регистрация"} path={"/sign-up"} />
                <Login onLoginUser={handleLoginUser} />
              </>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <>
                  <Header logoutText={"Выйти"} path={""} email={userEmail} />
                  <Main
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onDeletePlace={handleDeletePlaceClick}
                    setCard={handleSetCard}
                    cardClick={handleCardClick}
                    cardLike={handleCardLike}
                  />
                </>
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddPlaceSubmit}
        />
        <DeletePlacePopup
          isOpen={isDeletePlacePopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleDeletePlaceSubmit}
          cardData={cardData}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          infoTooltipImage={infoTooltipImage}
          infoTooltipText={infoTooltipText}
        />
      </CardContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
