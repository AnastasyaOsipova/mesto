import Popup from './Popup.js';
export default class PopupWithSubmit extends Popup{
    constructor(popupSelector){
        super(popupSelector);
        this._popup = document.querySelector(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._submitButton = this._popup.querySelector('.popup__add-button');
        this._submitHandler = null
    }

    handleSubmit(handler){
        this._submitHandler = handler
    }

    updateButtonText(){
        this._submitButton.textContent = "Удаление..."
    }

    turnBackButtonText(){
        this._submitButton.textContent = "Да"
    }

    setEventListeners(){
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) =>{
            evt.preventDefault();
            this.updateButtonText();
            this._submitHandler()})
    }

    
}
