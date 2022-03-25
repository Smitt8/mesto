let popUp = document.querySelector('.popup');
let profile = document.querySelector('.content').querySelector('.profile');

profile.querySelector('.profile__edit-btn').addEventListener('click', editHandler);
popUp.querySelector('.popup__container').addEventListener('reset', editHandler);
popUp.querySelector('.popup__container').addEventListener('submit', saveHandler);
popUp.querySelector('.popup__container').addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    saveHandler(e);
  }
})



function editHandler() {
  popUp.classList.toggle('popup_opened');
  if (popUp.classList.contains('popup_opened')) {
    document.getElementById('user-name').value = profile.querySelector('.profile__name').textContent;
    document.getElementById('user-job').value = profile.querySelector('.profile__profession').textContent;
  }
}

function saveHandler(e) {

  e.preventDefault();

  profile.querySelector('.profile__name').textContent = document.getElementById('user-name').value;
  profile.querySelector('.profile__profession').textContent = document.getElementById('user-job').value;
  editHandler();
}