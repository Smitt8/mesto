const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const content = document.querySelector('.content');
const templateCard = document.querySelector('#template-card');

const profile = content.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__profession');

const editBtn = profile.querySelector('.profile__edit-btn');
const addBtn = profile.querySelector('.profile__add-btn');

const popUps = document.querySelectorAll('.popup');

const popUpEdit = document.querySelector('.popup_type_edit');
const popUpEditForm = popUpEdit.querySelector('.popup__form');
const popUpName = popUpEditForm.querySelector('.popup__input_type_name');
const popUpJob = popUpEditForm.querySelector('.popup__input_type_job');
const popUpEditClose = popUpEdit.querySelector('.popup__close-btn');

const popUpAdd = document.querySelector('.popup_type_add');
const popUpAddForm = popUpAdd.querySelector('.popup__form');
const popUpPlace = popUpAddForm.querySelector(".popup__input_type_place");
const popUpLink = popUpAddForm.querySelector(".popup__input_type_link");
const popUpAddClose = popUpAdd.querySelector('.popup__close-btn');


const popUpView = document.querySelector('.popup_type_viewer');
const popUpImg = popUpView.querySelector('.popup__img');
const popUpText = popUpView.querySelector('.popup__text');
const popUpViewClose = popUpView.querySelector('.popup__close-btn');


const cards = content.querySelector('.cards');

function toogleLike(e) {
  e.target.classList.toggle('card__like_active');
}

function removeCard(e) {
  e.target.parentElement.remove();
}

function displayView(e) {

  popUpImg.src = e.target.src;
  popUpImg.alt = e.target.alt;

  popUpText.textContent = e.target.alt;
  openPopUp(popUpView);
}

function createCard(name, link) {
  const card = templateCard.content.firstElementChild.cloneNode(true);
  const photo = card.querySelector('.card__photo');
  photo.src = link;
  photo.alt = name;

  card.querySelector('.card__heading').textContent = name;

  card.querySelector('.card__like').addEventListener('click', toogleLike);
  card.querySelector('.card__remove').addEventListener('click', removeCard);
  photo.addEventListener('click', displayView);

  return card;
}

initialCards.forEach(element => {
  cards.append(createCard(element.name, element.link));
});

function openPopUp(popUp) {
  popUp.classList.add('popup_opened');
  document.addEventListener('keydown', escHandler);
}

function closePopUp(popUp) {
  popUp.classList.remove('popup_opened');
  document.removeEventListener('keydown', escHandler);
}

function setProfile() {
  popUpName.value = profileName.textContent;
  popUpJob.value = profileJob.textContent;
}

function editHandler() {
  setProfile();
  openPopUp(popUpEdit);
}

function createHandler(event) {
  event.preventDefault();
  
  cards.prepend(
    createCard(
      popUpPlace.value,
      popUpLink.value
    )
  );
}

function saveHandler(event) {

  event.preventDefault();

  profileName.textContent = popUpName.value;
  profileJob.textContent = popUpJob.value;
}

function overlayHandler(event, popUp) {
  if (event.target === event.currentTarget) {
    closePopUp(popUp);
  }
}

function escHandler (event) {
  if (event.key === 'Escape') {
    const popUp = document.querySelector('.popup_opened');
    closePopUp(popUp);
  }
}

setProfile();

popUps.forEach(elementPopUp => {
  elementPopUp.addEventListener('click', (event) => {
    overlayHandler(event, elementPopUp);
  });
});

editBtn.addEventListener('click', editHandler);
addBtn.addEventListener('click', ()=> {
  popUpAddForm.reset();
  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
  openPopUp(popUpAdd);
});

popUpViewClose.addEventListener('click', () => {
  closePopUp(popUpView);
});

popUpEditClose.addEventListener('click', () => {
  closePopUp(popUpEdit);
});

popUpAddClose.addEventListener('click', () => {
  closePopUp(popUpAdd);
});

popUpEditForm.addEventListener('submit', (event) => {
  saveHandler(event);
  closePopUp(popUpEdit);
});

popUpAddForm.addEventListener('submit', (event) => {
  createHandler(event);
  closePopUp(popUpAdd);
});
