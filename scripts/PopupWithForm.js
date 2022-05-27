import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { formSelector, inputsSelector }, handleSubmitForm) {
    super(popupSelector)
    this._handleSubmitForm = handleSubmitForm

    this._form = this._popup.querySelector(formSelector);
    this._inputs = Array.from(this._form.querySelectorAll(inputsSelector));
  }

  _getInputsValues() {

    this._values = [];

    this._inputs.forEach(input => {
      this._values.push(input.value);
    });
  };

  close() {
    this._form.reset();
    super.close();
  }

  setEventsListeners() {
    super.setEventsListeners();

    this._form.addEventListener('submit', (event) => {
      this._getInputsValues()
      this._handleSubmitForm(event, this._values);
      this.close();
    });
  }

}