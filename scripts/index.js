import Card from "./Card.js";
import { initialCards } from "./data.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import Popup from "./Popup.js";
import PopupWithForm from "./PopupWithForm.js";

const content = document.querySelector(".content");

const profile = content.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileJob = profile.querySelector(".profile__profession");

const btnEditProfile = profile.querySelector(".profile__edit-btn");
const btnAddNewCard = profile.querySelector(".profile__add-btn");

const popUps = document.querySelectorAll(".popup");

const popUpEdit = document.querySelector(".popup_type_edit");
const popUpEditForm = popUpEdit.querySelector(".popup__form");
const popUpName = popUpEditForm.querySelector(".popup__input_type_name");
const popUpJob = popUpEditForm.querySelector(".popup__input_type_job");

const popUpAdd = document.querySelector(".popup_type_add");
const popUpAddForm = popUpAdd.querySelector(".popup__form");
const popUpPlace = popUpAddForm.querySelector(".popup__input_type_place");
const popUpLink = popUpAddForm.querySelector(".popup__input_type_link");

const popUpView = document.querySelector(".popup_type_viewer");
const popUpImg = popUpView.querySelector(".popup__img");
const popUpText = popUpView.querySelector(".popup__text");

const config = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const formAddValidator = new FormValidator(config, popUpAddForm);

const formEditValidator = new FormValidator(config, popUpEditForm);

const cardsContainer = new Section(
  {
    items: initialCards,
    renderer: (card) => {
      cardsContainer.addItem(addCard(card));
    },
  },
  ".cards"
);

const popupEdit = new PopupWithForm(
  ".popup_type_edit",
  {
    formSelector: ".popup__form",
    inputsSelector: ".popup__input",
  },
  handleSaveProfile
);

const popupAdd = new PopupWithForm(
  ".popup_type_add",
  {
    formSelector: ".popup__form",
    inputsSelector: ".popup__input",
  },
  handleCreateNewCard
);


formAddValidator.enableValidation();

formEditValidator.enableValidation();

const displayView = ({ link, name }) => {
  popUpImg.src = link;
  popUpImg.alt = name;

  popUpText.textContent = name;
  openPopUp(popUpView);
};

function addCard(cardData) {
  const newCard = new Card(cardData, "#template-card", displayView);
  return newCard.createCard();
}

function openPopUp(popUp) {
  popUp.classList.add("popup_opened");
}

function setProfile() {
  popUpName.value = profileName.textContent;
  popUpJob.value = profileJob.textContent;
}

function handleEditProfile() {
  setProfile();
  formEditValidator.resetValidation();
  popupEdit.open();
}

function handleAddNewCard() {
  formAddValidator.resetValidation();
  popupAdd.open();
}

function handleCreateNewCard(event) {
  event.preventDefault();
  cardsContainer.addItem(
    addCard({
      name: popUpPlace.value,
      link: popUpLink.value,
    })
  );
}

function handleSaveProfile(event, values) {
  event.preventDefault();

  profileName.textContent = values[0];
  profileJob.textContent = values[1];
}

cardsContainer.renderItems();

popupEdit.setEventsListeners();
popupAdd.setEventsListeners();

btnEditProfile.addEventListener("click", handleEditProfile);
btnAddNewCard.addEventListener("click", handleAddNewCard);
