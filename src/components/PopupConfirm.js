import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor(popupSelector, { submitButtonSelector }) {
    super(popupSelector);

    this._submitButtonSelector = submitButtonSelector;

    this._button = this._popup.querySelector(this._submitButtonSelector);
  }

  _handleConfirmRemove = () => {
    this._element.remove();
    this._element = null;
    super.close();
  }

  open = (element) => {
    this._element = element;
    super.open();
  }

  setEventsListeners() {
    super.setEventsListeners();

    this._button.addEventListener('click', this._handleConfirmRemove);
  }

}