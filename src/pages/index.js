import './index.css';
import Card from '../components/Card.js';
import {FormValidator, validationConfig} from '../components/Validate.js';
import {
    addButton,
    editButton,
    photoGrid,
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

const newInfo = new UserInfo('.profile__name', '.profile__description', '.profile__avatar');

const userApi = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-30/users/me/',
    headers: {
        authorization: "6c6307bf-f204-483f-a472-5319b4c7128b",
        "Content-Type": "application/json"
    }
})

const avatarApi = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-30/users/me/avatar',
    headers: {
        authorization: "6c6307bf-f204-483f-a472-5319b4c7128b",
        "Content-Type": "application/json"
    }
})

const cardApi = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-30/cards/',
    headers: {
        authorization: "6c6307bf-f204-483f-a472-5319b4c7128b",
        "Content-Type": "application/json"
    }
})

const likeApi = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-30/cards/likes',
    headers: {
        authorization: "6c6307bf-f204-483f-a472-5319b4c7128b",
        "Content-Type": "application/json"
    }
})


let userId = null;


const user = userApi.getUserInfoApi().
then(data =>{
    userId = data._id;
    setUserInfo(data);
})
.then(cardApi.getInitialCards().
then(data => {
    const defaultCards = new Section({items: data, renderer: (item) =>{
    defaultCards.setItem(createCard(item));}}
    , '.photo-grid');
    defaultCards.renderItems();
    
}));


let userAvatar = userApi.getUserInfoApi()
.then(data =>{
    setAvatar(data)
})


const defaultFormValue = new UserInfo('.profile__name', '.profile__description');


const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

const deletePopup = new PopupWithSubmit('.popup_type_delete_card');


function zoomPicture (link, name){
    popupImage.open(link, name);
    
}


deletePopup.setEventListeners();

function handleDeleteCard(card){
    
    deletePopup.open();
    deletePopup.handleSubmit(() =>{
        cardApi.deleteCard(card.id).
        then(() =>{card.deleteCard(card)})
        .then(() =>deletePopup.close()).
        finally(() =>deletePopup.turnBackButtonText())
        
        
    })
        
}

function handleLikeClick(card){
    if(card.isLiked())
    {
        likeApi.deleteCardLike(card.id).
        then(dataCard => {card.setLikes(dataCard.likes)})
    }
    else{
        likeApi.setCardLike(card.id).
        then(dataCard => {card.setLikes(dataCard.likes)})
    }
    console.log(card)
}

function createCard(data) {
    const cardElement = new Card({data:{...data, currentUser: userId}}, '#card-template', zoomPicture, handleDeleteCard, handleLikeClick).generateCard();
    return cardElement
    
}


function saveNewCard(data) {
    cardApi.addCard(data).
    then(data => {photoGrid.prepend(createCard(data))}).
    finally(() => {popupAdd.close()})
};


function setUserInfo (data){
    newInfo.setUserInfo(data);
    return newInfo
}

function updateUserInfo(data){
    userApi.updateUserInfo(data).
    then(data =>{
        setUserInfo(data)
}).
finally(() => {popupEdit.close()})
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
    avatarApi.updateAvatar(data).
    then(data =>{
        setAvatar(data)
}).
finally(() => {popupEditAvatar.close()})
}

function setInputValue({username, job}){
    nameInput.value = username;
    jobInput.value = job;
    
}


const popupEdit = new PopupWithForm('.popup_type_edit-profile', updateUserInfo);

editButton.addEventListener('click', () =>{
    popupEdit.turnBackButtonText();
    setInputValue(updateFormValue())
    popupEdit.open();
    validationFormEdit.resetValidation()
})

popupEdit.setEventListeners();

const popupAdd = new PopupWithForm('.popup_type_add-card', saveNewCard);

addButton.addEventListener('click', () =>{
    popupEdit.turnBackButtonText();
    popupAdd.open();
    validationFormAdd.resetValidation()
});

popupAdd.setEventListeners();

const popupEditAvatar = new PopupWithForm('.popup_type_edit-avatar', updateAvatar);

avatarEditButton.addEventListener('click', () =>{
    popupEdit.turnBackButtonText();
    popupEditAvatar.open();
    validationFormEditAvatar.resetValidation();
});

popupEditAvatar.setEventListeners();





validationFormAdd.enableValidation();
validationFormEdit.enableValidation();
validationFormEditAvatar.enableValidation();









  





