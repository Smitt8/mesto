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

function toogleLike(e) {
  e.target.classList.toggle('card__like_active');
}

function createCard(name, link) {
  const card = templateCard.content.firstElementChild.cloneNode(true);
  const photo = card.querySelector('.card__photo');
  photo.src = link;
  photo.alt = name;

  card.querySelector('.card__heading').textContent = name;

  card.querySelector('.card__like').addEventListener('click', toogleLike);

  return card;
}

const cards = content.querySelector('.photo-grid');

initialCards.forEach(element => {
  cards.append(createCard(element.name, element.link));
});

const profile = content.querySelector('.profile');
const popUpEdit = document.querySelector('.popup_type_edit');
const popUpAdd = document.querySelector('.popup_type_add');

profile.querySelector('.profile__edit-btn').addEventListener('click', editHandler);
profile.querySelector('.profile__add-btn').addEventListener('click', ()=> {
  openPopUp(popUpAdd);
});

popUpEdit.querySelector('.popup__close-btn').addEventListener('click', () => {
  closePopUp(popUpEdit);
});

popUpAdd.querySelector('.popup__close-btn').addEventListener('click', () => {
  closePopUp(popUpAdd);
});

popUpEdit.querySelector('.popup__form').addEventListener('submit', (e) => {
  saveHandler(e);
  closePopUp(popUpEdit);
});

popUpAdd.querySelector('.popup__form').addEventListener('submit', (e) => {
  createHandler(e);
  closePopUp(popUpAdd);
});

function openPopUp(popUp) {
  popUp.classList.add('popup_opened');
}

function closePopUp(popUp) {
  popUp.classList.remove('popup_opened');
  const inputs = popUp.querySelectorAll('.popup__input');
  inputs.forEach(element => {
    element.value = '';
  });
}

function editHandler() {
  const popUpForm = popUpEdit.querySelector('.popup__form');
  openPopUp(popUpEdit);
  if (popUpEdit.classList.contains('popup_opened')) {
    popUpForm.querySelector('.popup__input_type_name').value = profile.querySelector('.profile__name').textContent;
    popUpForm.querySelector('.popup__input_type_job').value = profile.querySelector('.profile__profession').textContent;
  }
}

function createHandler(e) {
  e.preventDefault();
  cards.prepend(
    createCard(
      popUpAdd.querySelector(".popup__input_type_place").value,
      popUpAdd.querySelector(".popup__input_type_link").value
    )
  );
}

function saveHandler(e) {

  e.preventDefault();
  const name = popUpEdit.querySelector('.popup__input_type_name');
  const job = popUpEdit.querySelector('.popup__input_type_job');

  profile.querySelector('.profile__name').textContent = name.value;
  profile.querySelector('.profile__profession').textContent = job.value;
}
