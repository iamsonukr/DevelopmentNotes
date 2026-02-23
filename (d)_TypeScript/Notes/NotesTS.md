# TypeScript Complete Guide

## Table of Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Basic Types](#basic-types)
4. [Arrays and Tuples](#arrays-and-tuples)
5. [Objects](#objects)
6. [Enums](#enums)
7. [Type Aliases and Interfaces](#type-aliases-and-interfaces)
8. [Union Types](#union-types)
9. [Functions](#functions)
10. [Type Casting](#type-casting)
11. [Classes](#classes)

## Introduction

TypeScript is a superset of JavaScript that adds static type definitions. It provides:
- **Type Safety**: Catches errors at compile time rather than runtime
- **Better IDE Support**: Enhanced autocomplete, refactoring, and navigation
- **Code Documentation**: Types serve as inline documentation
- **Scalability**: Makes large codebases more maintainable

TypeScript uses **compile-time type checking**, meaning it validates types before the code runs, not during execution.

## Installation

```bash
# Install TypeScript globally
npm install -g typescript

# Install for a specific project
npm install typescript --save-dev

# Initialize TypeScript configuration
npx tsc --init
```

## Basic Types

### The `any` Type

The `any` type disables TypeScript's type checking and allows any value type.

```typescript
let value: any = 42;
value = "hello";     // No error
value = true;        // No error
value = { x: 1 };    // No error
```

> ⚠️ **Warning**: Avoid using `any` as it defeats the purpose of TypeScript's type safety.

### The `unknown` Type

The `unknown` type is a safer alternative to `any`. It requires type checking before use.

```typescript
let userInput: unknown;
let userName: string;

userInput = 5;
userInput = "Max";

// This would cause an error
// userName = userInput;

// Type checking required
if (typeof userInput === "string") {
    userName = userInput; // Now it's safe
}
```

### Type Casting

Use the `as` keyword to cast types:

```typescript
let someValue: unknown = "Hello World";
let strLength: number = (someValue as string).length;
```

## Arrays and Tuples

### Basic Arrays

```typescript
// Type inference
const numbers = [1, 2, 3]; // inferred as number[]
numbers.push(4);           // ✅ Valid
// numbers.push("5");      // ❌ Error

// Explicit typing
const fruits: string[] = ["apple", "banana", "orange"];
```

### Readonly Arrays

```typescript
const names: readonly string[] = ["Alice", "Bob"];
// names.push("Charlie"); // ❌ Error: Property 'push' does not exist
```

### Tuples

Tuples are arrays with fixed length and specific types for each position:

```typescript
// Basic tuple
let person: [string, number, boolean];
person = ["John", 25, true]; // ✅ Valid

// Readonly tuple
const coordinates: readonly [number, number] = [10.5, 20.3];
// coordinates.push(30); // ❌ Error

// Destructuring tuples
const [x, y] = coordinates;

// React useState example
const [count, setCount] = useState<number>(0);
```

## Objects

### Basic Object Types

```typescript
const car: { type: string; model: string; year: number } = {
    type: "Toyota",
    model: "Corolla", 
    year: 2009
};
```

### Optional Properties

```typescript
const vehicle: { type: string; mileage?: number } = {
    type: "Honda"
    // mileage is optional
};

vehicle.mileage = 50000; // Can be assigned later
```

### Index Signatures

For objects with dynamic properties:

```typescript
const scores: { [studentName: string]: number } = {};
scores.Alice = 95;    // ✅ Valid
scores.Bob = 87;      // ✅ Valid
// scores.Charlie = "A+"; // ❌ Error: string not assignable to number
```

## Enums

Enums represent a group of named constants:

### Numeric Enums

```typescript
enum Direction {
    Up,    // 0
    Down,  // 1
    Left,  // 2
    Right  // 3
}

let playerDirection = Direction.Up;
console.log(playerDirection); // 0
```

### String Enums

```typescript
enum Status {
    SUCCESS = "success",
    ERROR = "error",
    LOADING = "loading"
}

console.log(Status.SUCCESS); // "success"
```

### Mixed Enums

```typescript
enum HttpStatus {
    OK = 200,
    NOT_FOUND = 404,
    SERVER_ERROR = "Internal Server Error"
}
```

### When to Use Enums vs Objects

| Use Case | Enum | Object |
|----------|------|--------|
| Type safety needed | ✅ | ❌ |
| Reverse mapping needed | ✅ | ❌ |
| Plain JavaScript compatibility | ❌ | ✅ |
| Runtime immutability | ❌ | ✅ (with `as const`) |

```typescript
// Object alternative with const assertion
const Colors = {
    RED: "red",
    BLUE: "blue", 
    GREEN: "green"
} as const;

type ColorType = typeof Colors[keyof typeof Colors];
```

## Type Aliases and Interfaces

### Type Aliases

Type aliases create custom names for types:

```typescript
type UserID = string | number;
type User = {
    id: UserID;
    name: string;
    email: string;
    isActive: boolean;
};

const user: User = {
    id: "user_123",
    name: "John Doe",
    email: "john@example.com",
    isActive: true
};
```

### Interfaces

Interfaces define the structure of objects:

```typescript
interface Animal {
    name: string;
    age: number;
    makeSound(): void;
}

interface Dog extends Animal {
    breed: string;
    wagTail(): void;
}

const myDog: Dog = {
    name: "Buddy",
    age: 3,
    breed: "Golden Retriever",
    makeSound() {
        console.log("Woof!");
    },
    wagTail() {
        console.log("Tail wagging!");
    }
};
```

### Type Aliases vs Interfaces

| Feature | Type Alias | Interface |
|---------|------------|-----------|
| Extend/Implement | ✅ (with `&`) | ✅ (with `extends`) |
| Declaration Merging | ❌ | ✅ |
| Computed Properties | ✅ | ❌ |
| Union Types | ✅ | ❌ |
| Primitive Types | ✅ | ❌ |

## Union Types

Union types allow a value to be one of several types:

```typescript
function printId(id: string | number) {
    console.log(`ID: ${id}`);
}

printId(123);     // ✅ Valid
printId("abc");   // ✅ Valid
// printId(true); // ❌ Error

// Type narrowing
function processValue(value: string | number) {
    if (typeof value === "string") {
        return value.toUpperCase(); // TypeScript knows it's a string
    } else {
        return value.toFixed(2);    // TypeScript knows it's a number
    }
}
```

## Functions

### Basic Function Types

```typescript
// Function declaration
function add(a: number, b: number): number {
    return a + b;
}

// Function expression
const multiply = (a: number, b: number): number => {
    return a * b;
};

// Void return type
function logMessage(message: string): void {
    console.log(message);
}
```

### Optional Parameters

```typescript
function greet(name: string, greeting?: string): string {
    return `${greeting || "Hello"}, ${name}!`;
}

greet("Alice");           // "Hello, Alice!"
greet("Bob", "Hi");       // "Hi, Bob!"
```

### Default Parameters

```typescript
function createUser(name: string, age: number = 18): User {
    return { name, age };
}
```

### Rest Parameters

```typescript
function sum(base: number, ...numbers: number[]): number {
    return base + numbers.reduce((acc, num) => acc + num, 0);
}

sum(10, 1, 2, 3, 4); // 20
```

### Function Types

```typescript
type MathOperation = (a: number, b: number) => number;

const divide: MathOperation = (dividend, divisor) => {
    return dividend / divisor;
};

// Function with object parameter
function calculateArea({ width, height }: { width: number; height: number }): number {
    return width * height;
}
```

## Type Casting

### Basic Casting

```typescript
let someValue: unknown = "Hello TypeScript";
let strLength: number = (someValue as string).length;
```

### Force Casting

For complex type overrides, cast through `unknown`:

```typescript
let value: string = "123";
let numValue: number = (value as unknown) as number;
// Note: This doesn't actually convert the value, just tells TypeScript to treat it as a number
```

### Type Assertions vs Type Conversion

```typescript
// Type assertion (doesn't change runtime value)
let input: unknown = "42";
let num1 = input as number; // Still a string at runtime!

// Actual type conversion
let num2 = Number(input);   // Actually converts to number
let num3 = parseInt(input as string); // Parse string to number
```

## Classes

### Basic Classes

```typescript
class Vehicle {
    private _speed: number = 0;
    
    constructor(public brand: string, protected model: string) {}
    
    get speed(): number {
        return this._speed;
    }
    
    set speed(value: number) {
        if (value >= 0) {
            this._speed = value;
        }
    }
    
    start(): void {
        console.log(`${this.brand} ${this.model} is starting...`);
    }
}
```

### Inheritance

```typescript
class Car extends Vehicle {
    constructor(brand: string, model: string, private doors: number) {
        super(brand, model);
    }
    
    getInfo(): string {
        return `${this.brand} ${this.model} with ${this.doors} doors`;
    }
}

const myCar = new Car("Toyota", "Camry", 4);
```

### Implementing Interfaces

```typescript
interface Flyable {
    fly(): void;
    altitude: number;
}

interface Swimmable {
    swim(): void;
    depth: number;
}

class Duck implements Flyable, Swimmable {
    altitude: number = 0;
    depth: number = 0;
    
    fly(): void {
        this.altitude = 100;
        console.log("Duck is flying!");
    }
    
    swim(): void {
        this.depth = 5;
        console.log("Duck is swimming!");
    }
}
```

### Abstract Classes

```typescript
abstract class Shape {
    abstract getArea(): number;
    
    displayArea(): void {
        console.log(`Area: ${this.getArea()}`);
    }
}

class Rectangle extends Shape {
    constructor(private width: number, private height: number) {
        super();
    }
    
    getArea(): number {
        return this.width * this.height;
    }
}

class Circle extends Shape {
    constructor(private radius: number) {
        super();
    }
    
    getArea(): number {
        return Math.PI * this.radius ** 2;
    }
}
```

## Best Practices

### 1. Use Strict Mode
Enable strict mode in `tsconfig.json`:
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

### 2. Prefer Type Inference
```typescript
// Good - let TypeScript infer
const users = getUsersFromAPI(); // TypeScript infers the type

// Less ideal - explicit typing when not needed
const users: User[] = getUsersFromAPI();
```

### 3. Use Union Types Instead of `any`
```typescript
// Good
function processData(data: string | number | boolean) {
    // Handle each type appropriately
}

// Avoid
function processData(data: any) {
    // No type safety
}
```

### 4. Leverage Utility Types
```typescript
interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}

// Pick specific properties
type PublicUser = Pick<User, 'id' | 'name' | 'email'>;

// Make all properties optional
type PartialUser = Partial<User>;

// Make all properties required
type RequiredUser = Required<User>;
```

This guide covers the essential TypeScript concepts with practical examples and best practices. TypeScript's type system helps catch errors early and makes code more maintainable and self-documenting.