class Students{
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

class BtechStudents extends Students{

}

const sonu=new Students("sonu",10,10)
sonu.buyBooks()
console.log(sonu.buyBooks())
console.log(sonu)


// Access Modifiers

// Public
// Private
// Protected


// ----------- Inheritence -----------

class Student {
    login(name:string,password:string){
        if(name && password){
            return "student login successfull"
        }
    }

    result(marks:number){
        if(marks>33){
            return "Passed";
        }else{
            return "Filed"
        }
    }
}

class Teacher extends Student{
    subjects(subject:string){
        return `He Teaches ${subject}`
    }
}

let Suresh=new Teacher()
console.log(Suresh.login("jojoj","jojo"))



// 