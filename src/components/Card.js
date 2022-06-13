export default class Card {
  constructor({ name, link, _id, owner, likes }, templateSelector, handleViewer, handleDelete) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._owner = owner;
    this._likes = likes;
    this._cardSelector = templateSelector;
    this._handleViewer = handleViewer;
    this._handleDelete = handleDelete;
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

  getID() {
    return this._id
  }

  _getOwnerId() {
    return this._owner._id
  }

  removeCard = () => {
    this._element.remove();
    this._element = null;
  };

  _setEventsListeners = () => {
    this._btnLikeCard.addEventListener("click", () => this._toggleLike());
    this._btnRemoveCard.addEventListener("click", () => this._handleDelete(this));
    this._cardImage.addEventListener("click", () =>
      this._handleViewer({ name: this._name, link: this._link })
    );
  };

  createCard = (userId) => {
    this._element = this._getTemplate();

    this._btnLikeCard = this._element.querySelector(".card__btn-like");
    this._btnRemoveCard = this._element.querySelector(".card__remove");
    this._cardImage = this._element.querySelector(".card__photo");
    if (userId !== this._getOwnerId()) {
      this._btnRemoveCard.classList.add('card__remove_disabled');
    }
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._element.querySelector(".card__heading").textContent = this._name;

    this._setEventsListeners();

    return this._element;
  };
}
