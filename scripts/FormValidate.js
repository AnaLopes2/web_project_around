export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
  }

  // 🔒 Private method: shows input error
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  // 🔒 Private method: hides input error
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._config.errorClass);
  }

  // 🔒 Private method: checks if input is valid
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      let message = "";
      if (inputElement.validity.valueMissing) {
        message = "Please fill out this field.";
      } else if (
        inputElement.validity.typeMismatch &&
        inputElement.type === "url"
      ) {
        message = "Please enter a valid web address.";
      } else if (inputElement.validity.tooShort) {
        message = `Please enter at least ${inputElement.minLength} characters. You entered ${inputElement.value.length}.`;
      } else {
        message = inputElement.validationMessage;
      }
      this._showInputError(inputElement, message);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // 🔒 Private method: checks if any input is invalid
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  // 🔒 Private method: enables or disables the submit button
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  // 🔒 Private method: adds input listeners
  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  //  Public method: enables form validation
  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
