export default class Api {
  constructor({url, cohort, token}) {
    this._url = `${url}/v1/${cohort}`;

    this._headers = this._createHeader(token);
  }

  _createHeader(token) {
    return {
      'Content-type': 'application/json',
      authorization: `${token}`,
    }
  }
  getUserInfo = () => {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(result => {
      if (result.ok) {
        return result.json();
      }
      return Promise.reject(`Ошибка: ${result.statusText}`);
    });
  }
  patchUserInfo = (name, about) => {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ 
        name: name,
        about: about 
      }),
    }).then(result => {
      if (result.ok) {
        return result.json();
      }
      return Promise.reject(`Ошибка: ${result.statusText}`);
    });
  }

  getCards = () => {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then(result => {
      if(result.ok) {
        return result.json();
      }
      return Promise.reject(`Ошибка: ${result.statusText}`);
    });
  }
  postCard = (name, link) => {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      }),
    })
    .then(result => {
      if(result.ok) {
        return result.json();
      }
      return Promise.reject(`Ошибка: ${result.statusText}`);
    })
  }
  deleteCard = (cardId) => {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(result => {
      if(result.ok) {
        return result.json();
      }
      return Promise.reject(`Ошибка: ${result.statusText}`);
    });
  }
}