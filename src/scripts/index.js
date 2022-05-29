import '../pages/index.css';

import Card from "./Card.js";
import { initialCards } from "./data.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImg from "./PopupWithImg.js";
import UserInfo from "./UserInfo.js";

const content = document.querySelector(".content");

const profile = content.querySelector(".profile");
const btnEditProfile = profile.querySelector(".profile__edit-btn");
const btnAddNewCard = profile.querySelector(".profile__add-btn");

const userInfo = new UserInfo(".profile__name", ".profile__about");

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  imgSelector: ".popup__img",
  textSelector: ".popup__text",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const popupEdit = new PopupWithForm(
  ".popup_type_edit",
  config,
  handleSaveProfile
);

const popupAdd = new PopupWithForm(
  ".popup_type_add",
  config,
  handleCreateNewCard
);

const popupViewer = new PopupWithImg(".popup_type_viewer", config);

const formAddValidator = new FormValidator(config, popupAdd.getForm());
const formEditValidator = new FormValidator(config, popupEdit.getForm());

const cardsContainer = new Section(
  {
    items: initialCards,
    renderer: (card) => {
      cardsContainer.addItem(addCard(card));
    },
  },
  ".cards"
);

function addCard(cardData) {
  const newCard = new Card(cardData, "#template-card", popupViewer.open);
  return newCard.createCard();
}

function handleEditProfile() {
  popupEdit.setInputsValues(userInfo.getUserInfo());
  formEditValidator.resetValidation();
  popupEdit.open();
}

function handleAddNewCard() {
  formAddValidator.resetValidation();
  popupAdd.open();
}

function handleCreateNewCard(event, inputsValues) {
  event.preventDefault();
  cardsContainer.addItem(
    addCard({
      name: inputsValues["place-name"],
      link: inputsValues["place-link"],
    })
  );
}

function handleSaveProfile(event, inputsValues) {
  event.preventDefault();

  userInfo.setUserInfo({
    name: inputsValues["user-name"],
    about: inputsValues["user-about"],
  });
}

cardsContainer.renderItems();

popupEdit.setEventsListeners();
popupAdd.setEventsListeners();
popupViewer.setEventsListeners();

formAddValidator.enableValidation();
formEditValidator.enableValidation();

btnEditProfile.addEventListener("click", handleEditProfile);
btnAddNewCard.addEventListener("click", handleAddNewCard);
