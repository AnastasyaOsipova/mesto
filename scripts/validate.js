class FormValidator{
    constructor(config, formSelector){
        this._config = config;
        this._formSelector = formSelector;
    }

    _findInvalidInput (inputList)  {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid
        })
    };
    
    _showError (formElement, inputElement, errorMessage)  {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._config.errorClass)
    };
    
    _hideError  (formElement, inputElement)  {
        const errorElement = document.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove(this._config.errorClass)
    };
    
    _checkInputValidity (formElement, inputElement) {
        if (!inputElement.validity.valid) {
            this._showError(formElement, inputElement, inputElement.validationMessage)
        }
        else{
            this._hideError(formElement, inputElement)
        }
    };
    
    _toggleButton (inputList, submitButton)  {
        if(this._findInvalidInput(inputList)){
            submitButton.classList.add(this._config.inactiveButtonClass)
        }
        else{
            submitButton.classList.remove(this._config.inactiveButtonClass)
        }
    };
    
    _setEventListeners (formElement)  {
    const inputList = Array.from(formElement.querySelectorAll(this._config.inputSelector));
    const submitButton = formElement.querySelector(this._config.submitButtonSelector);
    this._toggleButton(inputList, submitButton);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            this._checkInputValidity(formElement, inputElement);
            this._toggleButton(inputList, submitButton)
        })
        
        })
        
    }
    
    
    enableValidation ()  {
        const formElement =  document.querySelector(this._formSelector); 
        this._setEventListeners(formElement, this._config);

        formElement.addEventListener('submit', (evt) => {
          evt.preventDefault();
        });
      
          
      }

}



  const validationConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__add-button',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  };
  

 export {FormValidator, validationConfig}



