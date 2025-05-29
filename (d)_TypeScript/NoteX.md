# Complete TypeScript Notes

## Table of Contents
1. [Introduction to TypeScript](#introduction-to-typescript)
2. [Installation and Setup](#installation-and-setup)
3. [Basic Types](#basic-types)
4. [Type Inference](#type-inference)
5. [Arrays and Tuples](#arrays-and-tuples)
6. [Objects](#objects)
7. [Enums](#enums)
8. [Type Aliases and Interfaces](#type-aliases-and-interfaces)
9. [Union Types](#union-types)
10. [Functions](#functions)
11. [Classes](#classes)
12. [Type Casting](#type-casting)
13. [Homework Questions](#homework-questions)
14. [Interview Questions and Answers](#interview-questions-and-answers)

---

## Introduction to TypeScript

TypeScript is a statically typed superset of JavaScript that compiles to plain JavaScript. It adds optional static type checking to JavaScript, helping catch errors at compile time rather than runtime.

### Key Benefits:
- **Type Safety**: Catch errors during development
- **Better IDE Support**: Enhanced autocomplete and refactoring
- **Code Documentation**: Types serve as inline documentation
- **Easier Refactoring**: Safe code changes across large codebases

---

## Installation and Setup

```bash
# Install TypeScript globally
npm install -g typescript

# Install TypeScript as dev dependency (recommended)
npm install typescript --save-dev

# Initialize TypeScript config
npx tsc --init

# Compile TypeScript file
npx tsc filename.ts

# Watch mode
npx tsc --watch
```

### Basic tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

---

## Basic Types

### Primitive Types
```typescript
// String
let name: string = "John";
let message: string = `Hello, ${name}!`;

// Number
let age: number = 25;
let price: number = 99.99;
let hex: number = 0xf00d;

// Boolean
let isActive: boolean = true;
let isComplete: boolean = false;

// Null and Undefined
let nullValue: null = null;
let undefinedValue: undefined = undefined;
```

### Any Type
```typescript
// any disables type checking - use sparingly!
let value: any = 42;
value = "hello";
value = true;
value = { x: 1 };
```

**⚠️ Warning**: Avoid `any` when possible as it defeats the purpose of TypeScript's type safety.

### Unknown Type
```typescript
// unknown is safer than any - requires type checking before use
let userInput: unknown = 10;

// Type guard required before use
if (typeof userInput === "string") {
    console.log(userInput.toUpperCase());
}

// Type assertion
let strLength: number = (userInput as string).length;
```

### Never Type
```typescript
// Function that never returns
function throwError(message: string): never {
    throw new Error(message);
}

// Function with infinite loop
function infiniteLoop(): never {
    while (true) {
        console.log("Running forever...");
    }
}
```

---

## Type Inference

TypeScript can automatically infer types based on the assigned values:

```typescript
// Type inference in action
let count = 10; // inferred as number
let message = "Hello"; // inferred as string
let items = [1, 2, 3]; // inferred as number[]

// Function return type inference
function multiply(a: number, b: number) {
    return a * b; // return type inferred as number
}

// Best practices
let explicitNumber: number = 42; // explicit when needed
let inferredNumber = 42; // let TypeScript infer when obvious
```

---

## Arrays and Tuples

### Arrays
```typescript
// Array syntax variations
let numbers: number[] = [1, 2, 3, 4, 5];
let strings: Array<string> = ["a", "b", "c"];

// Readonly arrays
const readonlyNumbers: readonly number[] = [1, 2, 3];
// readonlyNumbers.push(4); // Error: Property 'push' does not exist

// Mixed type arrays
let mixed: (string | number)[] = [1, "hello", 2, "world"];
```

### Tuples
```typescript
// Fixed-length arrays with specific types
let person: [string, number, boolean] = ["John", 30, true];

// Destructuring tuples
let [name, age, isEmployed] = person;

// Optional tuple elements
let optionalTuple: [string, number?] = ["John"];

// Rest elements in tuples
let variableTuple: [string, ...number[]] = ["grades", 85, 90, 92];

// Readonly tuples
const readonlyTuple: readonly [number, string] = [1, "hello"];

// React useState example
function useState<T>(initial: T): [T, (value: T) => void] {
    let state = initial;
    const setState = (value: T) => { state = value; };
    return [state, setState];
}

const [count, setCount] = useState(0);
```

---

## Objects

### Object Types
```typescript
// Inline object type
const user: { name: string; age: number; email?: string } = {
    name: "Alice",
    age: 25
};

// Optional properties
user.email = "alice@example.com";

// Readonly properties
const config: { readonly apiUrl: string; timeout: number } = {
    apiUrl: "https://api.example.com",
    timeout: 5000
};
// config.apiUrl = "new-url"; // Error: Cannot assign to readonly property
```

### Index Signatures
```typescript
// Dynamic object properties
interface StringDictionary {
    [key: string]: string;
}

const translations: StringDictionary = {
    hello: "hola",
    goodbye: "adiós",
    thanks: "gracias"
};

// Number index signatures
interface NumberArray {
    [index: number]: string;
}

const colors: NumberArray = ["red", "green", "blue"];
```

### Nested Objects
```typescript
interface Address {
    street: string;
    city: string;
    zipCode: string;
}

interface User {
    id: number;
    name: string;
    address: Address;
    preferences: {
        theme: "light" | "dark";
        notifications: boolean;
    };
}

const user: User = {
    id: 1,
    name: "John Doe",
    address: {
        street: "123 Main St",
        city: "Anytown",
        zipCode: "12345"
    },
    preferences: {
        theme: "dark",
        notifications: true
    }
};
```

---

## Enums

### Numeric Enums
```typescript
enum Direction {
    Up,    // 0
    Down,  // 1
    Left,  // 2
    Right  // 3
}

// Custom numeric values
enum StatusCode {
    OK = 200,
    NotFound = 404,
    InternalServerError = 500
}

console.log(Direction.Up); // 0
console.log(StatusCode.OK); // 200
```

### String Enums
```typescript
enum Theme {
    Light = "light",
    Dark = "dark",
    Auto = "auto"
}

enum LogLevel {
    ERROR = "error",
    WARN = "warn",
    INFO = "info",
    DEBUG = "debug"
}

// Usage in functions
function setTheme(theme: Theme): void {
    document.body.className = theme;
}

setTheme(Theme.Dark);
```

### Const Enums
```typescript
const enum Color {
    Red = "red",
    Green = "green",
    Blue = "blue"
}

// More efficient - inlined at compile time
let favoriteColor = Color.Blue; // becomes let favoriteColor = "blue";
```

### Enum vs Object
```typescript
// Regular object (runtime overhead)
const Colors = {
    RED: "red",
    GREEN: "green",
    BLUE: "blue"
} as const;

// Enum (can be optimized away)
enum ColorEnum {
    RED = "red",
    GREEN = "green",
    BLUE = "blue"
}

// When to use each:
// - Use objects for simple constant collections
// - Use enums when you need reverse mapping or strict typing
```

---

## Type Aliases and Interfaces

### Type Aliases
```typescript
// Basic type aliases
type ID = string | number;
type UserRole = "admin" | "user" | "guest";

// Object type aliases
type Point = {
    x: number;
    y: number;
};

type User = {
    id: ID;
    name: string;
    role: UserRole;
    location: Point;
};

// Function type aliases
type EventHandler = (event: Event) => void;
type Calculator = (a: number, b: number) => number;

const add: Calculator = (a, b) => a + b;
const multiply: Calculator = (a, b) => a * b;
```

### Interfaces
```typescript
// Basic interface
interface Vehicle {
    brand: string;
    model: string;
    year: number;
    start(): void;
    stop(): void;
}

// Interface implementation
class Car implements Vehicle {
    constructor(
        public brand: string,
        public model: string,
        public year: number
    ) {}

    start(): void {
        console.log(`${this.brand} ${this.model} started`);
    }

    stop(): void {
        console.log(`${this.brand} ${this.model} stopped`);
    }
}

// Interface extension
interface ElectricVehicle extends Vehicle {
    batteryCapacity: number;
    charge(): void;
}

// Multiple interface inheritance
interface Flyable {
    fly(): void;
}

interface FlyingCar extends Vehicle, Flyable {
    altitude: number;
}
```

### Interface vs Type Alias
```typescript
// Interfaces can be merged (declaration merging)
interface User {
    name: string;
}

interface User {
    age: number;
}

// Now User has both name and age properties

// Type aliases cannot be merged
type Product = {
    name: string;
};

// This would cause an error:
// type Product = {
//     price: number;
// };

// Use interfaces for object shapes that might be extended
// Use type aliases for unions, primitives, and computed types
```

---

## Union Types

### Basic Unions
```typescript
// Simple union types
type StringOrNumber = string | number;
type Theme = "light" | "dark" | "auto";

function formatId(id: string | number): string {
    if (typeof id === "string") {
        return id.toUpperCase();
    }
    return id.toString();
}

// Union with arrays
type MixedArray = (string | number)[];
const values: MixedArray = [1, "hello", 2, "world"];
```

### Discriminated Unions
```typescript
interface Square {
    kind: "square";
    size: number;
}

interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}

interface Circle {
    kind: "circle";
    radius: number;
}

type Shape = Square | Rectangle | Circle;

function getArea(shape: Shape): number {
    switch (shape.kind) {
        case "square":
            return shape.size * shape.size;
        case "rectangle":
            return shape.width * shape.height;
        case "circle":
            return Math.PI * shape.radius ** 2;
        default:
            // Exhaustiveness check
            const _exhaustiveCheck: never = shape;
            throw new Error(`Unhandled shape: ${_exhaustiveCheck}`);
    }
}
```

### Intersection Types
```typescript
interface Colorful {
    color: string;
}

interface Circle {
    radius: number;
}

// Intersection combines types
type ColorfulCircle = Colorful & Circle;

const redCircle: ColorfulCircle = {
    color: "red",
    radius: 10
};

// Complex intersections
type APIResponse<T> = {
    data: T;
    status: number;
    message: string;
};

type UserResponse = APIResponse<User> & {
    permissions: string[];
};
```

---

## Functions

### Function Declarations and Expressions
```typescript
// Function declaration with types
function greet(name: string, age?: number): string {
    if (age) {
        return `Hello, ${name}! You are ${age} years old.`;
    }
    return `Hello, ${name}!`;
}

// Function expression
const multiply = (a: number, b: number): number => {
    return a * b;
};

// Arrow function with inferred return type
const divide = (a: number, b: number) => a / b;
```

### Function Overloads
```typescript
// Function overloads
function combine(a: string, b: string): string;
function combine(a: number, b: number): number;
function combine(a: any, b: any): any {
    return a + b;
}

const result1 = combine("Hello", " World"); // string
const result2 = combine(1, 2); // number
```

### Generic Functions
```typescript
// Generic function
function identity<T>(arg: T): T {
    return arg;
}

const numberIdentity = identity<number>(42);
const stringIdentity = identity("hello");

// Generic with constraints
interface Lengthwise {
    length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

logLength("hello"); // works, string has length
logLength([1, 2, 3]); // works, array has length
// logLength(123); // error, number doesn't have length
```

### Rest Parameters and Default Values
```typescript
// Default parameters
function createUser(name: string, age: number = 18, isActive: boolean = true) {
    return { name, age, isActive };
}

// Rest parameters
function sum(first: number, ...rest: number[]): number {
    return first + rest.reduce((a, b) => a + b, 0);
}

// Destructuring parameters
function updateUser({ name, age }: { name: string; age: number }): void {
    console.log(`Updating user: ${name}, age: ${age}`);
}

// Named parameters with optional properties
function createConfig({
    host = "localhost",
    port = 3000,
    secure = false
}: {
    host?: string;
    port?: number;
    secure?: boolean;
} = {}): void {
    console.log(`Server: ${secure ? "https" : "http"}://${host}:${port}`);
}
```

### Function Types
```typescript
// Function type aliases
type MathOperation = (a: number, b: number) => number;
type EventListener = (event: MouseEvent) => void;

// Higher-order functions
function createMultiplier(factor: number): (x: number) => number {
    return (x: number) => x * factor;
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

// Async functions
async function fetchUser(id: number): Promise<User> {
    const response = await fetch(`/api/users/${id}`);
    return response.json();
}
```

---

## Classes

### Basic Class Syntax
```typescript
class Animal {
    // Property declarations
    private name: string;
    protected species: string;
    public age: number;

    // Constructor with parameter properties
    constructor(
        name: string,
        species: string,
        public readonly id: number
    ) {
        this.name = name;
        this.species = species;
        this.age = 0;
    }

    // Methods
    public speak(): void {
        console.log(`${this.name} makes a sound`);
    }

    protected getInfo(): string {
        return `${this.name} is a ${this.species}`;
    }

    // Getter and setter
    get getName(): string {
        return this.name;
    }

    set setAge(age: number) {
        if (age >= 0) {
            this.age = age;
        }
    }
}

// Inheritance
class Dog extends Animal {
    private breed: string;

    constructor(name: string, breed: string, id: number) {
        super(name, "Canine", id);
        this.breed = breed;
    }

    public speak(): void {
        console.log(`${this.getName()} barks!`);
    }

    public wagTail(): void {
        console.log(`${this.getName()} wags tail happily!`);
    }
}
```

### Abstract Classes
```typescript
abstract class Shape {
    abstract getArea(): number;
    abstract getPerimeter(): number;

    // Concrete method
    describe(): string {
        return `This shape has an area of ${this.getArea()}`;
    }
}

class Rectangle extends Shape {
    constructor(
        private width: number,
        private height: number
    ) {
        super();
    }

    getArea(): number {
        return this.width * this.height;
    }

    getPerimeter(): number {
        return 2 * (this.width + this.height);
    }
}
```

### Static Members and Methods
```typescript
class MathUtils {
    static readonly PI = 3.14159;
    private static instance: MathUtils;

    private constructor() {}

    static getInstance(): MathUtils {
        if (!MathUtils.instance) {
            MathUtils.instance = new MathUtils();
        }
        return MathUtils.instance;
    }

    static calculateCircleArea(radius: number): number {
        return MathUtils.PI * radius * radius;
    }
}

const area = MathUtils.calculateCircleArea(5);
const mathInstance = MathUtils.getInstance();
```

---

## Type Casting

### Type Assertions
```typescript
// Angle bracket syntax (not recommended in JSX)
let someValue: unknown = "this is a string";
let strLength: number = (<string>someValue).length;

// As syntax (preferred)
let strLength2: number = (someValue as string).length;

// Type assertion with interfaces
interface Cat {
    name: string;
    meow(): void;
}

interface Dog {
    name: string;
    bark(): void;
}

function petAnimal(animal: Cat | Dog): void {
    if ("meow" in animal) {
        (animal as Cat).meow();
    } else {
        (animal as Dog).bark();
    }
}
```

### Type Guards
```typescript
// typeof type guards
function processValue(value: string | number): string {
    if (typeof value === "string") {
        return value.toUpperCase(); // TypeScript knows it's string
    }
    return value.toString(); // TypeScript knows it's number
}

// instanceof type guards
class Bird {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    fly(): void {
        console.log(`${this.name} is flying`);
    }
}

class Fish {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    swim(): void {
        console.log(`${this.name} is swimming`);
    }
}

function moveAnimal(animal: Bird | Fish): void {
    if (animal instanceof Bird) {
        animal.fly(); // TypeScript knows it's Bird
    } else {
        animal.swim(); // TypeScript knows it's Fish
    }
}

// Custom type guards
function isString(value: any): value is string {
    return typeof value === "string";
}

function processInput(input: unknown): void {
    if (isString(input)) {
        console.log(input.toUpperCase()); // TypeScript knows it's string
    }
}
```

### Non-null Assertion
```typescript
// Non-null assertion operator (!)
function processElement(element: HTMLElement | null): void {
    // Use only when you're certain the value is not null
    element!.style.color = "red";
}

// Better approach with type guard
function processElementSafe(element: HTMLElement | null): void {
    if (element) {
        element.style.color = "red";
    }
}
```

---

## Homework Questions

### Beginner Level

1. **Basic Types Practice**
   ```typescript
   // Create variables with appropriate types for:
   // - A person's name
   // - Their age
   // - Whether they are a student
   // - A list of their favorite colors
   // - Their grade (can be a number or letter)
   ```

   **Answer:**
   ```typescript
   let personName: string = "Alice";
   let age: number = 22;
   let isStudent: boolean = true;
   let favoriteColors: string[] = ["blue", "green", "red"];
   let grade: number | string = "A"; // or 95
   ```

2. **Function with Optional Parameters**
   ```typescript
   // Write a function that calculates the area of a rectangle
   // Width is required, height is optional (default to width for square)
   ```

   **Answer:**
   ```typescript
   function calculateArea(width: number, height?: number): number {
       return width * (height ?? width);
   }
   
   console.log(calculateArea(5)); // 25 (square)
   console.log(calculateArea(5, 10)); // 50 (rectangle)
   ```

3. **Interface Creation**
   ```typescript
   // Create an interface for a Book with:
   // - title (required)
   // - author (required)  
   // - pages (required)
   // - isbn (optional)
   // - isAvailable (optional, default true)
   ```

   **Answer:**
   ```typescript
   interface Book {
       title: string;
       author: string;
       pages: number;
       isbn?: string;
       isAvailable?: boolean;
   }
   
   const book: Book = {
       title: "TypeScript Handbook",
       author: "Microsoft",
       pages: 300,
       isAvailable: true
   };
   ```

### Intermediate Level

4. **Enum and Union Types**
   ```typescript
   // Create an enum for OrderStatus and a function that processes orders
   // Status can be: pending, processing, shipped, delivered, cancelled
   ```

   **Answer:**
   ```typescript
   enum OrderStatus {
       Pending = "pending",
       Processing = "processing", 
       Shipped = "shipped",
       Delivered = "delivered",
       Cancelled = "cancelled"
   }
   
   interface Order {
       id: number;
       status: OrderStatus;
       items: string[];
   }
   
   function updateOrderStatus(order: Order, newStatus: OrderStatus): Order {
       return { ...order, status: newStatus };
   }
   
   function canCancelOrder(order: Order): boolean {
       return order.status === OrderStatus.Pending || 
              order.status === OrderStatus.Processing;
   }
   ```

5. **Generic Function**
   ```typescript
   // Create a generic function that returns the last element of an array
   // Should work with any type of array
   ```

   **Answer:**
   ```typescript
   function getLastElement<T>(array: T[]): T | undefined {
       return array.length > 0 ? array[array.length - 1] : undefined;
   }
   
   // Usage examples
   const lastNumber = getLastElement([1, 2, 3, 4]); // number | undefined
   const lastString = getLastElement(["a", "b", "c"]); // string | undefined
   const lastBoolean = getLastElement([true, false]); // boolean | undefined
   ```

6. **Class with Inheritance**
   ```typescript
   // Create a base class Vehicle and derived classes Car and Motorcycle
   // Vehicle should have: brand, model, year, start(), stop()
   // Car should add: numberOfDoors, openTrunk()
   // Motorcycle should add: hasWindshield, popWheelie()
   ```

   **Answer:**
   ```typescript
   abstract class Vehicle {
       constructor(
           public brand: string,
           public model: string,
           public year: number
       ) {}
   
       start(): void {
           console.log(`${this.brand} ${this.model} started`);
       }
   
       stop(): void {
           console.log(`${this.brand} ${this.model} stopped`);
       }
   
       abstract getVehicleType(): string;
   }
   
   class Car extends Vehicle {
       constructor(
           brand: string,
           model: string,
           year: number,
           public numberOfDoors: number
       ) {
           super(brand, model, year);
       }
   
       openTrunk(): void {
           console.log("Trunk opened");
       }
   
       getVehicleType(): string {
           return "Car";
       }
   }
   
   class Motorcycle extends Vehicle {
       constructor(
           brand: string,
           model: string,
           year: number,
           public hasWindshield: boolean
       ) {
           super(brand, model, year);
       }
   
       popWheelie(): void {
           console.log("Wheelie time! 🏍️");
       }
   
       getVehicleType(): string {
           return "Motorcycle";
       }
   }
   ```

### Advanced Level

7. **Utility Types Practice**
   ```typescript
   // Given the User interface, create:
   // - A type for creating a user (all fields optional except name)
   // - A type for updating a user (all fields optional)
   // - A type with only name and email
   
   interface User {
       id: number;
       name: string;
       email: string;
       age: number;
       isActive: boolean;
   }
   ```

   **Answer:**
   ```typescript
   interface User {
       id: number;
       name: string;
       email: string;
       age: number;
       isActive: boolean;
   }
   
   // For creating a user (name required, others optional)
   type CreateUser = {
       name: string;
   } & Partial<Omit<User, 'name'>>;
   
   // For updating a user (all fields optional)
   type UpdateUser = Partial<User>;
   
   // Type with only name and email
   type UserContact = Pick<User, 'name' | 'email'>;
   
   // Alternative approach
   type CreateUserAlt = Omit<User, 'id'> & { id?: number };
   type UserSummary = { name: string; email: string };
   ```

8. **Complex Type Guards**
   ```typescript
   // Create type guards and processing function for different API responses
   ```

   **Answer:**
   ```typescript
   interface SuccessResponse {
       success: true;
       data: any;
       message: string;
   }
   
   interface ErrorResponse {
       success: false;
       error: string;
       code: number;
   }
   
   type APIResponse = SuccessResponse | ErrorResponse;
   
   // Type guard functions
   function isSuccessResponse(response: APIResponse): response is SuccessResponse {
       return response.success === true;
   }
   
   function isErrorResponse(response: APIResponse): response is ErrorResponse {
       return response.success === false;
   }
   
   // Processing function
   function handleResponse(response: APIResponse): void {
       if (isSuccessResponse(response)) {
           console.log("Success:", response.message);
           console.log("Data:", response.data);
       } else {
           console.error(`Error ${response.code}: ${response.error}`);
       }
   }
   ```

---

## Interview Questions and Answers

### Basic Level Questions

**Q1: What is TypeScript and why would you use it over JavaScript?**

**Answer:** TypeScript is a superset of JavaScript that adds static type checking. Key benefits include:
- **Early Error Detection**: Catches type-related errors at compile time
- **Better IDE Support**: Enhanced autocomplete, refactoring, and navigation
- **Code Documentation**: Types serve as inline documentation
- **Improved Maintainability**: Easier to refactor and maintain large codebases
- **Team Collaboration**: Clear contracts between different parts of the application

**Q2: What's the difference between `any` and `unknown` types?**

**Answer:**
```typescript
// any - disables type checking entirely
let value1: any = 10;
value1.foo.bar; // No error, but runtime error likely

// unknown - type-safe any
let value2: unknown = 10;
// value2.foo.bar; // Error: Object is of type 'unknown'

// Must check type before use
if (typeof value2 === 'string') {
    console.log(value2.toUpperCase()); // Safe
}
```

`unknown` is safer because it requires type checking before use, while `any` completely disables TypeScript's type system.

**Q3: Explain the difference between `interface` and `type` aliases.**

**Answer:**

| Feature | Interface | Type Alias |
|---------|-----------|------------|
| Declaration Merging | ✅ Yes | ❌ No |
| Extends/Implements | ✅ Yes | ✅ Yes (with &) |
| Union/Intersection | ❌ No | ✅ Yes |
| Computed Properties | ❌ No | ✅ Yes |
| Primitives | ❌ No | ✅ Yes |

```typescript
// Interface - can be merged
interface User {
    name: string;
}
interface User {
    age: number;
}
// Result: User has both name and age

// Type - cannot be merged
type Product = { name: string };
// type Product = { price: number }; // Error!

// Type aliases are better for unions
type Status = 'loading' | 'success' | 'error';

// Interfaces are better for object shapes
interface APIResponse {
    data: any;
    status: number;
}
```

### Intermediate Level Questions

**Q4: What are generics and how do you use them?**

**Answer:** Generics allow you to create reusable components that work with multiple types while maintaining type safety.

```typescript
// Generic function
function identity<T>(arg: T): T {
    return arg;
}

// Generic interface
interface Repository<T> {
    create(item: T): T;
    findById(id: string): T | null;
    update(id: string, item: Partial<T>): T;
    delete(id: string): boolean;
}

// Generic class
class DataStore<T> {
    private items: T[] = [];
    
    add(item: T): void {
        this.items.push(item);
    }
    
    find(predicate: (item: T) => boolean): T | undefined {
        return this.items.find(predicate);
    }
}

// Usage
const userStore = new DataStore<User>();
const productStore = new DataStore<Product>();
```

**Q5: Explain union types and type guards.**

**Answer:**

```typescript
// Union types
type Theme = 'light' | 'dark' | 'auto';
type ID = string | number;

// Type guards help narrow union types
function processId(id: string | number): string {
    // typeof type guard
    if (typeof id === 'string') {
        return id.toUpperCase(); // TypeScript knows it's string
    }
    return id.toString(); // TypeScript knows it's number
}

// Custom type guard
function isString(value: any): value is string {
    return typeof value === 'string';
}

// in operator type guard
interface Bird {
    fly(): void;
}

interface Fish {
    swim(): void;
}

function move(animal: Bird | Fish): void {
    if ('fly' in animal) {
        animal.fly(); // TypeScript knows it's Bird
    } else {
        animal.swim(); // TypeScript knows it's Fish
    }
}

// Discriminated union with type guards
interface Square {
    kind: 'square';
    size: number;
}

interface Circle {
    kind: 'circle';
    radius: number;
}

type Shape = Square | Circle;

function getArea(shape: Shape): number {
    switch (shape.kind) {
        case 'square':
            return shape.size * shape.size; // TypeScript knows it's Square
        case 'circle':
            return Math.PI * shape.radius * shape.radius; // TypeScript knows it's Circle
    }
}
```

**Q6: What are utility types? Give examples.**

**Answer:** Utility types are built-in TypeScript types that help transform existing types.

```typescript
interface User {
    id: number;
    name: string;
    email: string;
    age: number;
}

// Partial<T> - makes all properties optional
type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; age?: number; }

// Required<T> - makes all properties required
type RequiredUser = Required<Partial<User>>;

// Pick<T, K> - selects specific properties
type UserContact = Pick<User, 'name' | 'email'>;
// { name: string; email: string; }

// Omit<T, K> - excludes specific properties
type CreateUser = Omit<User, 'id'>;
// { name: string; email: string; age: number; }

// Record<K, T> - creates object type with specific keys and values
type UserRoles = Record<'admin' | 'user' | 'guest', boolean>;
// { admin: boolean; user: boolean; guest: boolean; }

// Exclude<T, U> - excludes types from union
type PrimaryColors = 'red' | 'green' | 'blue' | 'yellow';
type RGB = Exclude<PrimaryColors, 'yellow'>; // 'red' | 'green' | 'blue'

// Extract<T, U> - extracts types from union
type WarmColors = Extract<PrimaryColors, 'red' | 'yellow'>; // 'red' | 'yellow'

// ReturnType<T> - gets return type of function
function getUser(): User { return {} as User; }
type GetUserReturn = ReturnType<typeof getUser>; // User

// Parameters<T> - gets parameter types of function
function createUser(name: string, age: number): User { return {} as User; }
type CreateUserParams = Parameters<typeof createUser>; // [string, number]
```

### Advanced Level Questions

**Q7: Explain conditional types and how they work.**

**Answer:** Conditional types allow you to create types that depend on a condition, similar to ternary operators for types.

```typescript
// Basic conditional type syntax: T extends U ? X : Y
type IsArray<T> = T extends any[] ? true : false;

type Test1 = IsArray<string[]>; // true
type Test2 = IsArray<number>; // false

// Practical example: extracting array element type
type ElementType<T> = T extends (infer U)[] ? U : never;

type StringElement = ElementType<string[]>; // string
type NumberElement = ElementType<number[]>; // number
type NotArray = ElementType<string>; // never

// Advanced example: function return type extractor
type ReturnTypeCustom<T> = T extends (...args: any[]) => infer R ? R : never;

function getString(): string { return ""; }
function getNumber(): number { return 0; }

type StringReturn = ReturnTypeCustom<typeof getString>; // string
type NumberReturn = ReturnTypeCustom<typeof getNumber>; // number

// Distributive conditional types
type ToArray<T> = T extends any ? T[] : never;
type StringOrNumberArray = ToArray<string | number>; // string[] | number[]

// Non-distributive (using tuple)
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;
type UnionArray = ToArrayNonDist<string | number>; // (string | number)[]
```

**Q8: What are mapped types and how do you use them?**

**Answer:** Mapped types allow you to create new types by transforming properties of existing types.

```typescript
// Basic mapped type syntax
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

type Optional<T> = {
    [P in keyof T]?: T[P];
};

// Custom mapped types
type Getters<T> = {
    [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P];
};

type Setters<T> = {
    [P in keyof T as `set${Capitalize<string & P>}`]: (value: T[P]) => void;
};

interface Person {
    name: string;
    age: number;
}

type PersonGetters = Getters<Person>;
// {
//     getName: () => string;
//     getAge: () => number;
// }

type PersonSetters = Setters<Person>;
// {
//     setName: (value: string) => void;
//     setAge: (value: number) => void;
// }

// Filtering properties
type StringProperties<T> = {
    [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

type NumberProperties<T> = {
    [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

interface Mixed {
    id: number;
    name: string;
    count: number;
    description: string;
}

type StringKeys = StringProperties<Mixed>; // "name" | "description"
type NumberKeys = NumberProperties<Mixed>; // "id" | "count"

// Template literal types with mapped types
type EventMap = {
    click: MouseEvent;
    focus: FocusEvent;
    change: Event;
};

type EventListeners = {
    [K in keyof EventMap as `on${Capitalize<K>}`]: (event: EventMap[K]) => void;
};
// {
//     onClick: (event: MouseEvent) => void;
//     onFocus: (event: FocusEvent) => void;
//     onChange: (event: Event) => void;
// }
```

**Q9: How do you handle asynchronous operations with TypeScript?**

**Answer:**

```typescript
// Basic Promise typing
function fetchUser(id: number): Promise<User> {
    return fetch(`/api/users/${id}`)
        .then(response => response.json());
}

// Async/await with proper error handling
async function getUserSafely(id: number): Promise<User | null> {
    try {
        const user = await fetchUser(id);
        return user;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        return null;
    }
}

// Generic async functions
async function fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json() as T;
}

// Usage
const user = await fetchData<User>('/api/user/1');
const products = await fetchData<Product[]>('/api/products');

// Promise.all with different types
async function loadUserData(userId: number): Promise<{
    user: User;
    posts: Post[];
    preferences: UserPreferences;
}> {
    const [user, posts, preferences] = await Promise.all([
        fetchData<User>(`/api/users/${userId}`),
        fetchData<Post[]>(`/api/users/${userId}/posts`),
        fetchData<UserPreferences>(`/api/users/${userId}/preferences`)
    ]);

    return { user, posts, preferences };
}

// Custom Promise wrapper for better error handling
type Result<T, E = Error> = {
    success: true;
    data: T;
} | {
    success: false;
    error: E;
};

async function safeAsync<T>(promise: Promise<T>): Promise<Result<T>> {
    try {
        const data = await promise;
        return { success: true, data };
    } catch (error) {
        return { success: false, error: error as Error };
    }
}

// Usage
const result = await safeAsync(fetchUser(1));
if (result.success) {
    console.log(result.data.name); // TypeScript knows data is User
} else {
    console.error(result.error.message); // TypeScript knows error is Error
}
```

**Q10: What are decorators and how are they used in TypeScript?**

**Answer:** Decorators are a way to add metadata and modify classes, methods, properties, and parameters. They're commonly used in frameworks like Angular and NestJS.

```typescript
// Enable decorators in tsconfig.json:
// "experimentalDecorators": true,
// "emitDecoratorMetadata": true

// Class decorator
function Entity(tableName: string) {
    return function <T extends { new (...args: any[]): {} }>(constructor: T) {
        return class extends constructor {
            tableName = tableName;
        };
    };
}

// Property decorator
function Column(options?: { nullable?: boolean; unique?: boolean }) {
    return function (target: any, propertyKey: string) {
        // Store metadata about the column
        Reflect.defineMetadata('column', options || {}, target, propertyKey);
    };
}

// Method decorator
function LogExecutionTime(target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    
    descriptor.value = function (...args: any[]) {
        const start = performance.now();
        const result = method.apply(this, args);
        const end = performance.now();
        console.log(`${propertyName} executed in ${end - start} milliseconds`);
        return result;
    };
}

// Parameter decorator
function Validate(target: any, propertyKey: string, parameterIndex: number) {
    console.log(`Validation decorator applied to parameter ${parameterIndex} of ${propertyKey}`);
}

// Usage example
@Entity('users')
class User {
    @Column({ unique: true })
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column()
    email: string;

    @LogExecutionTime
    calculateAge(@Validate birthDate: Date): number {
        const today = new Date();
        const birth = new Date(birthDate);
        return today.getFullYear() - birth.getFullYear();
    }
}

// Factory decorator example
function Throttle(ms: number) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        let lastCall = 0;

        descriptor.value = function (...args: any[]) {
            const now = Date.now();
            if (now - lastCall >= ms) {
                lastCall = now;
                return originalMethod.apply(this, args);
            }
        };
    };
}

class APIService {
    @Throttle(1000) // Only allow calls every 1 second
    fetchData(): Promise<any> {
        return fetch('/api/data').then(r => r.json());
    }
}
```

### Expert Level Questions

**Q11: How would you implement a type-safe event emitter in TypeScript?**

**Answer:**

```typescript
type EventMap = Record<string, any>;

class TypedEventEmitter<TEventMap extends EventMap> {
    private listeners: {
        [K in keyof TEventMap]?: Array<(data: TEventMap[K]) => void>;
    } = {};

    on<K extends keyof TEventMap>(
        event: K,
        listener: (data: TEventMap[K]) => void
    ): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event]!.push(listener);
    }

    emit<K extends keyof TEventMap>(
        event: K,
        data: TEventMap[K]
    ): void {
        const eventListeners = this.listeners[event];
        if (eventListeners) {
            eventListeners.forEach(listener => listener(data));
        }
    }

    off<K extends keyof TEventMap>(
        event: K,
        listener: (data: TEventMap[K]) => void
    ): void {
        const eventListeners = this.listeners[event];
        if (eventListeners) {
            const index = eventListeners.indexOf(listener);
            if (index > -1) {
                eventListeners.splice(index, 1);
            }
        }
    }

    once<K extends keyof TEventMap>(
        event: K,
        listener: (data: TEventMap[K]) => void
    ): void {
        const onceListener = (data: TEventMap[K]) => {
            listener(data);
            this.off(event, onceListener);
        };
        this.on(event, onceListener);
    }
}

// Usage
interface AppEvents {
    userLogin: { userId: string; timestamp: Date };
    userLogout: { userId: string };
    dataUpdated: { entityType: string; entityId: string };
    error: { message: string; code: number };
}

const eventEmitter = new TypedEventEmitter<AppEvents>();

// Type-safe event handling
eventEmitter.on('userLogin', (data) => {
    // data is properly typed as { userId: string; timestamp: Date }
    console.log(`User ${data.userId} logged in at ${data.timestamp}`);
});

eventEmitter.emit('userLogin', {
    userId: '123',
    timestamp: new Date()
});

// This would cause a TypeScript error:
// eventEmitter.emit('userLogin', { invalidProperty: 'test' });
```

**Q12: How would you implement a builder pattern with TypeScript that ensures all required properties are set?**

**Answer:**

```typescript
// Using mapped types and conditional types for compile-time validation
type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

type OptionalKeys<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

type IsComplete<T, TRequired extends keyof T> = 
    RequiredKeys<Pick<T, TRequired>> extends never ? true : false;

interface UserConfig {
    name: string;
    email: string;
    age?: number;
    isActive?: boolean;
    preferences?: {
        theme: 'light' | 'dark';
        notifications: boolean;
    };
}

class UserBuilder<TSet extends Partial<UserConfig> = {}> {
    private config: TSet;

    constructor(config: TSet = {} as TSet) {
        this.config = config;
    }

    name<T extends string>(name: T): UserBuilder<TSet & { name: T }> {
        return new UserBuilder({ ...this.config, name });
    }

    email<T extends string>(email: T): UserBuilder<TSet & { email: T }> {
        return new UserBuilder({ ...this.config, email });
    }

    age(age: number): UserBuilder<TSet & { age: number }> {
        return new UserBuilder({ ...this.config, age });
    }

    isActive(isActive: boolean): UserBuilder<TSet & { isActive: boolean }> {
        return new UserBuilder({ ...this.config, isActive });
    }

    preferences(preferences: UserConfig['preferences']): UserBuilder<TSet & { preferences: typeof preferences }> {
        return new UserBuilder({ ...this.config, preferences });
    }

    build<T extends TSet>(
        this: UserBuilder<T>
    ): T extends { name: string; email: string } 
        ? UserConfig & T 
        : 'Error: name and email are required' {
        if (!('name' in this.config) || !('email' in this.config)) {
            throw new Error('Name and email are required');
        }
        return this.config as any;
    }
}

// Usage - compile-time safety
const user = new UserBuilder()
    .name('John Doe')
    .email('john@example.com')
    .age(30)
    .build(); // ✅ Works - all required fields set

// This won't compile:
// const incompleteUser = new UserBuilder()
//     .name('John')
//     .build(); // ❌ Error: email is required

// Fluent API with different approach using phantom types
type Brand<T, TBrand> = T & { __brand: TBrand };

type HasName = Brand<unknown, 'HasName'>;
type HasEmail = Brand<unknown, 'HasEmail'>;

class FluentUserBuilder<TFlags = never> {
    private config: Partial<UserConfig> = {};

    name(name: string): FluentUserBuilder<TFlags | HasName> {
        this.config.name = name;
        return this as any;
    }

    email(email: string): FluentUserBuilder<TFlags | HasEmail> {
        this.config.email = email;
        return this as any;
    }

    age(age: number): FluentUserBuilder<TFlags> {
        this.config.age = age;
        return this;
    }

    build(this: FluentUserBuilder<HasName | HasEmail>): UserConfig {
        return this.config as UserConfig;
    }
}

// Usage
const fluentUser = new FluentUserBuilder()
    .name('Jane Doe')
    .email('jane@example.com')
    .build(); // ✅ Works

// Won't compile without required fields:
// const incomplete = new FluentUserBuilder()
//     .name('Jane')
//     .build(); // ❌ Error
```

## Best Practices and Tips

### 1. Type Narrowing Strategies
```typescript
// Use type predicates for complex checks
function isValidUser(user: any): user is User {
    return user && 
           typeof user.name === 'string' && 
           typeof user.email === 'string' &&
           user.email.includes('@');
}

// Assertion functions
function assertIsNumber(value: any): asserts value is number {
    if (typeof value !== 'number') {
        throw new Error('Expected number');
    }
}

function processValue(input: unknown): number {
    assertIsNumber(input);
    return input * 2; // TypeScript knows input is number
}
```

### 2. Working with External Libraries
```typescript
// Ambient declarations for untyped libraries
declare module 'some-untyped-library' {
    export function doSomething(param: string): number;
    export interface LibraryConfig {
        apiKey: string;
        timeout?: number;
    }
}

// Extending existing types
declare global {
    interface Window {
        myCustomProperty: string;
    }
}

// Module augmentation
declare module 'express-serve-static-core' {
    interface Request {
        user?: User;
    }
}
```

### 3. Performance Considerations
```typescript
// Use const assertions for literal types
const themes = ['light', 'dark', 'auto'] as const;
type Theme = typeof themes[number]; // 'light' | 'dark' | 'auto'

// Prefer interfaces over type aliases for object shapes (better performance)
interface User {
    name: string;
    email: string;
}

// Use readonly for immutable data
interface ReadonlyConfig {
    readonly apiUrl: string;
    readonly features: readonly string[];
}

// Avoid deep nesting in types (can cause performance issues)
// Instead of deep Pick/Omit chains, create intermediate types
```

### 4. Error Handling Patterns
```typescript
// Result pattern for better error handling
type Result<T, E = Error> = 
    | { success: true; data: T }
    | { success: false; error: E };

async function safeParseJSON<T>(json: string): Promise<Result<T, SyntaxError>> {
    try {
        const data = JSON.parse(json) as T;
        return { success: true, data };
    } catch (error) {
        return { success: false, error: error as SyntaxError };
    }
}

// Option pattern for nullable values
type Option<T> = T | null | undefined;

function findUser(id: string): Option<User> {
    // Implementation
    return null; // or user
}

// Chain operations safely
const userName = findUser('123')?.name?.toUpperCase() ?? 'Unknown';
```

## Conclusion

TypeScript provides powerful type safety and developer experience improvements over JavaScript. The key to mastering TypeScript is understanding its type system deeply and knowing when to use different features appropriately.

### Key Takeaways:
- Start with basic types and gradually learn advanced features
- Use strict mode for better type safety
- Prefer type inference when obvious, explicit types when needed
- Leverage utility types for common transformations
- Use generics for reusable, type-safe code
- Apply proper error handling patterns
- Follow naming conventions and best practices

### Recommended Learning Path:
1. Master basic types and type inference
2. Learn interfaces and type aliases
3. Understand union and intersection types
4. Practice with generics and constraints
5. Explore utility types and mapped types
6. Study conditional types and template literals
7. Advanced patterns like decorators and module augmentation

Remember: TypeScript is about enabling confident refactoring and catching errors early. Focus on writing code that's both type-safe and maintainable!