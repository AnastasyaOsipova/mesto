export default class Api{
    constructor(config){
        this._url = config.url;
        this._headers = config.headers
    }

    getInitialCards(){
        return fetch(this._url, {
            method: "GET",
            headers: this._headers   
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }

            return Promise.reject(`Сервер недоступен`);
        });
          };

    addCard(data){
        return fetch(this._url, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(data)
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }

            return Promise.reject(`Сервер недоступен`);
        });
    }

    getUserInfoApi(){
        return fetch(this._url, {
            method: "GET",
            headers: this._headers   
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    updateUserInfo(data){
        return fetch(this._url, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(data)
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        });
        
    }

    setCardLike(cardId){return fetch(`${this._url}/${cardId}`, {
        method: "PUT",
        headers: this._headers,
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    });
    }

    deleteCardLike(cardId){return fetch(`${this._url}/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    });
    }

    deleteCard(cardId){return fetch(`${this._url}/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    });
    }

    
    updateAvatar(data){return fetch(this._url, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify(data)
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    });

    }




}