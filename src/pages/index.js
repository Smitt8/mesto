import "./index.css";

import Card from "../components/Card";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImg from "../components/PopupWithImg.js";
import PopupConfirm from "../components/PopupConfirm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

import {
  btnEditProfile,
  btnAddNewCard,
  btnChangeAvatar,
  config,
  profileConfig,
  popupTypesConfig,
  popUpName,
  popUpAbout,
  serverConfig,
} from "../utils/constants";

const api = new Api({
  url: `${serverConfig.url}/v1/${serverConfig.cohort}`,
  headers: {
    "Content-type": "application/json",
    authorization: `${serverConfig.token}`,
  },
});

const userInfo = new UserInfo(
  profileConfig.nameSelector,
  profileConfig.aboutSelector,
  profileConfig.avatarSelector
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

const popupConfirm = new PopupConfirm(
  popupTypesConfig.popupConfirmSelector,
  config,
  handleDeleteCard
);

const popupAvatar = new PopupWithForm(
  popupTypesConfig.popupAvatarSelector,
  config,
  handleChangeAvatar
);

const formAddValidator = new FormValidator(config, popupAdd.getForm());
const formEditValidator = new FormValidator(config, popupEdit.getForm());
const formAvatarValidator = new FormValidator(config, popupAvatar.getForm());

const cardsContainer = new Section((card) => {
  cardsContainer.addItem(addCard(card));
}, ".cards");

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    cardsContainer.renderItems(cards.reverse());
  })
  .catch((err) => {
    console.log(err);
  });

function addCard(cardData) {
  const newCard = new Card(cardData, "#template-card", {
    handleViewer: popupViewer.open,
    handleDelete: popupConfirm.open,
    handleLike: handleLikeCard,
    handleDislike: handleDislikeCard,
  });
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

function handleNewAvatar() {
  formAvatarValidator.resetValidation();
  popupAvatar.open();
}

function handleCreateNewCard(event, inputsValues) {
  event.preventDefault();
  popupAdd.setSubmitText("Сохранение...");

  api
    .postCard(inputsValues["place-name"], inputsValues["place-link"])
    .then((card) => {
      cardsContainer.addItem(addCard(card));
      popupAdd.close();
    })
    .finally(() => {
      popupAdd.setSubmitText("Создать");
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleChangeAvatar(event, inputsValues) {
  event.preventDefault();
  popupAvatar.setSubmitText("Сохранение...");

  api
    .changeAvatar(inputsValues["user-avatar"])
    .then((userData) => {
      userInfo.setUserInfo(userData);
      popupAvatar.close();
    })
    .finally(() => {
      popupAvatar.setSubmitText("Сохранить");
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleDeleteCard(card) {
  api
    .deleteCard(card.getID())
    .then(() => {
      card.removeCard();
      popupConfirm.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleSaveProfile(event, inputsValues) {
  event.preventDefault();
  popupEdit.setSubmitText("Сохранение...");

  api
    .patchUserInfo(inputsValues["user-name"], inputsValues["user-about"])
    .then((result) => {
      userInfo.setUserInfo(result);
      popupEdit.close();
    })
    .finally(() => {
      popupEdit.setSubmitText("Сохранить");
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleLikeCard(card) {
  api
    .likeCard(card.getID())
    .then((newCard) => {
      card.updCardLike(newCard);
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleDislikeCard(card) {
  api
    .dislikeCard(card.getID())
    .then((newCard) => {
      card.updCardLike(newCard);
    })
    .catch((err) => {
      console.log(err);
    });
}

popupEdit.setEventsListeners();
popupAdd.setEventsListeners();
popupViewer.setEventsListeners();
popupConfirm.setEventsListeners();
popupAvatar.setEventsListeners();

formAddValidator.enableValidation();
formEditValidator.enableValidation();
formAvatarValidator.enableValidation();

btnEditProfile.addEventListener("click", handleEditProfile);
btnAddNewCard.addEventListener("click", handleAddNewCard);
btnChangeAvatar.addEventListener("click", handleNewAvatar);
