export default class Api{
    constructor(config){
        this._url = config.url;
        this._headers = config.headers
    }

    _checkResponce(res){
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    }

    getInitialCards(){
        return fetch(`${this._url}cards/`, {
            method: "GET",
            headers: this._headers   
        })
        .then(this._checkResponce);
          };

    addCard(data){
        return fetch(`${this._url}cards/`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(data)
        })
        .then(this._checkResponce);
          };
    

    getUserInfoApi(){
        return fetch(`${this._url}users/me/`, {
            method: "GET",
            headers: this._headers   
        })
        .then(this._checkResponce);
          };
    

    updateUserInfo(data){
        return fetch(`${this._url}users/me/`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(data)
        })
        .then(this._checkResponce);
          };
        
    

    setCardLike(cardId){return fetch(`${this._url}cards/likes/${cardId}`, {
        method: "PUT",
        headers: this._headers,
    })
    .then(this._checkResponce);
          };

    deleteCardLike(cardId){return fetch(`${this._url}cards/likes/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
    })
    .then(this._checkResponce);
          };

    deleteCard(cardId){return fetch(`${this._url}cards/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
    })
    .then(this._checkResponce);
          };

    
    updateAvatar(data){return fetch(`${this._url}users/me/avatar/`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify(data)
    })
    .then(this._checkResponce);
          };




}