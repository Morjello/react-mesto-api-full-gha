class AuthApi {
  constructor(options) {
    this._url = options.baseUrl;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  register(password, email) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    }).then((res) => this._getResponseData(res));
  }

  login(password, email) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    })
      .then((res) => this._getResponseData(res))
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          return data;
        }
      });
  }

  checkToken(token) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => this._getResponseData(res))
      .then((data) => data);
  }
}

export const authApi = new AuthApi({
  baseUrl: "https://auth.nomoreparties.co",
});
