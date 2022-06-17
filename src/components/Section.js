export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  renderItems(cards) {
    cards.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(elemnent) {
    this._container.prepend(elemnent);
  }

}