function helloWorld(){
    console.log("HEllo world")
}

const hello2=()=>{
    console.log("Hello world")
}

hello2()

const addTwo=(a,b)=>{
    console.log(a+b)
}

addTwo(10,11)

function outerFunction() {
    let outerVariable = 'I am outside!';
    
    function innerFunction() {
      console.log(outerVariable); // innerFunction has access to outerVariable
    }
    
    return innerFunction;
  }
  
  const closureExample = outerFunction(); // outerFunction returns innerFunction
  closureExample(); // Logs: "I am outside!"


  // __________________________ Replace Delete ______________________
  const students={
    name:"Sonu Kumar",
    std:"red",
    power:10
}

const {power, ...newStudents } = students;
console.log(newStudents)