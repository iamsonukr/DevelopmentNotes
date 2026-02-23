export interface UserInfo{
    name:string;
    age:number;
    address:string;
    email:string;
}

export class Auth {
    login(name:string,password:string){
        if(name && password){
            return "student login successfull"
        }
    }
}

export class Student{
    name:string;
    age:number;
    std:number;
    prmotedToNext:boolean;
    constructor(name:string, age:number, std:number){
        this.name=name,
        this.age=age,
        this.std=std,
        this.prmotedToNext=false
    }

    promotedToNext():void{
        this.prmotedToNext=true;
    }

    buyBooks():string{
        return `${this.name} is going to buy books`
    }
}