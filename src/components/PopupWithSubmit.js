import Popup from './Popup.js';
export default class PopupWithSubmit extends Popup{
    constructor(popupSelector){
        super(popupSelector);
        this._form = document.querySelector('.popup__form_submit');
        this._submitHandler = null
    }

    handleSubmit(handler){
        this._submitHandler = handler
    }

    setEventListeners(){
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) =>{
            evt.preventDefault()
            this._submitHandler()})
    }

    
}
