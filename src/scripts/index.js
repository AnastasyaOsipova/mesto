import Card from './Card.js';
import {FormValidator, validationConfig} from './Validate.js';
import {initialCards,
    addButton,
    editButton,
    photoGrid,
    nameInput,
    jobInput,
    
    
} from './constants.js';
import Popup from './Popup.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import Section from './Section.js';
import UserInfo from './UserInfo.js';

const validationFormAdd = new FormValidator(validationConfig, '.popup__form_add');
const validationFormEdit = new FormValidator(validationConfig, '.popup__form_edit');

const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

function zoomPicture (link, name){
    popupImage.open(link, name);
    
}



const defaultCards = new Section({items: initialCards, renderer: (item) =>{
    const newCard = new Card (item, '#card-template', zoomPicture).generateCard();

    defaultCards.setItem(newCard);}}
    , '.photo-grid'
);

defaultCards.renderItems();


function setUserInfo (data){
    const newInfo = new UserInfo('.profile__name', '.profile__description');
    newInfo.setUserInfo(data);
    return newInfo
}

function setInputValue (){
    const defaultFormValue = new UserInfo('.profile__name', '.profile__description');
    defaultFormValue.getUserInfo()
    //this._inputValues[element.name] = element.value;
    nameInput.value = defaultFormValue.name.innerHTML;
    jobInput.value = defaultFormValue.job.innerHTML;
    
}


const popupEdit = new PopupWithForm('.popup_type_edit-profile', setUserInfo);

editButton.addEventListener('click', () =>{
    setInputValue()
    popupEdit.open();
    validationFormEdit.resetValidation()
})

popupEdit.setEventListeners();

const popupAdd = new PopupWithForm('.popup_type_add-card', (data) =>{
    const cardElement = new Card(data, '#card-template', zoomPicture).generateCard();
    photoGrid.prepend(cardElement)
});

addButton.addEventListener('click', () =>{
    popupAdd.open();
    validationFormAdd.resetValidation()
});

popupAdd.setEventListeners();

validationFormAdd.enableValidation();
validationFormEdit.enableValidation();









  





