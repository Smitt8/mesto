const content = document.querySelector(".content");

const profile = content.querySelector(".profile");
export const btnEditProfile = profile.querySelector(".profile__edit-btn");
export const btnAddNewCard = profile.querySelector(".profile__add-btn");

export const profileConfig = {
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
  avatarSelector: ".profile__avatar-img"
};

export const popUpName = document.querySelector(".popup__input_type_name");
export const popUpAbout = document.querySelector(".popup__input_type_job");

export const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  imgSelector: ".popup__img",
  textSelector: ".popup__text",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const popupTypesConfig = {
  popupEditSelector: ".popup_type_edit",
  popupAddSelector:".popup_type_add",
  popupViewerSelector: ".popup_type_viewer",
  popupConfirmSelector: ".popup_type_confirm"
};

export const serverConfig = {
  url: 'https://mesto.nomoreparties.co',
  token: '62ca9a86-8eaa-474b-a40e-721345246b87',
  cohort: 'cohort-43'
};
