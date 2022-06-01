import "./index.css";

import Card from "../components/Card";
import { initialCards } from "../utils/data.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImg from "../components/PopupWithImg.js";
import UserInfo from "../components/UserInfo.js";

import {
  btnEditProfile,
  btnAddNewCard,
  config,
  profileConfig,
  popupTypesConfig,
  popUpName,
  popUpAbout
} from "../utils/constants";

const userInfo = new UserInfo(
  profileConfig.nameSelector,
  profileConfig.aboutSelector
);

const popupEdit = new PopupWithForm(
  popupTypesConfig.popupEditSelector,
  config,
  handleSaveProfile
);

const popupAdd = new PopupWithForm(
  popupTypesConfig.popupAddSelector,
  config,
  handleCreateNewCard
);

const popupViewer = new PopupWithImg(
  popupTypesConfig.popupViewerSelector,
  config
);

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
  const userObject = userInfo.getUserInfo();
  popUpName.value = userObject.name;
  popUpAbout.value = userObject.data;
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
