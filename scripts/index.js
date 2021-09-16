const popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let popupCloseButton = popup.querySelector('.popup__close-button');

let nameInput = popup.querySelector('.popup__input_type_name');
let jobInput = popup.querySelector('.popup__input_type_description');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');

let popupAddButton = popup.querySelector('.popup__add-button');
let popupForm = popup.querySelector('.popup__container');

function editProfile(){
    popup.classList.add('popup_opened')
};

function setInputValue(){
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
};

function setProfileValue(){
        profileName.textContent = nameInput.value;
        profileJob.textContent = jobInput.value
};

function closePopup(){
    popup.classList.remove('popup_opened')
};

function formSubmitHandler (evt) {
    evt.preventDefault();
    setProfileValue();
    popup.classList.remove('popup_opened')
};


editButton.addEventListener('click', function() {
    setInputValue()
    editProfile()
});


popupForm.addEventListener('submit', formSubmitHandler);

popupCloseButton.addEventListener('click', closePopup);


