let profile = document.querySelector('.content').querySelector('.profile');
profile.querySelector('.profile__edit-btn').addEventListener('click', editHandler);

let popUp = document.querySelector('.popup');
let popUpContainer = popUp.querySelector('.popup__container');
let popUpForm = popUpContainer.querySelector('.popup__form');

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