import Card from "./Card.js";
import FormValidator from "./FormValidate.js";
import { openPopup, closePopup, closeAllPopups } from "./utils.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const elementsSection = document.querySelector(".elements");
const popup = document.querySelector(".popup");
const popupAdd = document.querySelector(".popup-add");
const overlay = document.querySelector(".popup-overlay");

const editButton = document.querySelector(".profile__edit-button");
const closeButton = popup.querySelector(".popup__close-button");
const openAddPopupButton = document.querySelector(".profile__add-button");
const closeAddPopupButton = popupAdd.querySelector(".popup__close-button-add");

const formElement = popup.querySelector(".popup__form");
const addForm = popupAdd.querySelector(".popup__form[name='add-item']");

const nameInput = popup.querySelector("#name");
const jobInput = popup.querySelector("#about");
const profileName = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const titleInput = popupAdd.querySelector("#title");
const imageInput = popupAdd.querySelector("#image-url");

const cardTemplateSelector = "#card-template";

// Function to add a card to the DOM using the Card class
function addCard(cardData) {
  const card = new Card(cardData, cardTemplateSelector);
  const cardElement = card.generateCard();
  elementsSection.prepend(cardElement);
}

initialCards.forEach(addCard);

// open the edit popup
editButton.addEventListener("click", () => {
  openPopup(popup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileSubtitle.textContent;
});

// close the edit popup
closeButton.addEventListener("click", () => {
  closePopup(popup);
});

// Save profile edits
formElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popup);
});

// Open popup to add a new card
openAddPopupButton.addEventListener("click", () => {
  openPopup(popupAdd);
});

// Close the add card popup
closeAddPopupButton.addEventListener("click", () => {
  closePopup(popupAdd);
});

// Add a new card from the form submission
addForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const cardName = titleInput.value.trim();
  const imageUrl = imageInput.value.trim();

  if (cardName && imageUrl) {
    addCard({ name: cardName, link: imageUrl });

    closePopup(popupAdd);

    addForm.reset();
  } else {
    alert("Please enter a valid name and image URL!");
  }
});

// Close popups when clicking on the overlay
overlay.addEventListener("click", () => {
  closeAllPopups();
});

// Close popups when pressing the ESC key
document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    closeAllPopups();
  }
});

// Initialize form validation configuration
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const formValidators = {};

// Function to enable validation on all forms on the page
function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((form) => {
    const validator = new FormValidator(config, form);
    const formName = form.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
}

enableValidation(validationConfig);
