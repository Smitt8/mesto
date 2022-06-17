export default class UserInfo {
  constructor(nameSelector, aboutSelector, avatarSelector) {
    this._nameSelector = nameSelector;
    this._aboutSelector = aboutSelector;
    this._avatarSelector = avatarSelector;
    
    this._nameField = document.querySelector(this._nameSelector);
    this._aboutField = document.querySelector(this._aboutSelector);
    this._avatarImg = document.querySelector(this._avatarSelector);

  }

  setUserInfo({ name, about, _id, avatar }) {
    this._id = _id;

    this._nameField.textContent = name;
    this._aboutField.textContent = about;
    this._avatarImg.src = avatar;

  }

  getId() {
    return this._id;
  }

  getUserInfo() {
    return {
      name: this._nameField.textContent,
      about: this._aboutField.textContent,
    };
  }
}
