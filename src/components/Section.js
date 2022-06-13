export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  saveCards(cards) {
    this._cards = cards;
  }

  renderItems() {
    this._cards.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(elemnent) {
    this._container.prepend(elemnent);
  }

}