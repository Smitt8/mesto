export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._iniArray = items;
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._iniArray.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(elemnent) {
    this._container.prepend(elemnent);
  }

}