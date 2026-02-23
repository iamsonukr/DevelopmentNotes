type PersonType={
    name:String,
    age:number,
    isEmp:boolean,
}

let PersonData:PersonType={
    name:"Sonu",
    age:32,
    isEmp:true
}

type PersonX=keyof PersonType