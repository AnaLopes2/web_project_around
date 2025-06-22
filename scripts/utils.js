export function openPopup(popup) {
  popup.classList.add("popup_opened", "popup_change_display");
  document
    .querySelector(".popup-overlay")
    .classList.add("popup-overlay_opened");
  document.addEventListener("keydown", closeOnEsc);
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened", "popup_change_display");
  document
    .querySelector(".popup-overlay")
    .classList.remove("popup-overlay_opened");
  document.removeEventListener("keydown", closeOnEsc);
}

export function closeAllPopups() {
  document
    .querySelectorAll(".popup, .popup-add, .popup-image")
    .forEach((popupElement) => {
      popupElement.classList.remove("popup_opened", "popup_change_display");
    });
  document
    .querySelector(".popup-overlay")
    .classList.remove("popup-overlay_opened");
  document.removeEventListener("keydown", closeOnEsc);
}

function closeOnEsc(evt) {
  if (evt.key === "Escape") {
    closeAllPopups();
  }
}
