export default class Card {
  constructor({ name, link }, templateSelector, handleViewer) {
    this._name = name;
    this._link = link;
    this._cardSelector = templateSelector;
    this._handleViewer = handleViewer;
  }

  _getTemplate = () => {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  };

  _toggleLike = () => {
    this._btnLikeCard.classList.toggle("card__like_active");
  };

  _removeCard = () => {
    this._element.remove();
    this._element = null;
  };

  _setEventsListeners = () => {
    this._btnLikeCard.addEventListener("click", () => this._toggleLike());
    this._btnRemoveCard.addEventListener("click", () => this._removeCard());
    this._cardImage.addEventListener("click", () =>
      this._handleViewer({ name: this._name, link: this._link })
    );
  };

  createCard = () => {
    this._element = this._getTemplate();

    this._btnLikeCard = this._element.querySelector(".card__like");
    this._btnRemoveCard = this._element.querySelector(".card__remove");
    this._cardImage = this._element.querySelector(".card__photo");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._element.querySelector(".card__heading").textContent = this._name;

    this._setEventsListeners();

    return this._element;
  };
}
