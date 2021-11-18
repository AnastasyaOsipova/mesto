export default class Card{
    constructor(data, cardSelector, handleCardClick){
    this._title = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    
    
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
        return cardElement
    }
    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.card__image').src = this._image;
        this._element.querySelector('.card__image').alt = this._title;
        this._element.querySelector('.card__title').textContent = this._title;
        this._setEventListeners();
        
        return this._element
        
      }

      _likeCard() {
        this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active')
      }

      _deleteCard() {
        this._element.remove();
        this._element = null
      }

      _zoomPicture() {
            popupImagePic.src = this._image; 
            popupSubtitle.textContent = this._title; 
            //openPopup(popupImage);
            }

       _setEventListeners() {
        this._element.querySelector('.card__like-button').addEventListener('click', () => {
            this._likeCard();
        });
      this._element.querySelector('.card__delete-button').addEventListener('click', () => {
        this._deleteCard();
        });

        this._element.querySelector('.card__image').addEventListener('click', () => {
            this._handleCardClick(this._image, this._title);
        });
    }

}
