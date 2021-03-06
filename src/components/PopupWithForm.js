import Popup from './Popup.js';
export default class PopupWithForm extends Popup{
    constructor(popupSelector, formSubmitHandler){
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form')
        this._submitButton = this._popup.querySelector('.popup__add-button');
        this._formSubmitHandler = formSubmitHandler;
        this._inputList = this._popup.querySelectorAll('.popup__input');
        
        
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

    updateButtonText(){
        this._submitButton.textContent = "Сохранение..."
    }

    turnBackButtonText(){
        this._submitButton.textContent = "Сохранить"
    }

    setEventListeners(){
        this._form.addEventListener('submit', ()=>{
            this.updateButtonText();
            this._formSubmitHandler(this._getInputValues());
            

        })
        super.setEventListeners()
    }
}