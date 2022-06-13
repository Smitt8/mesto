import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor(popupSelector, { submitButtonSelector }, handleDeleteCard) {
    super(popupSelector);

    this._submitButtonSelector = submitButtonSelector;
    this._handleDeleteCard = handleDeleteCard;

    this._button = this._popup.querySelector(this._submitButtonSelector);
  }

  _handleConfirmRemove = () => {
    this._handleDeleteCard(this._card);
    super.close();
  }

  open = (card) => {
    this._card = card;
    super.open();
  }

  setEventsListeners() {
    super.setEventsListeners();
    this._button.addEventListener('click',this._handleConfirmRemove);
  }

}