import './index.css';
import Card from '../components/Card.js';
import {FormValidator, validationConfig} from '../components/Validate.js';
import {initialCards,
    addButton,
    editButton,
    photoGrid,
    nameInput,
    jobInput,
    
    
} from '../utils/constants.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

const validationFormAdd = new FormValidator(validationConfig, '.popup__form_add');
const validationFormEdit = new FormValidator(validationConfig, '.popup__form_edit');

const newInfo = new UserInfo('.profile__name', '.profile__description');

const defaultFormValue = new UserInfo('.profile__name', '.profile__description');

const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

function zoomPicture (link, name){
    popupImage.open(link, name);
    
}

function createCard(data) {
    const cardElement = new Card(data, '#card-template', zoomPicture).generateCard();
    return cardElement
}

function handleCardClick(data) {
    photoGrid.prepend(createCard(data))
}


const defaultCards = new Section({items: initialCards, renderer: (item) =>{
    defaultCards.setItem(createCard(item));}}
    , '.photo-grid'
);

defaultCards.renderItems();


function setUserInfo (data){
    newInfo.setUserInfo(data);
    return newInfo
}

function updateFormValue(){
    const newFormValue = defaultFormValue.getUserInfo();
    return newFormValue

}

function setInputValue({username, job}){
    nameInput.value = username;
    jobInput.value = job;
    
}


const popupEdit = new PopupWithForm('.popup_type_edit-profile', setUserInfo);

editButton.addEventListener('click', () =>{
    setInputValue(updateFormValue())
    popupEdit.open();
    validationFormEdit.resetValidation()
})

popupEdit.setEventListeners();

const popupAdd = new PopupWithForm('.popup_type_add-card', handleCardClick);

addButton.addEventListener('click', () =>{
    popupAdd.open();
    validationFormAdd.resetValidation()
});

popupAdd.setEventListeners();

validationFormAdd.enableValidation();
validationFormEdit.enableValidation();









  





