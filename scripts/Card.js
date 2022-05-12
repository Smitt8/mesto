export default class Card {
  constructor(data, templateSelector, viewerHandler) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = templateSelector;
    this._viewerHandler = viewerHandler;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true);
  }

  _toggleLike(event) {
    event.target.classList.toggle("card__like_active");
  }

  _removeCard() {
    this._element.remove();
  }

  _setEventsListeners() {
    this._element
      .querySelector(".card__like")
      .addEventListener("click", this._toggleLike);
    this._element
      .querySelector(".card__remove")
      .addEventListener("click", () => this._removeCard());
    this._element
      .querySelector(".card__photo")
      .addEventListener("click", () => this._viewerHandler({name: this._name, link:this._link}));
  }

  createCard() {
    this._element = this._getTemplate();

    const photo = this._element.querySelector(".card__photo");
    photo.src = this._link;
    photo.alt = this._name;

    this._element.querySelector(".card__heading").textContent = this._name;

    this._setEventsListeners();

    return this._element;
  }
}
