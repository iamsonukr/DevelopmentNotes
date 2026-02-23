// ================================================================================
//              TYPESCRIPT COMPLETE COURSE - CHAPTER 3: WORKING WITH TYPES
// ================================================================================

// LECTURE 1: ARRAY DATA TYPE
// ===========================

// TWO WAYS TO DECLARE ARRAYS
// ---------------------------
//   // Method 1: type[] syntax (recommended)
//   let numbers: number[] = [1, 2, 3, 4, 5];
//   let names: string[] = ["Alice", "Bob", "Charlie"];
//   let flags: boolean[] = [true, false, true];

//   // Method 2: Array<type> generic syntax
//   let numbers2: Array<number> = [1, 2, 3];
//   let names2: Array<string> = ["Alice", "Bob"];

// READONLY ARRAYS
// ---------------
//   // Prevents modification
//   let readonlyNums: readonly number[] = [1, 2, 3];
//   let readonlyNums2: ReadonlyArray<number> = [1, 2, 3];

//   readonlyNums.push(4); // ERROR! Property 'push' does not exist

// ARRAY METHODS WITH TYPES
// -------------------------
//   let scores: number[] = [85, 92, 78, 95, 88];

//   // Map - transforms each element
//   let doubled: number[] = scores.map(score => score * 2);

//   // Filter - filters elements
//   let passing: number[] = scores.filter(score => score >= 80);

//   // Reduce - aggregates to single value
//   let total: number = scores.reduce((sum, score) => sum + score, 0);
//   let average: number = total / scores.length;

//   // Find
//   let firstHigh: number | undefined = scores.find(score => score > 90);

//   // Some / Every
//   let hasHigh: boolean = scores.some(score => score > 90);
//   let allPass: boolean = scores.every(score => score >= 70);

//   // Sort (careful - mutates original!)
//   let sorted: number[] = [...scores].sort((a, b) => a - b);

// MULTIDIMENSIONAL ARRAYS
// -----------------------
//   let matrix: number[][] = [
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9]
//   ];

//   console.log(matrix[1][2]); // 6

// ARRAY OF OBJECTS
// ----------------
//   interface Product {
//     id: number;
//     name: string;
//     price: number;
//     inStock: boolean;
//   }

//   let products: Product[] = [
//     { id: 1, name: "Laptop", price: 999, inStock: true },
//     { id: 2, name: "Phone", price: 599, inStock: false },
//     { id: 3, name: "Tablet", price: 399, inStock: true }
//   ];

//   let inStockProducts: Product[] = products.filter(p => p.inStock);
//   let names: string[] = products.map(p => p.name);
//   let expensive: Product | undefined = products.find(p => p.price > 900);

// REACT IMPLEMENTATION - ARRAYS
// -------------------------------
//   // TodoList.tsx
//   import React, { useState } from 'react';

//   interface Todo {
//     id: number;
//     text: string;
//     completed: boolean;
//   }

//   const TodoList: React.FC = () => {
//     const [todos, setTodos] = useState<Todo[]>([
//       { id: 1, text: "Learn TypeScript", completed: false },
//       { id: 2, text: "Build React App", completed: false }
//     ]);
//     const [input, setInput] = useState<string>('');

//     const addTodo = (): void => {
//       if (!input.trim()) return;
//       const newTodo: Todo = {
//         id: Date.now(),
//         text: input,
//         completed: false
//       };
//       setTodos(prev => [...prev, newTodo]);
//       setInput('');
//     };

//     const toggleTodo = (id: number): void => {
//       setTodos(prev =>
//         prev.map(todo =>
//           todo.id === id ? { ...todo, completed: !todo.completed } : todo
//         )
//       );
//     };

//     const deleteTodo = (id: number): void => {
//       setTodos(prev => prev.filter(todo => todo.id !== id));
//     };

//     return (
//       <div>
//         <input value={input} onChange={e => setInput(e.target.value)} />
//         <button onClick={addTodo}>Add</button>
//         {todos.map(todo => (
//           <div key={todo.id}>
//             <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
//               {todo.text}
//             </span>
//             <button onClick={() => toggleTodo(todo.id)}>Toggle</button>
//             <button onClick={() => deleteTodo(todo.id)}>Delete</button>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   export default TodoList;

// INTERVIEW QUESTIONS - LECTURE 1:
// ---------------------------------
// Q1: What are the two ways to type arrays in TypeScript?
// A: type[] syntax (e.g., number[]) and Array<type> generic syntax (e.g., Array<number>).
//    Both are equivalent. type[] is more commonly used and recommended for readability.

// Q2: What is ReadonlyArray and when would you use it?
// A: ReadonlyArray<T> (or readonly T[]) creates an array that cannot be modified
//    (no push, pop, splice). Use it when you want to prevent accidental mutation,
//    like passing arrays to functions that shouldn't modify them.

// Q3: How do array types work with generics in TypeScript?
// A: Array is itself a generic type - Array<T>. When you write number[], TypeScript
//    treats it as Array<number> internally. Generic functions can accept arrays of
//    any type: function first<T>(arr: T[]): T { return arr[0]; }

// ================================================================================

// LECTURE 2: TUPLE DATA TYPE
// ===========================

// WHAT IS A TUPLE?
// ----------------
// A Tuple is a fixed-length array where each position has a specific type.
// Unlike arrays (all same type), tuples can mix types in defined positions.

// BASIC TUPLE
// -----------
//   // [type1, type2, type3...]
//   let person: [string, number] = ["Alice", 25];
//   let coordinate: [number, number] = [10.5, 20.8];
//   let userRecord: [number, string, boolean] = [1, "John", true];

//   // Access by index
//   console.log(person[0]); // "Alice" - TypeScript knows it's string
//   console.log(person[1]); // 25 - TypeScript knows it's number

//   // Destructuring
//   const [name, age] = person;
//   const [x, y] = coordinate;

// READONLY TUPLE
// --------------
//   let point: readonly [number, number] = [10, 20];
//   // point[0] = 5; // ERROR! Cannot assign to read-only

// NAMED TUPLE ELEMENTS (TypeScript 4.0+)
// ----------------------------------------
//   // Makes tuples more readable with labels
//   let person: [name: string, age: number] = ["Alice", 25];
//   let range: [start: number, end: number] = [1, 100];

// OPTIONAL TUPLE ELEMENTS
// ------------------------
//   let config: [string, number?] = ["localhost"]; // port is optional
//   let config2: [string, number?] = ["localhost", 8080]; // also valid

// REST ELEMENTS IN TUPLES
// ------------------------
//   let mixed: [string, ...number[]] = ["scores", 85, 92, 78];
//   console.log(mixed[0]); // "scores"
//   console.log(mixed.slice(1)); // [85, 92, 78]

// PRACTICAL TUPLE EXAMPLES
// --------------------------
//   // useState return type is a tuple!
//   // [State, SetState] = useState<Type>(initialValue)

//   // Function returning multiple values
//   function getMinMax(numbers: number[]): [number, number] {
//     return [Math.min(...numbers), Math.max(...numbers)];
//   }

//   const [min, max] = getMinMax([5, 3, 8, 1, 9, 2]);
//   console.log(min, max); // 1, 9

//   // RGB color
//   type RGB = [red: number, green: number, blue: number];
//   const red: RGB = [255, 0, 0];
//   const green: RGB = [0, 255, 0];

//   // CSV row data
//   type CSVRow = [id: number, name: string, email: string, age: number];
//   const rows: CSVRow[] = [
//     [1, "Alice", "alice@email.com", 25],
//     [2, "Bob", "bob@email.com", 30]
//   ];

// REACT IMPLEMENTATION - TUPLES
// -------------------------------
//   // Custom hooks often return tuples (like useState)
//   // useToggle.ts
//   import { useState, useCallback } from 'react';

//   type UseToggleReturn = [boolean, () => void, () => void, () => void];

//   function useToggle(initialValue: boolean = false): UseToggleReturn {
//     const [value, setValue] = useState<boolean>(initialValue);

//     const toggle = useCallback(() => setValue(prev => !prev), []);
//     const setTrue = useCallback(() => setValue(true), []);
//     const setFalse = useCallback(() => setValue(false), []);

//     return [value, toggle, setTrue, setFalse];
//   }

//   // Usage in component
//   // Modal.tsx
//   import React from 'react';

//   const Modal: React.FC = () => {
//     const [isOpen, toggle, open, close] = useToggle(false);

//     return (
//       <div>
//         <button onClick={open}>Open Modal</button>
//         {isOpen && (
//           <div className="modal">
//             <p>Modal Content</p>
//             <button onClick={close}>Close</button>
//           </div>
//         )}
//       </div>
//     );
//   };

// INTERVIEW QUESTIONS - LECTURE 2:
// ---------------------------------
// Q1: What is the difference between a Tuple and an Array in TypeScript?
// A: Arrays are variable-length collections of the same type (number[]).
//    Tuples are fixed-length arrays where each position has a specific type
//    ([string, number, boolean]). Tuples enforce both the length and type at
//    each position.

// Q2: How does useState's return type relate to tuples?
// A: useState<T> returns a tuple [T, Dispatch<SetStateAction<T>>].
//    That's why you can destructure it: const [state, setState] = useState(0).
//    The first element is always the state value, second is the setter function.

// Q3: When would you use a tuple over an object?
// A: Tuples when: returning multiple values from a function, the order/position
//    is meaningful and well-known, you want a lightweight structure without naming.
//    Objects when: you have named properties, readability matters more, structure
//    may grow. Tuples are great for fixed, small data like [x, y] coordinates.

// ================================================================================

// LECTURE 3: OBJECT DATA TYPE
// ============================

// BASIC OBJECT TYPE ANNOTATION
// ------------------------------
//   // Inline object type
//   let user: { name: string; age: number; email: string } = {
//     name: "Alice",
//     age: 25,
//     email: "alice@email.com"
//   };

// OPTIONAL PROPERTIES
// -------------------
//   let config: {
//     host: string;
//     port?: number;      // optional - may or may not exist
//     secure?: boolean;
//   } = { host: "localhost" }; // valid - port and secure are optional

// READONLY PROPERTIES
// -------------------
//   let point: {
//     readonly x: number;
//     readonly y: number;
//   } = { x: 10, y: 20 };

//   // point.x = 15; // ERROR! Cannot assign to 'x' because it's read-only

// NESTED OBJECTS
// --------------
//   let company: {
//     name: string;
//     address: {
//       street: string;
//       city: string;
//       country: string;
//     };
//     employees: number;
//   } = {
//     name: "TechCorp",
//     address: {
//       street: "123 Main St",
//       city: "New York",
//       country: "USA"
//     },
//     employees: 500
//   };

// OBJECT DESTRUCTURING WITH TYPES
// --------------------------------
//   function displayUser({ name, age }: { name: string; age: number }): void {
//     console.log(`${name} is ${age} years old`);
//   }

//   displayUser({ name: "Bob", age: 30 }); // "Bob is 30 years old"

// OBJECT SPREAD AND REST
// -----------------------
//   type User = { id: number; name: string; age: number; role: string };
  
//   const user: User = { id: 1, name: "Alice", age: 25, role: "admin" };
  
//   // Create new object with modifications
//   const updatedUser: User = { ...user, age: 26 };
  
//   // Pick some properties
//   const { id, name, ...rest } = user;
//   console.log(rest); // { age: 25, role: "admin" }

// REACT IMPLEMENTATION - OBJECTS
// --------------------------------
//   // ProductCard.tsx
//   import React from 'react';

//   type Product = {
//     id: number;
//     name: string;
//     price: number;
//     description: string;
//     image?: string;
//     inStock: boolean;
//     category: {
//       id: number;
//       name: string;
//     };
//     ratings: {
//       average: number;
//       count: number;
//     };
//   };

//   interface ProductCardProps {
//     product: Product;
//     onAddToCart: (id: number) => void;
//   }

//   const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
//     const { name, price, description, inStock, category, ratings } = product;

//     return (
//       <div className="card">
//         <span className="badge">{category.name}</span>
//         <h3>{name}</h3>
//         <p>{description}</p>
//         <div>
//           <span>Rating: {ratings.average}/5 ({ratings.count} reviews)</span>
//         </div>
//         <div>
//           <strong>${price}</strong>
//           <span>{inStock ? 'In Stock' : 'Out of Stock'}</span>
//         </div>
//         <button
//           onClick={() => onAddToCart(product.id)}
//           disabled={!inStock}
//         >
//           Add to Cart
//         </button>
//       </div>
//     );
//   };

//   export default ProductCard;

// INTERVIEW QUESTIONS - LECTURE 3:
// ---------------------------------
// Q1: How do you define an object type in TypeScript?
// A: Inline: { name: string; age: number }
//    Interface: interface User { name: string; age: number }
//    Type alias: type User = { name: string; age: number }
//    Interfaces and type aliases are preferred for reusability.

// Q2: What is the difference between optional (?) and undefined in object properties?
// A: Optional property (name?: string) means the property may or may not exist.
//    With string | undefined, the property must exist but can be undefined.
//    { a?: string } allows { } but { a: string | undefined } requires { a: undefined }

// ================================================================================

// LECTURE 4: UNION TYPE
// ======================

// WHAT IS UNION TYPE?
// -------------------
// Union types allow a variable to hold one of several specified types.
// Use the | (pipe) operator to combine types.

// BASIC UNION TYPES
// -----------------
//   let id: number | string = 123;
//   id = "abc"; // Also valid

//   let status: "active" | "inactive" | "pending" = "active";
//   status = "inactive"; // Valid
//   // status = "deleted"; // ERROR! Not in the union

// UNION WITH FUNCTIONS
// --------------------
//   function display(value: string | number | boolean): void {
//     console.log(value);
//   }

//   display("hello");  // OK
//   display(42);       // OK
//   display(true);     // OK
//   // display(null);  // ERROR!

// NARROWING UNION TYPES
// ---------------------
//   // Must narrow type before using type-specific methods
//   function process(input: string | number): string {
//     // typeof narrowing
//     if (typeof input === "string") {
//       return input.toUpperCase(); // TypeScript knows it's string here
//     } else {
//       return input.toFixed(2);   // TypeScript knows it's number here
//     }
//   }

// DISCRIMINATED UNIONS (Very Important Pattern!)
// -----------------------------------------------
//   // Use a common "discriminant" property to narrow types
//   type Circle = {
//     kind: "circle";  // discriminant
//     radius: number;
//   };

//   type Rectangle = {
//     kind: "rectangle";  // discriminant
//     width: number;
//     height: number;
//   };

//   type Triangle = {
//     kind: "triangle";  // discriminant
//     base: number;
//     height: number;
//   };

//   type Shape = Circle | Rectangle | Triangle;

//   function getArea(shape: Shape): number {
//     switch (shape.kind) {
//       case "circle":
//         return Math.PI * shape.radius ** 2;
//       case "rectangle":
//         return shape.width * shape.height;
//       case "triangle":
//         return 0.5 * shape.base * shape.height;
//       // TypeScript warns if we forget a case!
//     }
//   }

//   const circle: Shape = { kind: "circle", radius: 5 };
//   console.log(getArea(circle)); // 78.53...

// STRING LITERAL UNIONS
// ---------------------
//   type Direction = "north" | "south" | "east" | "west";
//   type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
//   type Theme = "light" | "dark" | "system";

//   function move(direction: Direction, steps: number): void {
//     console.log(`Moving ${steps} steps ${direction}`);
//   }

//   move("north", 5);   // OK
//   // move("up", 3);   // ERROR!

// REACT IMPLEMENTATION - UNION TYPES
// ------------------------------------
//   // Alert.tsx - Discriminated Union for Alert types
//   import React from 'react';

//   type AlertType = "success" | "error" | "warning" | "info";

//   interface AlertProps {
//     type: AlertType;
//     message: string;
//     onClose?: () => void;
//   }

//   const alertStyles: Record<AlertType, string> = {
//     success: "#d4edda",
//     error: "#f8d7da",
//     warning: "#fff3cd",
//     info: "#d1ecf1"
//   };

//   const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
//     return (
//       <div style={{ backgroundColor: alertStyles[type], padding: '12px', borderRadius: '4px' }}>
//         <span>{message}</span>
//         {onClose && <button onClick={onClose}>x</button>}
//       </div>
//     );
//   };

//   // Usage:
//   // <Alert type="success" message="Data saved!" />
//   // <Alert type="error" message="Something went wrong" onClose={() => {}} />

//   // FormField.tsx - Union for different input types
//   type InputValue = string | number | boolean;

//   interface FormFieldProps {
//     label: string;
//     value: InputValue;
//     onChange: (value: InputValue) => void;
//   }

// INTERVIEW QUESTIONS - LECTURE 4:
// ---------------------------------
// Q1: What is a Union type and when would you use it?
// A: Union type (type1 | type2) means a value can be one of several types.
//    Use it when a variable can legitimately hold different types, like a function
//    parameter that accepts string | number, or API responses that can be
//    success | error states.

// Q2: What are discriminated unions and why are they powerful?
// A: Discriminated unions are union types where each member has a common "literal"
//    property (discriminant) that TypeScript can use to narrow the type. They're
//    powerful for modeling state machines, action types in reducers, and shapes -
//    TypeScript can exhaustively check all cases in switch statements.

// Q3: What is "narrowing" in TypeScript?
// A: Narrowing is when TypeScript refines a broader type to a more specific type
//    within a code block. This happens with: typeof checks, instanceof checks,
//    in operator, equality checks, and discriminant properties.

// ================================================================================

// LECTURE 5: ANY AND UNKNOWN DATA TYPES
// =======================================

// ANY TYPE - ESCAPE HATCH
// ------------------------
//   // 'any' disables TypeScript's type checking entirely
//   let data: any = "hello";
//   data = 42;           // OK
//   data = true;         // OK
//   data = { name: "x" }; // OK
//   data.nonExistent();  // No error! But will crash at runtime!

//   // Use cases for 'any':
//   // - Migrating JavaScript to TypeScript gradually
//   // - Working with dynamic content you truly can't type
//   // - Third-party libraries without type definitions

// PROBLEMS WITH ANY
// ------------------
//   function processData(data: any): void {
//     data.toUpperCase(); // No TypeScript error, but might crash!
//   }

//   processData(42); // Runtime error: data.toUpperCase is not a function
//   // TypeScript would have caught this if data had a proper type

// UNKNOWN TYPE - SAFER ALTERNATIVE
// ----------------------------------
//   // 'unknown' is type-safe version of 'any'
//   let userInput: unknown = "hello";

//   // Cannot use unknown directly:
//   // userInput.toUpperCase(); // ERROR! Object is of type 'unknown'
//   // let str: string = userInput; // ERROR!

//   // Must narrow/check type first:
//   if (typeof userInput === "string") {
//     console.log(userInput.toUpperCase()); // OK - narrowed to string
//   }

//   if (typeof userInput === "number") {
//     console.log(userInput.toFixed(2)); // OK - narrowed to number
//   }

// ANY vs UNKNOWN COMPARISON
// --------------------------
//   let anyVal: any = "test";
//   let unknownVal: unknown = "test";

//   // any - no restrictions
//   anyVal.method();              // No error (dangerous!)
//   let x: string = anyVal;      // No error (dangerous!)

//   // unknown - must check first
//   // unknownVal.method();       // ERROR - must narrow first
//   // let y: string = unknownVal; // ERROR - must narrow first
  
//   if (typeof unknownVal === "string") {
//     unknownVal.toUpperCase();   // OK after narrowing
//   }

// PRACTICAL UNKNOWN USAGE
// ------------------------
//   // API response handling
//   async function fetchData(url: string): Promise<unknown> {
//     const response = await fetch(url);
//     return response.json();
//   }

//   // Type guard to safely use the result
//   interface ApiUser {
//     id: number;
//     name: string;
//   }

//   function isApiUser(data: unknown): data is ApiUser {
//     return (
//       typeof data === "object" &&
//       data !== null &&
//       "id" in data &&
//       "name" in data
//     );
//   }

//   async function getUser(): Promise<void> {
//     const data = await fetchData("https://api.example.com/user/1");
    
//     if (isApiUser(data)) {
//       console.log(data.name); // Safe to use!
//     }
//   }

//   // Error handling with unknown
//   function handleError(error: unknown): string {
//     if (error instanceof Error) {
//       return error.message;
//     }
//     if (typeof error === "string") {
//       return error;
//     }
//     return "An unknown error occurred";
//   }

//   try {
//     throw new Error("Something went wrong");
//   } catch (e) {
//     console.log(handleError(e)); // "Something went wrong"
//   }

// REACT IMPLEMENTATION - ANY AND UNKNOWN
// ----------------------------------------
//   // SafeApiComponent.tsx
//   import React, { useState, useEffect } from 'react';

//   // Bad practice - using any
//   const BadComponent: React.FC = () => {
//     const [data, setData] = useState<any>(null);
    
//     useEffect(() => {
//       fetch('/api/data')
//         .then(res => res.json())
//         .then(json => setData(json)); // No type safety!
//     }, []);

//     return <div>{data?.name}</div>; // Unsafe
//   };

//   // Good practice - using unknown with type guard
//   interface UserData {
//     id: number;
//     name: string;
//     email: string;
//   }

//   function isUserData(data: unknown): data is UserData {
//     return (
//       typeof data === "object" &&
//       data !== null &&
//       typeof (data as any).id === "number" &&
//       typeof (data as any).name === "string" &&
//       typeof (data as any).email === "string"
//     );
//   }

//   const GoodComponent: React.FC = () => {
//     const [user, setUser] = useState<UserData | null>(null);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//       fetch('/api/user')
//         .then(res => res.json())
//         .then((data: unknown) => {
//           if (isUserData(data)) {
//             setUser(data); // Type-safe!
//           } else {
//             setError("Invalid data format");
//           }
//         })
//         .catch(() => setError("Fetch failed"));
//     }, []);

//     if (error) return <p>Error: {error}</p>;
//     if (!user) return <p>Loading...</p>;
//     return <div>{user.name} - {user.email}</div>;
//   };

// INTERVIEW QUESTIONS - LECTURE 5:
// ---------------------------------
// Q1: What is the difference between 'any' and 'unknown' in TypeScript?
// A: Both accept any value, but 'unknown' is type-safe. With 'any', you can
//    perform any operation without checks. With 'unknown', you must first
//    narrow the type using typeof, instanceof, or type guards before using it.
//    Prefer 'unknown' over 'any' when the type is truly not known.

// Q2: When is it acceptable to use 'any'?
// A: - Gradual migration from JavaScript to TypeScript
//    - Working with truly dynamic data that cannot be typed
//    - Third-party libraries without type definitions
//    - Temporary escape hatch while figuring out the right types
//    Never use 'any' as a default when you're too lazy to type - use 'unknown'.

// Q3: How does 'catch (e)' relate to 'unknown'?
// A: In TypeScript 4.0+, the error in catch blocks is typed as 'unknown'
//    (previously 'any'). This forces you to check the type before using it:
//    catch (e) { if (e instanceof Error) { e.message } }

// ================================================================================

// LECTURE 6: NEVER DATA TYPE
// ===========================

// WHAT IS NEVER?
// --------------
// 'never' represents values that never occur:
// - Functions that never return (throw or infinite loop)
// - Variables that can never have a value
// - Impossible type after all narrowing is done

// FUNCTIONS THAT NEVER RETURN
// -----------------------------
//   // Always throws - never returns
//   function throwError(message: string): never {
//     throw new Error(message);
//   }

//   // Infinite loop - never returns
//   function infiniteLoop(): never {
//     while (true) {
//       // keeps running forever
//     }
//   }

//   // Process.exit - never returns
//   function exitProcess(code: number): never {
//     process.exit(code);
//   }

// NEVER IN TYPE NARROWING
// ------------------------
//   type StringOrNumber = string | number;

//   function process(value: StringOrNumber): string {
//     if (typeof value === "string") {
//       return value.toUpperCase();
//     } else if (typeof value === "number") {
//       return value.toString();
//     } else {
//       // At this point, TypeScript knows 'value' is 'never'
//       // because we've handled all cases!
//       const exhaustiveCheck: never = value;
//       return exhaustiveCheck;
//     }
//   }

// EXHAUSTIVE CHECKS WITH NEVER
// ------------------------------
//   type Shape = "circle" | "square" | "triangle";

//   function getShapeInfo(shape: Shape): string {
//     switch (shape) {
//       case "circle":
//         return "I am a circle";
//       case "square":
//         return "I am a square";
//       case "triangle":
//         return "I am a triangle";
//       default:
//         // If someone adds a new shape type and forgets this function,
//         // TypeScript will error here!
//         const _exhaustiveCheck: never = shape;
//         throw new Error(`Unknown shape: ${shape}`);
//     }
//   }

// NEVER vs VOID
// -------------
//   // void - function returns, but has no meaningful return value
//   function log(message: string): void {
//     console.log(message);
//     // Returns undefined implicitly
//   }

//   // never - function NEVER returns (throws or loops forever)
//   function fail(message: string): never {
//     throw new Error(message);
//     // No return statement possible
//   }

// NEVER IN CONDITIONAL TYPES
// ---------------------------
//   // Conditional types use never for impossible cases
//   type NonNullable<T> = T extends null | undefined ? never : T;

//   type A = NonNullable<string | null>;     // string
//   type B = NonNullable<string | undefined>; // string
//   type C = NonNullable<null>;              // never

// REACT IMPLEMENTATION - NEVER
// ------------------------------
//   // ErrorBoundary pattern with never for impossible states
//   import React, { useState } from 'react';

//   type Status = "idle" | "loading" | "success" | "error";

//   interface State {
//     status: Status;
//     data: string | null;
//     error: string | null;
//   }

//   // Exhaustive function for status handling
//   function getStatusMessage(status: Status): string {
//     switch (status) {
//       case "idle": return "Ready to fetch";
//       case "loading": return "Loading...";
//       case "success": return "Data loaded!";
//       case "error": return "An error occurred";
//       default:
//         // TypeScript guards against missed cases
//         const unreachable: never = status;
//         throw new Error(`Unhandled status: ${unreachable}`);
//     }
//   }

//   const StatusComponent: React.FC = () => {
//     const [state, setState] = useState<State>({
//       status: "idle",
//       data: null,
//       error: null
//     });

//     const message = getStatusMessage(state.status);

//     return <div>{message}</div>;
//   };

// INTERVIEW QUESTIONS - LECTURE 6:
// ---------------------------------
// Q1: What is the 'never' type and when do you use it?
// A: 'never' represents values that never occur. Used for functions that never
//    return (always throw or loop forever), and in conditional types for impossible
//    branches. It's also used in exhaustive checks to ensure all cases of a union
//    are handled.

// Q2: What is the difference between never and void?
// A: void means a function returns but with no meaningful value (returns undefined).
//    never means the function NEVER returns - it either throws an exception or
//    runs an infinite loop.

// Q3: How does 'never' help with exhaustive checking?
// A: In a switch/if-else covering all union members, the default case becomes
//    type 'never' (nothing left to narrow to). Assigning to 'never' causes a
//    compile error if there's ever a case we didn't handle. Great for maintainability.

// ================================================================================

// LECTURE 7: FUNCTION RETURN TYPES
// ==================================

// BASIC FUNCTION RETURN TYPES
// -----------------------------
//   // Explicit return type annotation
//   function add(a: number, b: number): number {
//     return a + b;
//   }

//   function greet(name: string): string {
//     return `Hello, ${name}!`;
//   }

//   function isAdult(age: number): boolean {
//     return age >= 18;
//   }

//   // void - no meaningful return value
//   function log(message: string): void {
//     console.log(message);
//   }

//   // never - never returns
//   function error(msg: string): never {
//     throw new Error(msg);
//   }

// ARROW FUNCTION TYPES
// --------------------
//   const multiply = (a: number, b: number): number => a * b;
//   const shout = (text: string): string => text.toUpperCase() + "!!!";

//   // Function type annotation
//   let operation: (a: number, b: number) => number;
//   operation = (x, y) => x + y;   // OK
//   operation = (x, y) => x - y;   // OK
//   // operation = (x) => x;        // ERROR - wrong signature

// OPTIONAL AND DEFAULT PARAMETERS
// ---------------------------------
//   function createUser(
//     name: string,
//     age: number,
//     role: string = "user",      // default
//     email?: string              // optional
//   ): object {
//     return { name, age, role, email: email ?? "not provided" };
//   }

//   createUser("Alice", 25);                    // role="user", email="not provided"
//   createUser("Bob", 30, "admin");             // email="not provided"
//   createUser("Charlie", 35, "user", "c@c.com"); // all provided

// REST PARAMETERS
// ---------------
//   function sum(...numbers: number[]): number {
//     return numbers.reduce((acc, n) => acc + n, 0);
//   }

//   console.log(sum(1, 2, 3));       // 6
//   console.log(sum(1, 2, 3, 4, 5)); // 15

// FUNCTION OVERLOADS
// ------------------
//   // Multiple signatures for one function
//   function format(value: string): string;
//   function format(value: number): string;
//   function format(value: boolean): string;
//   function format(value: string | number | boolean): string {
//     if (typeof value === "string") return `"${value}"`;
//     if (typeof value === "number") return value.toFixed(2);
//     return value ? "Yes" : "No";
//   }

//   console.log(format("hello"));  // '"hello"'
//   console.log(format(3.14159)); // "3.14"
//   console.log(format(true));    // "Yes"

// HIGHER ORDER FUNCTIONS
// -----------------------
//   // Functions that take/return functions
//   function applyOperation(
//     a: number,
//     b: number,
//     operation: (x: number, y: number) => number
//   ): number {
//     return operation(a, b);
//   }

//   console.log(applyOperation(10, 5, (a, b) => a + b)); // 15
//   console.log(applyOperation(10, 5, (a, b) => a * b)); // 50

// GENERIC FUNCTIONS
// -----------------
//   function identity<T>(arg: T): T {
//     return arg;
//   }

//   function firstElement<T>(arr: T[]): T | undefined {
//     return arr[0];
//   }

//   console.log(identity(42));            // 42 (T is number)
//   console.log(identity("hello"));       // "hello" (T is string)
//   console.log(firstElement([1, 2, 3])); // 1

// REACT IMPLEMENTATION - FUNCTION RETURN TYPES
// ---------------------------------------------
//   // Event Handlers
//   import React, { useState, useCallback } from 'react';

//   const Form: React.FC = () => {
//     const [value, setValue] = useState<string>('');
//     const [submitted, setSubmitted] = useState<boolean>(false);

//     // Event handler return types
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//       setValue(e.target.value);
//     };

//     const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
//       e.preventDefault();
//       setSubmitted(true);
//     };

//     const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
//       if (e.key === 'Enter') {
//         console.log('Enter pressed');
//       }
//     };

//     // Callback with return type
//     const validateEmail = useCallback((email: string): boolean => {
//       return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//     }, []);

//     // Transformation function
//     const formatValue = (input: string): string => {
//       return input.trim().toLowerCase();
//     };

//     return (
//       <form onSubmit={handleSubmit}>
//         <input
//           value={value}
//           onChange={handleChange}
//           onKeyDown={handleKeyDown}
//           placeholder="Enter email"
//         />
//         <span>{validateEmail(value) ? 'Valid' : 'Invalid'}</span>
//         <button type="submit">Submit</button>
//         {submitted && <p>Submitted: {formatValue(value)}</p>}
//       </form>
//     );
//   };

//   export default Form;

// INTERVIEW QUESTIONS - LECTURE 7:
// ---------------------------------
// Q1: Should you always annotate function return types in TypeScript?
// A: Not always - TypeScript can usually infer return types. But it's good practice
//    to annotate return types for public APIs, when the inferred type might be
//    surprising, and to catch bugs where you accidentally return the wrong type.

// Q2: What is the difference between void and undefined as return types?
// A: void means the return value is not expected to be used. A void function CAN
//    return undefined but callers shouldn't use the return value.
//    undefined means the function specifically returns undefined.
//    Typically use void for functions that don't return meaningful values.

// Q3: What are function overloads in TypeScript?
// A: Function overloads allow you to define multiple type signatures for a single
//    function. You provide several overload signatures followed by one implementation
//    signature. TypeScript uses the overload signatures for type checking calls.

// Q4: What type does an async function return?
// A: An async function always returns Promise<T> where T is the type of the
//    resolved value. If the function returns string, the actual return type is
//    Promise<string>. Always annotate async functions with Promise<ReturnType>.

// ================================================================================
// END OF CHAPTER 3
// ================================================================================