// Find my popup div
const popup = document.querySelector(".popup");
const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close-button");

// Open the popup when clicking the edit button
editButton.addEventListener("click", function openPopup() {
  popup.classList.add("popup_change_display");
});
console.log(popup);
// Close the popup when clicking the close button
closeButton.addEventListener("click", function closePopup() {
  console.log(closeButton);
  popup.classList.remove("popup_change_display");
});
//
//
//
//
//
// LIKE BUTTON:
// Select all like buttons
const likeButtons = document.querySelectorAll(".elements__item__likeBtn");

// Add the click event to each button
likeButtons.forEach((likeButton) => {
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("liked");
  });
});
