const findInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid
    })
};

const showError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active')
};

const hideError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.textContent = "";
    errorElement.classList.remove('popup__input-error_active')
};

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage)
    }
    else{
        hideError(formElement, inputElement)
    }
};

const toggleButton = (inputList, submitButton) => {
    if(findInvalidInput(inputList)){
        submitButton.classList.add('button_inactive')
    }
    else{
        submitButton.classList.remove('button_inactive')
    }
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const submitButton = formElement.querySelector('.popup__add-button');
    toggleButton(inputList, submitButton);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            checkInputValidity(formElement, inputElement);
            toggleButton(inputList, submitButton)
        })
        
    })
};


const enableValidation = () => {
    const formList =  Array.from(document.querySelectorAll('.popup__form')); 
    formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  
      setEventListeners(formElement);
  })
  }
   

enableValidation();


