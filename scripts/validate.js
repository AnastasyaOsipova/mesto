const findInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid
    })
};

const showError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass)
};

const hideError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(config.errorClass)
};

const checkInputValidity = (formElement, inputElement, config) => {
    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage, config)
    }
    else{
        hideError(formElement, inputElement, config)
    }
};

const toggleButton = (inputList, submitButton, config) => {
    if(findInvalidInput(inputList)){
        submitButton.classList.add(config.inactiveButtonClass)
    }
    else{
        submitButton.classList.remove(config.inactiveButtonClass)
    }
};

const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const submitButton = formElement.querySelector(config.submitButtonSelector);
    toggleButton(inputList, submitButton, config);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            checkInputValidity(formElement, inputElement, config);
            toggleButton(inputList, submitButton, config)
        })
        
    })
};


const enableValidation = (config) => {
    const formList =  Array.from(document.querySelectorAll(config.formSelector)); 
    formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  
      setEventListeners(formElement, config);
  })
  }

  const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__add-button',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  };
   

enableValidation(validationConfig);


