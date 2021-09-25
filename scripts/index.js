const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup_type_edit-profile');
const popupAdd = document.querySelector('.popup_type_add-card');
const popupImage = document.querySelector('.popup_type_image');
const popupImagePic = popupImage.querySelector('.popup__image');
const addButton = document.querySelector('.profile__add-button')
const editButton = document.querySelector('.profile__edit-button');
const photoGrid = document.querySelector('.photo-grid');

const cardName = popupAdd.querySelector('.popup__input_type_place');
const cardImage = popupAdd.querySelector('.popup__input_type_image');


let nameInput = popup.querySelector('.popup__input_type_name');
let jobInput = popup.querySelector('.popup__input_type_description');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');

let popupForm = popup.querySelector('.popup__form');


function openPopup(popup){
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

function closePopup(popup){
    popup.classList.remove('popup_opened')
};

function formSubmitHandler (evt) {
    evt.preventDefault();
    setProfileValue();
    closePopup(popupEdit)
};


function createCard(data){
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = cardImage.value;
    cardElement.querySelector('.card__title').textContent = cardName.value;

    photoGrid.prepend(cardElement);

    const cardDeleteBtn = cardElement.querySelector('.card__delete-button');
    cardDeleteBtn.addEventListener('click', function(evt){
        evt.target.closest(".card").remove()
    });

    const cardLikeBtn = cardElement.querySelector('.card__like-button');
    cardLikeBtn.addEventListener('click', function(evt){
        evt.target.classList.toggle('card__like-button_active')
    });

    const cardPicture = cardElement.querySelector('.card__image')
    cardPicture.addEventListener('click', function(evt){
        console.log(evt.currentTarget);
        popupImagePic.src = evt.target.src;
        openPopup(popupImage);
        let popupImageCloseBtn = popupImage.querySelector('.popup__close-button');
        popupImageCloseBtn.addEventListener('click', function(){
        closePopup(popupImage)
});
               
    })

    
};

function cardSubmit(evt){
    evt.preventDefault();
    createCard();
    closePopup(popupAdd)
};

function clearInput(){
    cardName.value = "";
    cardImage.value = "";
}




editButton.addEventListener('click', function() {
    setInputValue()
    openPopup(popupEdit)
});

let popupEditCloseBtn = popupEdit.querySelector('.popup__close-button');
popupEditCloseBtn.addEventListener('click', function(){
    closePopup(popupEdit)
});


popupForm.addEventListener('submit', formSubmitHandler);

addButton.addEventListener('click', function(){
    clearInput()
    openPopup(popupAdd)
})

let popupAddCloseBtn = popupAdd.querySelector('.popup__close-button');
popupAddCloseBtn.addEventListener('click', function(){
    closePopup(popupAdd)
});

let popupAddForm = popupAdd.querySelector('.popup__form');
popupAddForm.addEventListener('submit', cardSubmit);



