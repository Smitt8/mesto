export default class FormValidator {
  /**
   *
   * @param {*} config
   * @param {HTMLFormElement} form
   */
  constructor(config, form) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;

    this._form = form;

    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._formInputs = Array.from(this._form.querySelectorAll(this._inputSelector));
  }

  _showMessage = (input) => {
    const error = document.querySelector(`#${input.id}-error`);

    error.classList.add(this._errorClass);
    input.classList.add(this._inputErrorClass);
    error.textContent = input.validationMessage;
  }

  _hideMessage = (input) => {
    const error = document.querySelector(`#${input.id}-error`);

    error.classList.remove(this._errorClass);
    input.classList.remove(this._inputErrorClass);
    error.textContent = '';
  }

  _toggleButton = () => {

    this._submitButton.disabled = !this._form.checkValidity();

    this._submitButton.classList.toggle(
      this._inactiveButtonClass,
      !this._form.checkValidity()
    );
  }

  _isValid = (input) => {
    if (!input.validity.valid) {
      this._showMessage(input);
    } else {
      this._hideMessage(input);
    }
    this._toggleButton();
  }

  _setEventListeners = () => {
    this._form.addEventListener('input', (event) => {
      this._isValid(event.target);
    });
  }

  _cleanInputs = () => {
    this._formInputs.forEach((input) => {
      this._hideMessage(input);
    });
  }

  enableValidation = () => {
    this._toggleButton();
    this._setEventListeners();
  }

  resetValidation = () => {
    this._cleanInputs();
    this._toggleButton();
  }
}
