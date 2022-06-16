export default class UserInfo {
  constructor(nameSelector, aboutSelector, avatarSelector) {
    this._nameSelector = nameSelector;
    this._aboutSelector = aboutSelector;
    this._avatarSelector = avatarSelector;
    
    this._nameField = document.querySelector(this._nameSelector);
    this._aboutField = document.querySelector(this._aboutSelector);
    this._avatarImg = document.querySelector(this._avatarSelector);

  }

  setUserInfo({ name, about, _id, avatar, cohort }) {
    this._name = name;
    this._about = about;
    this._id = _id;
    this._avatar = avatar;
    this._cohort = cohort;

    this._nameField.textContent = this._name;
    this._aboutField.textContent = this._about;
    this._avatarImg.src = this._avatar;
  }

  getId() {
    return this._id;
  }

  getUserInfo() {
    return {
      name: this._name,
      about: this._about,
      avatar: this._avatar,
      _id: this._id,
      cohort: this._cohort
    };
  }
}
