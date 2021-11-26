export default class Card{
    constructor({data}, cardSelector, handleCardClick, handleDeleteCard, handleLikeClick){
    this._title = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._currentUser = data.currentUser;
    this._creater = data.owner._id;
    this.id = data._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteCard = handleDeleteCard;
    
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
        this.updateLikeButton();
        this.handleDeleteButton();
        
        this._element.querySelector('.card__like-counter').textContent = this._likes.length;
        
        this._setEventListeners();
        
        return this._element
        
      }

      _likeCard() {
          this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active')
      }

      
      deleteCard() {
        this._element.remove();
        this._element = null
      }

      deactivate_delete_btn() {
        this._element.querySelector('.card__delete-button').classList.add('card__delete-button_inactive');
      }

      activate_delete_btn() {
        this._element.querySelector('.card__delete-button').classList.remove('card__delete-button_inactive');
      }

      checkCardOwner(){
        if (this._currentUser === this._creater)
        {return(true)}
      }

      handleDeleteButton(){
        if (this.checkCardOwner() === true){
          this.activate_delete_btn()
        }
        else{
          this.deactivate_delete_btn()
        }
      }

      isLiked(){
        return this._likes.some(owner => owner._id === this._currentUser)
      }

         
      updateLikeButton(){
        if(this.isLiked()){
          this._element.querySelector('.card__like-button').classList.add('card__like-button_active')
        }
        else{this._element.querySelector('.card__like-button').classList.remove('card__like-button_active')}
      }

      _updateLikeCounter(){
          this._element.querySelector('.card__like-counter').textContent = this._likes.length;
          this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active')
      }
      
      setLikes(dataCard){
        this._likes = dataCard;
        this._updateLikeCounter();
      }
      
      _setEventListeners() {
        this._element.querySelector('.card__like-button').addEventListener('click', () => {
            this._handleLikeClick(this);
        });
      this._element.querySelector('.card__delete-button').addEventListener('click', () => {
        this._handleDeleteCard(this);
        });

        this._element.querySelector('.card__image').addEventListener('click', () => {
            this._handleCardClick(this._image, this._title);
        });
    }

}

