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

function createCard(name, link) {
  const card = templateCard.content.firstElementChild.cloneNode(true);
  const photo = card.querySelector('.card__photo');
  photo.src = link;
  photo.alt = name;

  card.querySelector('.card__heading').textContent = name;

  return card;
}

const cards = content.querySelector('.photo-grid');

initialCards.forEach(element => {
  cards.append(createCard(element.name, element.link));
});

const profile = content.querySelector('.profile');
profile.querySelector('.profile__edit-btn').addEventListener('click', editHandler);

const popUp = document.querySelector('.popup');
const popUpContainer = popUp.querySelector('.popup__container');
const popUpForm = popUpContainer.querySelector('.popup__form');

popUpContainer.querySelector('.popup__close-btn').addEventListener('click', editHandler);
popUpForm.addEventListener('submit', saveHandler);

function editHandler() {
  popUp.classList.toggle('popup_opened');
  if (popUp.classList.contains('popup_opened')) {
    popUpForm.querySelector('.popup__input_type_name').value = profile.querySelector('.profile__name').textContent;
    popUpForm.querySelector('.popup__input_type_job').value = profile.querySelector('.profile__profession').textContent;
  }
}

function saveHandler(e) {

  e.preventDefault();

  profile.querySelector('.profile__name').textContent = document.querySelector('.popup__input_type_name').value;
  profile.querySelector('.profile__profession').textContent = document.querySelector('.popup__input_type_job').value;
  editHandler();
}