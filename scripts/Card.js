export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  // 🔒 Private method to get the template and clone it
  _getTemplate() {
    const template = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__item")
      .cloneNode(true);
    return template;
  }
  // 🔒 Private method to set up event listeners
  _setEventListeners() {
    this._likeBtn.addEventListener("click", () => {
      this._likeBtn.classList.toggle("liked");
    });
    this._trashBtn.addEventListener("click", () => {
      this._element.remove();
    });
    this._image.addEventListener("click", () => {
      const popup = document.querySelector(".popup-image");
      const overlay = document.querySelector(".popup-overlay");
      const popupImg = document.querySelector(".popup-image__img");
      const popupName = document.querySelector(".popup-image__name");

      popup.classList.add("popup_opened");
      overlay.classList.add("popup-overlay_opened");
      popupImg.src = this._link;
      popupImg.alt = this._name;
      popupName.textContent = this._name;
    });
  }

  //public method that returns the cards
  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector(".elements__item-image");
    this._likeBtn = this._element.querySelector(".elements__item-likeBtn");
    this._trashBtn = this._element.querySelector(".elements__item-trashBtn");
    this._title = this._element.querySelector(".elements__item-name");

    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;

    this._setEventListeners();
    return this._element;
  }
}
