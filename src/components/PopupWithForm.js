import Popup from './Popup.js';
export default class PopupWithForm extends Popup{
    constructor(popupSelector, formSubmitHandler){
        super(popupSelector);
        //super(this._popup);
        this._form = this._popup.querySelector('.popup__form')
        this._submitButton = this._popup.querySelector('.popup__add-button');
        this._formSubmitHandler = formSubmitHandler;
        this._inputList = document.querySelectorAll('.popup__input');
        
        
    }
    _getInputValues(){
        this._inputValues = {};
        this._inputList.forEach((element) =>{
            this._inputValues[element.name] = element.value;
        })
        return this._inputValues
    }

    close(){
        this._form.reset();
        super.close()
    }

    setEventListeners(){
        this._form.addEventListener('submit', ()=>{
            this._formSubmitHandler(this._getInputValues());
            this.close()

        })
        super.setEventListeners()
    }
}