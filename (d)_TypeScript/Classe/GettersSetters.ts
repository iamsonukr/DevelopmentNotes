class UserInfo{
    name:string;
    email:string;
    constructor(name:string,email:string){
        this.name=name;
        this.email="emp"+email
    }

    get userEmail(){
        return this.email
    }

    set userEmail(email:string){
        this.email="emp"+email
    }
}

const userOne=new UserInfo("Sahil","sahil@gmail.com")

console.log(userOne)
console.log(userOne.userEmail)