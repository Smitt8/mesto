import Popup from "./Popup.js";

export default class PopupWithImg extends Popup{
  constructor (popupSelector, {imgSelector, textSelector}) {
    super(popupSelector);
    
    this._img = this._popup.querySelector(imgSelector);
    this._text = this._popup.querySelector(textSelector);
  }

  open = ({name, link}) => {
    this._img.src = link;
    this._img.alt = name;

    this._text.textContent = name;
    super.open();
  }
}