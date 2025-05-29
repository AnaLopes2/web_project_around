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

// Function to create and add a card
function addCard(cardData) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("elements__item");

  // Create the image
  const imgElement = document.createElement("img");
  imgElement.classList.add("elements__item-image");
  imgElement.src = cardData.link;
  imgElement.alt = cardData.name;

  // Create the info section
  const infoElement = document.createElement("div");
  infoElement.classList.add("elements__item-info");

  const nameElement = document.createElement("p");
  nameElement.classList.add("elements__item-name");
  nameElement.textContent = cardData.name;

  // Create like button
  const likeButton = document.createElement("button");
  likeButton.classList.add("elements__item-likeBtn");

  const likeIcon = document.createElement("img");
  likeIcon.classList.add("like-icon");
  likeIcon.src = "./images/likeButton.svg";
  likeIcon.alt = "like button";

  likeButton.appendChild(likeIcon);
  likeButton.addEventListener("click", function (event) {
    event.stopPropagation();

    likeButton.classList.toggle("liked");
  });

  infoElement.appendChild(nameElement);
  infoElement.appendChild(likeButton);

  // Create delete button
  const trashButton = document.createElement("button");
  trashButton.classList.add("elements__item-trashBtn");

  const trashIconImg = document.createElement("img");
  trashIconImg.classList.add("trash-icon");
  trashIconImg.src = "./images/trash.svg";
  trashIconImg.alt = "Trash icon";

  trashButton.appendChild(trashIconImg);

  trashButton.addEventListener("click", (event) => {
    event.stopPropagation();
    const popupImg = document.querySelector(".popup-image__img");

    if (
      popup.classList.contains("popup_opened") &&
      popupImg.src === imgElement.src
    ) {
      closePopup();
    }

    cardElement.remove();
  });

  // Assemble the card
  cardElement.appendChild(trashButton);
  cardElement.appendChild(imgElement);
  cardElement.appendChild(infoElement);

  elementsSection.prepend(cardElement);
}

// Add initial cards
initialCards.forEach(addCard);
// Find my popup div
const popup = document.querySelector(".popup");
const popupAdd = document.querySelector(".popup-add");
const overlay = document.querySelector(".popup-overlay");
overlay.addEventListener("click", () => {
  closeAllPopups();
});

const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close-button");
const openAddPopupButton = document.querySelector(".profile__add-button");
const closeAddPopupButton = document.querySelector(".popup__close-button-add");

const formElement = document.querySelector(".popup__form");
const addForm = document.querySelector(".popup__form[name='add-item']");

const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#about");
const profileName = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const titleInput = document.querySelector("#title");
const imageInput = document.querySelector("#image-url");

//image popup
document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelector(".elements");
  const popup = document.querySelector(".popup-image");
  const popupImg = document.querySelector(".popup-image__img");
  const closeBtn = document.querySelector(
    ".popup-image .popup-image__close-button "
  );
  const overlay = document.querySelector(".popup-overlay");
  const popupName = document.querySelector(".popup-image__name");

  elements.addEventListener("click", function (event) {
    if (event.target.tagName === "IMG") {
      popup.classList.add("popup_opened");
      overlay.classList.add("popup-overlay_opened");

      popupImg.src = event.target.src;

      // popup image name
      const imageName = event.target.alt;
      popupName.textContent = imageName;
      popup.appendChild(popupName);
    }
  });

  function closePopup() {
    popup.classList.remove("popup_opened");
    overlay.classList.remove("popup-overlay_opened");
    popup.removeChild(popupName);
  }

  // Add event listener
  closeBtn.addEventListener("click", closePopup);
  overlay.addEventListener("click", closePopup);
});

// Open edit popup
editButton.addEventListener("click", function () {
  popup.classList.add("popup_change_display");
  overlay.classList.add("popup-overlay_opened");

  nameInput.value = profileName.textContent;
  jobInput.value = profileSubtitle.textContent;
});

// Close edit popup
closeButton.addEventListener("click", function () {
  popup.classList.remove("popup_change_display");
  overlay.classList.remove("popup-overlay_opened");
});

// Save profile edit
formElement.addEventListener("submit", function (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  popup.classList.remove("popup_change_display");
  overlay.classList.remove("popup-overlay_opened");
});

// Open add card popup
openAddPopupButton.addEventListener("click", function () {
  popupAdd.classList.add("popup_change_display");
  overlay.classList.add("popup-overlay_opened");
});

// Close add card popup
closeAddPopupButton.addEventListener("click", function () {
  popupAdd.classList.remove("popup_change_display");
  overlay.classList.remove("popup-overlay_opened");
});

// Add event listener for form submission
addForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  // Get the form values
  const cardName = titleInput.value.trim();
  const imageUrl = imageInput.value.trim();

  // Validate image URL
  if (cardName && imageUrl) {
    // Add the card
    const newCard = {
      name: cardName,
      link: imageUrl,
    };

    addCard(newCard);

    // Close the popup after adding the card
    popupAdd.classList.remove("popup_change_display");
    overlay.classList.remove("popup-overlay_opened");

    // Clear the form fields
    titleInput.value = "";
    imageInput.value = "";
  } else {
    alert("Please enter a valid name and image URL!");
  }
});
//Close all popups
function closeAllPopups() {
  document
    .querySelectorAll(".popup, .popup-add, .popup-image")
    .forEach((popupElement) => {
      popupElement.classList.remove("popup_opened", "popup_change_display");
    });
  overlay.classList.remove("popup-overlay_opened");
}

//Close when ESC is pressed
document.addEventListener("keydown", (Event) => {
  if (Event.key === "Escape") {
    closeAllPopups();
  }
});
////////////////////////////////////////////////////////////////////////////////////////////

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
