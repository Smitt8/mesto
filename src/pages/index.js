import "./index.css";

import Card from "../components/Card";
import { initialCards } from "../utils/data.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImg from "../components/PopupWithImg.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

import {
  btnEditProfile,
  btnAddNewCard,
  config,
  profileConfig,
  popupTypesConfig,
  popUpName,
  popUpAbout,
  serverConfig
} from "../utils/constants";

const api = new Api(serverConfig);

const userInfo = new UserInfo(
  profileConfig.nameSelector,
  profileConfig.aboutSelector,
  profileConfig.avatarSelector,
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
    (card) => {
      cardsContainer.addItem(addCard(card));
    },
  ".cards"
);

api.getUserInfo() 
  .then(userData => {
    userInfo.setUserInfo(userData);
    return api.getCards()
  })
  .then((cards) => {
    cardsContainer.saveCards(cards);
  })
  .finally(()=> {
    cardsContainer.renderItems();
  })
  .catch(err => {
    console.log(err);
  });


function addCard(cardData) {
  const newCard = new Card(cardData, "#template-card", popupViewer.open, handleDeleteCard);
  return newCard.createCard(userInfo.getId());
}

function handleEditProfile() {
  const userObject = userInfo.getUserInfo();
  popUpName.value = userObject.name;
  popUpAbout.value = userObject.about;
  formEditValidator.resetValidation();
  popupEdit.open();
}

function handleAddNewCard() {
  formAddValidator.resetValidation();
  popupAdd.open();
}

function handleCreateNewCard(event, inputsValues) {
  event.preventDefault();
  api.postCard(inputsValues["place-name"], inputsValues["place-link"])
    .then(card => {
      cardsContainer.addItem(
        addCard(card)
      );
    })
    .catch(err => {
      console.log(err)
    });
}

function handleDeleteCard(card) {
  api.deleteCard(card.getID())
    .then(result => {
      card.removeCard();
    })
    .catch(err => {
      console.log(err)
    });
}

function handleSaveProfile(event, inputsValues) {
  event.preventDefault();

  api.patchUserInfo(inputsValues["user-name"], inputsValues["user-about"])
    .then(result => {
      userInfo.setUserInfo(result);
    })
    .catch(err => {
      console.log(err)
    });
}

// cardsContainer.renderItems();

popupEdit.setEventsListeners();
popupAdd.setEventsListeners();
popupViewer.setEventsListeners();

formAddValidator.enableValidation();
formEditValidator.enableValidation();

btnEditProfile.addEventListener("click", handleEditProfile);
btnAddNewCard.addEventListener("click", handleAddNewCard);
