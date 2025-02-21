// Find my popup div
const popup = document.querySelector(".popup");
const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close-button");
const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#about");
const profileName = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const overlay = document.querySelector(".popup-overlay");

// LIKE BUTTON:
// Select all like buttons
const likeButtons = document.querySelectorAll(".elements__item-likeBtn");

// Open the popup when clicking the edit button
editButton.addEventListener("click", function openPopup() {
  popup.classList.add("popup_change_display");
  overlay.classList.add("popup-overlay_opened");

  nameInput.value = profileName.textContent;
  jobInput.value = profileSubtitle.textContent;
});
console.log(popup);
// Close the popup when clicking the close button
closeButton.addEventListener("click", function closePopup() {
  console.log(closeButton);
  popup.classList.remove("popup_change_display");
  overlay.classList.remove("popup-overlay_opened");
});
// When the form is submitted
formElement.addEventListener("submit", function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Prevents the default form submission

  // Get the values from the inputs
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  // Update the profile with the new values
  profileName.textContent = nameValue;
  profileSubtitle.textContent = jobValue;

  // Close the popup after saving
  popup.classList.remove("popup_change_display");
  overlay.classList.remove("popup-overlay_opened");
});

// Add the click event to each button
likeButtons.forEach((likeButton) => {
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("liked");
  });
});
