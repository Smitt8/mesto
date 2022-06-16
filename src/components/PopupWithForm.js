import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(
    popupSelector,
    { formSelector, inputSelector, submitButtonSelector },
    handleSubmitForm
  ) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;

    this._form = this._popup.querySelector(formSelector);
    this._inputs = Array.from(this._form.querySelectorAll(inputSelector));
    this._bntSubmit = this._form.querySelector(submitButtonSelector);
  }

  _getInputsValues() {
    this._inputsValues = {};

    this._inputs.forEach((input) => {
      this._inputsValues[input.name] = input.value;
    });
  }

  getForm() {
    return this._form;
  }

  close() {
    this._form.reset();
    this._bntSubmit.textContent = "Сохранить";
    super.close();
  }

  setEventsListeners() {
    super.setEventsListeners();

    this._form.addEventListener("submit", (event) => {
      this._getInputsValues();
      this._handleSubmitForm(event, this._inputsValues);
      this._bntSubmit.textContent = 'Сохранение...';
    });
  }
}
