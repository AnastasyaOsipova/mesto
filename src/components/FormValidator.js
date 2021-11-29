const validationConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__add-button',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  };

  class FormValidator{
      constructor(config, formSelector){
          this._config = config;
          this._formSelector = formSelector;
          this._formElement = document.querySelector(formSelector);
          this._inputSelector = config.inputSelector;
          this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
          this._submitButton = this._formElement.querySelector(config.submitButtonSelector)
      }

    _findInvalidInput ()  {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid
        })
    };

    _showError (inputElement, errorMessage)  {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._config.errorClass)
    };

    _hideError  (inputElement)  {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove(this._config.errorClass)
    };
    
    _checkInputValidity (inputElement) {
        if (!inputElement.validity.valid) {
            this._showError(inputElement, inputElement.validationMessage)
        }
        else{
            this._hideError(inputElement)
        }
    };
    
    _toggleButton (inputList)  {
        if(this._findInvalidInput(inputList)){
            this._submitButton.classList.add(this._config.inactiveButtonClass);
            this._submitButton.disabled = true 
        }
        else{
            this._submitButton.classList.remove(this._config.inactiveButtonClass);
            this._submitButton.disabled = false
        }
    };
    
    _setEventListeners ()  {
    this._toggleButton();
    this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            this._checkInputValidity(inputElement);
            this._toggleButton()
        })
        
        })
    this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        
    }
    
    
    enableValidation ()  {
        this._setEventListeners();
                   
      }

    resetValidation() {
        this._toggleButton();
        this._inputList.forEach((inputElement) => {
        this._hideError(inputElement)
        });
    }
  }

  export {FormValidator, validationConfig}