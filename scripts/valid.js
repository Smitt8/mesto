function showMessage(input, config) {
  const error = document.querySelector(`#${input.id}-error`);

  error.classList.add(config.errorClass);
  input.classList.add(config.inputErrorClass);
  error.textContent = input.validationMessage;
}

function hideMessage(input, config) {
  const error = document.querySelector(`#${input.id}-error`);

  error.classList.remove(config.errorClass);
  input.classList.remove(config.inputErrorClass);
  error.textContent = '';
}

function toggleButton(form, config) {
  const button = form.querySelector(config.submitButtonSelector);

  button.disable = !form.checkValidity();

  button.classList.toggle(config.inactiveButtonClass, !form.checkValidity());
}

function isValid(form, config) {
  const inputs = form.querySelectorAll(config.inputSelector);

  inputs.forEach(element => {
    if (!element.validity.valid) {
      showMessage(element, config);
    } else {
      hideMessage(element, config);
    }
  });
  toggleButton(form, config);
}

function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));

  forms.forEach(element => {
    toggleButton(element, config);
    element.addEventListener('input', () => {
      isValid(element, config);
    });
  });

}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 