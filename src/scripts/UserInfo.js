export default class UserInfo {
  constructor(nameSelector, aboutSelector) {
    this._nameSelector = nameSelector;
    this._aboutSelector = aboutSelector;

    this._name = document.querySelector(this._nameSelector);
    this._about = document.querySelector(this._aboutSelector);
  }

  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._about.textContent = about;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      data: this._about.textContent,
    };
  }
}
