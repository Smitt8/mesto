let profile = document.querySelector('.content').querySelector('.profile');
profile.querySelector('.profile__edit-btn').addEventListener('click', editHandler);

let popUp = document.querySelector('.popup');
let popUpContainer = popUp.querySelector('.popup__container');

popUpContainer.addEventListener('reset', editHandler);
popUpContainer.addEventListener('submit', saveHandler);
document.addEventListener('keydown', e => {
  if (popUp.classList.contains('popup_opened') && e.key === 'Enter') {
    saveHandler(e);
  }
});



function editHandler() {
  popUp.classList.toggle('popup_opened');
  if (popUp.classList.contains('popup_opened')) {
    document.querySelector('#user-name').value = profile.querySelector('.profile__name').textContent;
    document.querySelector('#user-job').value = profile.querySelector('.profile__profession').textContent;
  }
}

function saveHandler(e) {

  e.preventDefault();

  profile.querySelector('.profile__name').textContent = document.querySelector('#user-name').value;
  profile.querySelector('.profile__profession').textContent = document.querySelector('#user-job').value;
  editHandler();
}