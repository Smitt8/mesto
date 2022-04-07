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
profile.querySelector('.profile__add-btn').addEventListener('click', ()=> {
  togglePopUp(document.querySelector('.popup_type_add'));
});

const popUps = document.querySelectorAll('.popup');

popUps.forEach((element) => {
  element.addEventListener('click', (e) => {
    if (e.target.closest('.popup__close-btn') || e.target === e.currentTarget) { 
      togglePopUp(element);
    }
  });
  const popUpForm = element.querySelector('.popup__form');

  if (popUpForm) {
    let handler;
    if (element.classList.contains('popup_type_edit')) {
      handler = saveHandler;
    } else if (element.classList.contains('popup_type_add')){
      handler = createHandler;
    }
    popUpForm.addEventListener('submit', (e) => {
      handler(e, element);
      togglePopUp(element);
    });
  }
});

function togglePopUp(popUp) {
  popUp.classList.toggle('popup_opened');
}

function editHandler() {
  const popUp = document.querySelector('.popup_type_edit');
  const popUpForm = popUp.querySelector('.popup__form');
  togglePopUp(popUp);
  if (popUp.classList.contains('popup_opened')) {
    popUpForm.querySelector('.popup__input_type_name').value = profile.querySelector('.profile__name').textContent;
    popUpForm.querySelector('.popup__input_type_job').value = profile.querySelector('.profile__profession').textContent;
  }
}

function createHandler(e, popUp) {
  e.preventDefault();
  const place = popUp.querySelector(".popup__input_type_place");
  const link = popUp.querySelector(".popup__input_type_link");
  cards.prepend(
    createCard(
      place.value,
      link.value
    )
  );
  place.value = '';
  link.value ='';
}

function saveHandler(e, popUp) {

  e.preventDefault();
  const name = popUp.querySelector('.popup__input_type_name');
  const job = popUp.querySelector('.popup__input_type_job');

  profile.querySelector('.profile__name').textContent = name.value;
  profile.querySelector('.profile__profession').textContent = job.value;
}