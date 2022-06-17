import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor(popupSelector, { formSelector }, handleDeleteCard) {
    super(popupSelector);

    this._formSelector = formSelector;
    this._handleDeleteCard = handleDeleteCard;

    this._form = this._popup.querySelector(this._formSelector);
  }

  _handleConfirmRemove = (event) => {
    event.preventDefault();
    this._handleDeleteCard(this._card);
  }

  open = (card) => {
    this._card = card;
    super.open();
  }

  setEventsListeners() {
    super.setEventsListeners();
    this._form.addEventListener('submit', this._handleConfirmRemove);
  }

}