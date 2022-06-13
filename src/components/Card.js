export default class Card {
  constructor({ name, link }, templateSelector, {handleViewer, handleRemove}, isOwner) {
    this._name = name;
    this._link = link;
    this._cardSelector = templateSelector;
    this._handleViewer = handleViewer;
    this._handleRemove = handleRemove;

    this._isOwner = isOwner;
  }

  _getTemplate = () => {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  };

  _toggleLike = () => {
    this._btnLikeCard.classList.toggle("card__btn-like_active");
  };

  _removeCard = () => {
    this._handleRemove(this._element);
  };

  _setEventsListeners = () => {
    this._btnLikeCard.addEventListener("click", () => this._toggleLike());
    if (this._isOwner) {
      this._btnRemoveCard.addEventListener("click", () => this._removeCard());
    }
    this._cardImage.addEventListener("click", () =>
      this._handleViewer({ name: this._name, link: this._link })
    );
  };

  createCard = () => {
    this._element = this._getTemplate();

    this._btnLikeCard = this._element.querySelector(".card__btn-like");
    this._btnRemoveCard = this._element.querySelector(".card__remove");
    this._cardImage = this._element.querySelector(".card__photo");

    if (!this._isOwner) {
      this._btnRemoveCard.remove();
      this._btnRemoveCard = null;
    }


    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._element.querySelector(".card__heading").textContent = this._name;

    this._setEventsListeners();

    return this._element;
  };
}
