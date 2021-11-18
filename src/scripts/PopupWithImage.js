import {popupImagePic, popupSubtitle} from './constants.js';
import Popup from './Popup.js';


export default class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector);
        this._image = popupImagePic;
        this._subtitle = popupSubtitle;
        
    }

    open(link, name){
        this._image.src = link; 
        this._image.alt = name;
        this._subtitle.textContent = name; 

        super.open();


    }
}