export default class UserInfo{
    constructor(nameSelector, jobSelector){
        this.name = document.querySelector(nameSelector);
        this.job = document.querySelector(jobSelector)
    }

    getUserInfo(){
        const info = [{
            username:  this.name.textContent,
            job: this.job.textContent
        }];
        return info
    }

    setUserInfo(data){
        this.name.textContent = data.username;
        this.job.textContent = data.job
    }
}