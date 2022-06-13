export default class Api {
  constructor(url, cohort, token) {
    this._url = `${url}/v1/${cohort}`;

    this._headers = this._createHeader(token);
  }

  _createHeader(token) {
    return {
      'Content-type': 'application/json',
      authorization: `${token}`,
    }
  }
}