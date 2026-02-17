// const fruiteOne={
//     name:"banana",
//     class:"fruit",
//     age:12,
//     eatbanana: function(){
//         console.log("eating banana")
//     },
//     get fruitName(){
//         return this.name
//     },
//     set setFruitName(a){
//         return this.name=a
//     }
// }


// Setters run when you assign a value, not call.

// fruiteOne.setFruitName="Papaya"

// const fruitName=fruiteOne.fruitName
// console.log(fruitName)

// fruiteOne.eatbanana()

// Iterating object

// for(let key in fruiteOne){
//     console.log(key + " value is "+ fruiteOne[key])
// }

// CALL APPLY BIND--------------------------------------

// const user = {
//   name: "John",
//   greet(city,method) {
//     console.log("My name is "+this.name+" I am from "+city," This is getting printed using "+method);
//   },
//   sayHello(){
//     console.log("Hello")
//   }
// };

// const admin={
//     name:"Sonu"
// }

// // const fn = user.greet;
// user.greet.call(admin,"Mumnai","call")

// user.greet.apply(admin,["Mumnai","appy"])

// const usingBind=user.greet.bind(user,"Mumnai","bind")
// usingBind()

// user.sayHello.call(user)
// user.sayHello.apply(user)
// const usingBind2=user.sayHello.bind(user)
// usingBind2()

// -------------- JSON String------------

const myObj = {
    name: "John",
    age: 30,
    cars: [
        { name: "Ford", models: ["Fiesta", "Focus", "Mustang"] },
        { name: "BMW", models: ["320", "X3", "X5"] },
        { name: "Fiat", models: ["500", "Panda"] }
    ]
}

// console.log("Before formating")
// console.log(myObj)
// const formatedString=JSON.stringify(myObj)
// console.log("After formating")
// console.log(formatedString)
// const parsedObject=JSON.parse(formatedString)
// console.log("After Parsing")
// console.log(parsedObject)

// --------- DEEP Copy shallow copy

// Original person object
var person = {
    fname: 'Ram',
    lname: 'Kumar',
    age: 20,
    address: {
        pincode: 828190,
        city: 'Delhi',
    }
};

// const hero={...person}
// Pring person after shallow copy
// hero.address.city="Lajpat"
// hero.fname="Sonu"
// console.log(person)

// Pring person after Deep copy
// const villan=JSON.parse(JSON.stringify(person))
// villan.address.city="Mumbai"
// console.log(person)

const sampArray=[12,32,11,4,565,23]
// console.log(sampArray.sort((a,b)=>b-a))

// const newArray=sampArray.filter((item)=>item<=100)
// console.log(newArray)

// const sumArray=sampArray.reduce((acc,cur)=>acc+cur)
// console.log(sumArray)

// const reverArray=sampArray.reverse()
// console.log("The reversed array is ",reverArray)

// const idx=sampArray.findIndex((item)=>item==12)
// console.log("The index is ", idx)

// Spread Operator and rest operator -----------------------------

const sum=(a,...rest)=>{
    console.log(a,"This is ",rest)
}

