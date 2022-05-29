export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
  }

  _handleEscClick = (event) => {
    if (event.key === 'Escape') {
      this.close();
    }
  };

  _handleClosePopup = (event) => {
    if (event.target === event.currentTarget || event.target.classList.contains('popup__close-btn')) {
      this.close();
    }
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClick);
  }

  open() {
      this._popup.classList.add('popup_opened');
      document.addEventListener('keydown', this._handleEscClick);
  }

  setEventsListeners() {
    this._popup.addEventListener('mousedown', this._handleClosePopup);
  }
}