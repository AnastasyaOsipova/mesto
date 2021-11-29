import './index.css';
import Card from '../components/Card.js';
import {FormValidator, validationConfig} from '../components/FormValidator.js';
import {
    addButton,
    editButton,
    nameInput,
    jobInput,
    avatarEditButton,
      
    
} from '../utils/constants.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import Api from '../components/Api.js'



const validationFormAdd = new FormValidator(validationConfig, '.popup__form_add');
const validationFormEdit = new FormValidator(validationConfig, '.popup__form_edit');
const validationFormEditAvatar = new FormValidator(validationConfig, '.popup__form_edit-avatar');

const defaultCards = new Section({renderer: (item) =>{
    defaultCards.setItem(createCard(item))}} ,'.photo-grid')
const newInfo = new UserInfo('.profile__name', '.profile__description', '.profile__avatar');

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-30/',
    headers: {
        authorization: "6c6307bf-f204-483f-a472-5319b4c7128b",
        "Content-Type": "application/json"
    }
})

let userId = null;


const user = api.getUserInfoApi().
then(data =>{
    userId = data._id;
    setUserInfo(data);
    setAvatar(data);
})
.then(() =>{api.getInitialCards().
then(data => {
    defaultCards.renderItems(data)
})})
.catch((err) => {
    console.log(err); 
  }); 


const defaultFormValue = new UserInfo('.profile__name', '.profile__description');


const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

const deletePopup = new PopupWithSubmit('.popup_type_delete-card');


function zoomPicture (link, name){
    popupImage.open(link, name);
    
}


deletePopup.setEventListeners();

function handleDeleteCard(card){
    
    deletePopup.open();
    deletePopup.handleSubmit(() =>{
        api.deleteCard(card.id).
        then(() =>{card.deleteCard(card)})
        .then(() =>deletePopup.close())
        .catch((err) => {
            console.log(err); 
          })
        .finally(() =>deletePopup.turnBackButtonText())
        
        
    })
        
}

function handleLikeClick(card){
    if(card.isLiked())
    {
        api.deleteCardLike(card.id).
        then(dataCard => {card.setLikes(dataCard.likes)})
        .catch((err) => {
            console.log(err); 
          });
    }
    else{
        api.setCardLike(card.id).
        then(dataCard => {card.setLikes(dataCard.likes)})
        .catch((err) => {
            console.log(err); 
          });
    }
    
}

function createCard(data) {
    const cardElement = new Card({data:{...data, currentUser: userId}}, '#card-template', zoomPicture, handleDeleteCard, handleLikeClick).generateCard();
    return cardElement
    
}


function saveNewCard(data) {
    api.addCard(data).
    then(data => {defaultCards.setItem(createCard(data))})
    .catch((err) => {
        console.log(err); 
      })
    .then(() => {popupAdd.close()})
    .finally(() =>popupAdd.turnBackButtonText())
};


function setUserInfo (data){
    newInfo.setUserInfo(data);
    return newInfo
}

function updateUserInfo(data){
    api.updateUserInfo(data).
    then(data =>{
        setUserInfo(data)
})
.catch((err) => {
    console.log(err); 
  })
.then(() => {popupEdit.close()})
.finally(() =>popupEdit.turnBackButtonText())
}

function updateFormValue(){
    const newFormValue = defaultFormValue.getUserInfo();
    return newFormValue

}

function setAvatar(data){
    newInfo.setAvatar(data);
    return newInfo
}

function updateAvatar(data){
    api.updateAvatar(data).
    then(data =>{
        setAvatar(data)
})
.catch((err) => {
    console.log(err); 
  })
.then(() => {popupEditAvatar.close()})
.finally(() =>popupEditAvatar.turnBackButtonText())
}

function setInputValue({username, job}){
    nameInput.value = username;
    jobInput.value = job;
    
}


const popupEdit = new PopupWithForm('.popup_type_edit-profile', updateUserInfo);

editButton.addEventListener('click', () =>{
    setInputValue(updateFormValue())
    popupEdit.open();
    validationFormEdit.resetValidation()
})

popupEdit.setEventListeners();

const popupAdd = new PopupWithForm('.popup_type_add-card', saveNewCard);

addButton.addEventListener('click', () =>{
    popupAdd.open();
    validationFormAdd.resetValidation()
});

popupAdd.setEventListeners();

const popupEditAvatar = new PopupWithForm('.popup_type_edit-avatar', updateAvatar);

avatarEditButton.addEventListener('click', () =>{
    popupEditAvatar.open();
    validationFormEditAvatar.resetValidation();
});

popupEditAvatar.setEventListeners();





validationFormAdd.enableValidation();
validationFormEdit.enableValidation();
validationFormEditAvatar.enableValidation();









  





