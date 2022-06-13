export default class UserInfo {
  constructor(nameSelector, aboutSelector, handlerLoadUserInfo, handlerEditUserInfo) {
    this._nameSelector = nameSelector;
    this._aboutSelector = aboutSelector;
    
    this._handlerEditUserInfo = handlerEditUserInfo;
    this._handlerLoadUserInfo = handlerLoadUserInfo;

    this._nameField = document.querySelector(this._nameSelector);
    this._aboutField = document.querySelector(this._aboutSelector);

    handlerLoadUserInfo()
      .then(userData => {
        this._updUserInfo(userData);
      })
      .catch(err => {
        console.log(err);
      });
  }

  _updUserInfo({ name, about, _id, avatar, cohort }) {
    this._name = name;
    this._about = about;
    this._id = _id;
    this._avatar = avatar;
    this._cohort = cohort;

    this._nameField.textContent = this._name;
    this._aboutField.textContent = this._about;
  }


  setUserInfo({ name, about }) {
    this._handlerEditUserInfo(name, about)
      .then(data => {
        this._updUserInfo(data);
      })
      .catch(err => {
        console.log(err);
      })

  
  }

  getUserInfo() {
    return {
      name: this._name,
      data: this._about,
    };
  }
}
