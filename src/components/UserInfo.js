export default class UserInfo{
    constructor(nameSelector, jobSelector, avatarSelector){
        this.name = document.querySelector(nameSelector);
        this.job = document.querySelector(jobSelector);
        this.avatar = document.querySelector(avatarSelector);

    }

    getUserInfo(){
        const info = {
            username:  this.name.textContent,
            job: this.job.textContent
        };
        return info
    }

    setUserInfo(data){
        this.name.textContent = data.name;
        this.job.textContent = data.about;
    }

    setAvatar(data){
        this.avatar.src = data.avatar;
    }
}