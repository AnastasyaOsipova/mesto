import {Card} from './Card.js';
import {FormValidator, validationConfig} from './Validate.js'

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  
const popupEdit = document.querySelector('.popup_type_edit-profile');
const popupAdd = document.querySelector('.popup_type_add-card');
const popupImage = document.querySelector('.popup_type_image');
const popupImagePic = popupImage.querySelector('.popup__image');
const popupSubtitle = popupImage.querySelector('.popup__subtitle');
const addButton = document.querySelector('.profile__add-button')
const editButton = document.querySelector('.profile__edit-button');
const photoGrid = document.querySelector('.photo-grid');
const addSubmitButton = popupAdd.querySelector('.popup__add-button');
const editSubmitButton = popupEdit.querySelector('.popup__add-button');


const validationFormAdd = new FormValidator(validationConfig, '.popup__form_add');
const validationFormEdit = new FormValidator(validationConfig, '.popup__form_edit');

const cardName = popupAdd.querySelector('.popup__input_type_place');
const cardImage = popupAdd.querySelector('.popup__input_type_image');


const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_description');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');

const popupForm = popupEdit.querySelector('.popup__form');


export default function openPopup(popup){
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape); 
};

function setInputValue(){
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
};

function setProfileValue(){
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value
};

function closePopup(popup){
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape); 
};

function submitEditForm (evt) {
    evt.preventDefault();
    setProfileValue();
    closePopup(popupEdit)
};

function clickOverlay(evt){
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target)
    }
};

function closeByEscape(evt){
    if (evt.key === 'Escape') {
       const openedPopup = document.querySelector('.popup_opened');
       closePopup(openedPopup)
    }
};


const popupImageCloseBtn = popupImage.querySelector('.popup__close-button');
        popupImageCloseBtn.addEventListener('click', function(){
        closePopup(popupImage) });


popupImage.addEventListener('click', clickOverlay);

function createCard(data){
    const cardElement = new Card(data, '#card-template').generateCard()
    return cardElement
};
        

function submitCard(evt){
    evt.preventDefault();
    photoGrid.prepend(createCard({
        link: cardImage.value,
        name: cardName.value
        },)); 
    closePopup(popupAdd)
};

function clearInput(){
    cardName.value = "";
    cardImage.value = "";
};

initialCards.forEach(function(item){
    photoGrid.prepend(createCard(item)); 

  });


editButton.addEventListener('click', function() {
    setInputValue()
    openPopup(popupEdit)
    validationFormEdit.resetValidation()
    
});

const popupEditCloseBtn = popupEdit.querySelector('.popup__close-button'); 

popupEditCloseBtn.addEventListener('click', function(){ 
    closePopup(popupEdit) 
}); 

popupForm.addEventListener('submit', submitEditForm);

addButton.addEventListener('click', function(){
    clearInput()
    openPopup(popupAdd)
    validationFormAdd.resetValidation()
});

const popupAddCloseBtn = popupAdd.querySelector('.popup__close-button'); 

popupAddCloseBtn.addEventListener('click', function(){ 
    closePopup(popupAdd) 
}); 

popupAdd.addEventListener('click', clickOverlay);
popupEdit.addEventListener('click', clickOverlay);


const popupAddForm = popupAdd.querySelector('.popup__form');
popupAddForm.addEventListener('submit', submitCard);


validationFormAdd.enableValidation();
validationFormEdit.enableValidation();


export {popupImagePic, popupSubtitle, popupImage}

