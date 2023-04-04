class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._header = options.headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getProfileInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._header,
    }).then((res) => this._getResponseData(res));
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._header,
    }).then((res) => this._getResponseData(res));
  }

  editProfileInfo(user) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._header,
      body: JSON.stringify({
        name: user.name,
        about: user.about,
      }),
    }).then((res) => this._getResponseData(res));
  }

  addNewCard(card) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._header,
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    }).then((res) => this._getResponseData(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._header,
    }).then((res) => this._getResponseData(res));
  }

  putLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._header,
    }).then((res) => this._getResponseData(res));
  }

  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._header,
    }).then((res) => this._getResponseData(res));
  }

  editUserAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._header,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => this._getResponseData(res));
  }
}

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-52",
  headers: {
    authorization: "8cd6391f-276f-4623-87db-26168ea0dc10",
    "Content-Type": "application/json",
  },
});
