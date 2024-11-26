// TypeScript adds syntax on top of JavaScript, allowing developers to add types.
// TypeScript allows specifying the types of data being passed around within the code, and has the ability to report errors when the types don't match.
// TypeScript uses compile time type checking. Which means it checks if the specified types match before running the code, not while running the code.

// -------------------- Installing TS -------------------------

// npm install typescript --save-dev


// ------------------------- ANY --------------------------

// any is a type that disables type checking and effectively allows all types to be used.

// any can be a useful way to get past errors since it disables type checking, but TypeScript will not be able provide type safety, and tools which rely on type data, such as auto completion, will not work. Remember, it should be avoided at "any" cost.

// ------------------------- unknown --------------------------
// unknown is best used when you don't know the type of data being typed. To add a type later, you'll need to cast it.

// Casting is when we use the "as" keyword to say property or variable is of the casted type.

// ------------------------- Readonly --------------------------

// The readonly keyword can prevent arrays from being changed.

const names: readonly string[] = ["Dylan"];
names.push("Jack"); // Error: Property 'push' does not exist on type 'readonly string[]'.
// try removing the readonly modifier and see if it works?

// Type Inference
const numbers = [1, 2, 3]; // inferred to type number[]
// numbers.push(4); // no error
// // comment line below out to see the successful assignment
// numbers.push("2"); // Error: Argument of type 'string' is not assignable to parameter of type 'number'.
// let head: number = numbers[0]; // no error

// --------------------------- Typed Arrays ---------------------------
// Typed Arrays
// A tuple is a typed array with a pre-defined length and types for each index.

// Tuples are great because they allow each element in the array to be a known type of value.

// To define a tuple, specify the type of each element in the array:

// define our tuple
let ourTuple: [number, boolean, string];

// initialize correctly
ourTuple = [5, false, 'Coding God was here'];

// define our readonly tuple
const ourReadonlyTuple: readonly [number, boolean, string] = [5, true, 'The Real Coding God'];
// throws error as it is readonly.
ourReadonlyTuple.push('Coding God took a day off');

// If you have ever used React before you have worked with tuples more than likely.

// useState returns a tuple of the value and a setter function.

const [firstName, setFirstName] = useState('Dylan') is a common example.

// Because of the structure we know our first value in our list will be a certain value type in this case a string and the second value a function.


const graph: [number, number] = [55.2, 41.3];
const [x, y] = graph;

// --------------------------- TS Objects ------------------------

const car: { type: string, model: string, year: number } = {
    type: "Toyota",
    model: "Corolla",
    year: 2009
  };

//   Object types like this can also be written separately, and even be reused using Interface

// milage is not required. By default it is required
const car2: { type: string, mileage?: number } = { // no error
    type: "Toyota"
  };
  car2.mileage = 2000;

// ------------------------------------------Index Signatures--------------------------

// Index signatures can be used for objects without a defined list of properties.

const nameAgeMap: { [index: string]: number } = {};
nameAgeMap.Jack = 25; // no error
nameAgeMap.Mark = "Fifty"; // Error: Type 'string' is not assignable to type 'number'.


// ------------------------ Enums -----------------------------------

// An enum is a special "class" that represents a group of constants (unchangeable variables).


enum StatusCodes {
    NotFound = 404,
    Success = 200,
    Accepted = 202,
    BadRequest = 400
  }
  // logs 404
  console.log(StatusCodes.NotFound);
  // logs 200
  console.log(StatusCodes.Success);

  enum CardinalDirections {
    North,
    East,
    South,
    West
  }
  let currentDirection = CardinalDirections.North;
  // logs 0
  console.log(currentDirection);
  // throws error as 'North' is not a valid enum
  currentDirection = 'North'; // Error: "North" is not assignable to type 'CardinalDirections'.

//   ------String Enums----------

//   Enums can also contain strings. This is more common than numeric enums, because of their readability and intent.


// Object
const Colors = {
    RED: "red",
    BLUE: "blue",
    GREEN: "green",
};

// Enum (TypeScript)
enum Colors {
    RED = "red",
    BLUE = "blue",
    GREEN = "green",
}


enum CardinalDirections2 {
    North = 'North',
    East = "East",
    South = "South",
    West = "West"
  };
  // logs "North"
  console.log(CardinalDirections2.North);
  // logs "West"
  console.log(CardinalDirections2.West);


// When to Use:
// Objects: Use them when working in plain JavaScript or when you don't need strict type checking.
// Enums: Use them in TypeScript when you need type safety, reverse mapping, or integration with TypeScript's type system.


//------------------------------------- TypeScript Type Aliases and Interfaces------------------

// TypeScript allows types to be defined separately from the variables that use them.

// Aliases and Interfaces allows types to be easily shared between different variables/objects.

// Type Aliases
// Type Aliases allow defining types with a custom name (an Alias).

type CarYear = number
type CarType = string
type CarModel = string

type Car = {
  year: CarYear,
  type: CarType,
  model: CarModel
}

const carYear: CarYear = 2001
const carType: CarType = "Toyota"
const carModel: CarModel = "Corolla"
const car: Car = {
  year: carYear,
  type: carType,
  model: carModel
};


//---------------- Interfaces ---------------

// Interfaces are similar to type aliases, except they only apply to object types.

interface Rectangle {
    height: number,
    width: number
  }
  
  const rectangle: Rectangle = {
    height: 20,
    width: 10
  };

//   Extending an interface means you are creating a new interface with the same properties as the original, plus something new.

interface Rectangle {
    height: number,
    width: number
  }
  
  interface ColoredRectangle extends Rectangle {
    color: string
  }
  
  const coloredRectangle: ColoredRectangle = {
    height: 20,
    width: 10,
    color: "red"
  };


//   -------------------- TypeScript Union Types -------------------------------------

// Union types are used when a value can be more than a single type.
// Such as when a property would be string or number.

function printStatusCode(code: string | number) {
    console.log(`My status code is ${code}.`)
  }
  printStatusCode(404);
  printStatusCode('404');


  function printHello(): void {
    console.log('Hello!');
  }

  function multiply2(a: number, b: number):number {
    return a * b;
  }



  function multiply3(a: number, b: number):string {
    return String(a * b);
  }

  const res=multiply2(3,4)
  console.log(typeof(res) )


// ---------------------------- Optional Parameters -----------------------------

// By default TypeScript will assume all parameters are required, but they can be explicitly marked as optional.

// the `?` operator here marks parameter `c` as optional
function add(a: number, b: number, c?: number) {
    return a + b + (c || 0);
}

// ----------------------------- Default Parameters -----------------------

// Named Parameters
// Typing named parameters follows the same pattern as typing normal parameters.

function divide({ dividend, divisor }: { dividend: number, divisor: number }) {
    return dividend / divisor;
  }

//   Rest Parameters

function add(a: number, b: number, ...rest: number[]) {
    return a + b + rest.reduce((p, c) => p + c, 0);
  }

  type Negate = (value: number) => number;

// in this function, the parameter `value` automatically gets assigned the type `number` from the type `Negate`
const negateFunction: Negate = (value) => value * -1;


// -------------------------------- Force casting --------------------

// To override type errors that TypeScript may throw when casting, first cast to unknown, then to the target type.

let x = 'hello';
console.log(((x as unknown) as number).length); // x is not actually a number so this will return undefined

interface Shape {
    getArea: () => number;
  }
  
  class Rectangle implements Shape {
    public constructor(protected readonly width: number, protected readonly height: number) {}
  
    public getArea(): number {
      return this.width * this.height;
    }
  }
  
  class Square extends Rectangle {
    public constructor(width: number) {
      super(width, width);
    }
  
    // getArea gets inherited from Rectangle
  }

