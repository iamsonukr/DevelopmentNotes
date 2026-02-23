// ================================================================================
//               TYPESCRIPT COMPLETE COURSE - CHAPTER 2: BASIC DATA TYPES
// ================================================================================

// LECTURE 1: DATA TYPES IN TYPESCRIPT
// =====================================

// OVERVIEW OF TYPE SYSTEM
// ------------------------
// TypeScript has two categories of types:

// 1. PRIMITIVE TYPES (built-in)
//    - number, string, boolean
//    - null, undefined
//    - bigint, symbol

// 2. OBJECT TYPES
//    - object, array, tuple
//    - function, class, interface

// TYPE ANNOTATION SYNTAX
// -----------------------
//   let variableName: type = value;

//   let age: number = 25;
//   let name: string = "Alice";
//   let isActive: boolean = true;

// TYPE INFERENCE (TypeScript is smart!)
// ---------------------------------------
//   // TypeScript can infer types automatically
//   let age = 25;         // TypeScript infers: number
//   let name = "Alice";   // TypeScript infers: string
//   let flag = true;      // TypeScript infers: boolean

//   // Best Practice: Let TypeScript infer when obvious, annotate when not
//   let x = 10;           // OK - obvious it's number
//   let data: string[];   // Annotate - not obvious without value

// PRACTICE EXERCISE:
// ------------------
//   // Try these in TypeScript and see the errors
//   let score: number = 100;
//   score = "hundred"; // ERROR: Type 'string' is not assignable to type 'number'

//   let username: string = "John";
//   username = 42; // ERROR: Type 'number' is not assignable to type 'string'

// ================================================================================

// LECTURE 2: NUMBER DATA TYPE
// ============================

// ALL ABOUT NUMBER TYPE
// ----------------------
// TypeScript (like JavaScript) has a single 'number' type for:
// - Integers: 1, 2, 100, -5
// - Floats: 3.14, -0.5, 2.718
// - Hex: 0xFF, 0xA1B2
// - Octal: 0o17
// - Binary: 0b1010

// BASIC USAGE
// -----------
//   let age: number = 25;
//   let price: number = 99.99;
//   let temperature: number = -10;
//   let hex: number = 0xFF;     // 255
//   let binary: number = 0b1010; // 10
//   let octal: number = 0o17;    // 15

// SPECIAL NUMBER VALUES
// ----------------------
//   let infinity: number = Infinity;
//   let negInfinity: number = -Infinity;
//   let notANumber: number = NaN;

// NUMBER OPERATIONS
// -----------------
//   let a: number = 10;
//   let b: number = 3;

//   let sum: number = a + b;        // 13
//   let diff: number = a - b;       // 7
//   let product: number = a * b;    // 30
//   let quotient: number = a / b;   // 3.333...
//   let remainder: number = a % b;  // 1
//   let power: number = a ** b;     // 1000

// PRACTICAL FUNCTIONS WITH NUMBERS
// ---------------------------------
//   function calculateArea(width: number, height: number): number {
//     return width * height;
//   }

//   function isEven(num: number): boolean {
//     return num % 2 === 0;
//   }

//   function celsiusToFahrenheit(celsius: number): number {
//     return (celsius * 9/5) + 32;
//   }

//   console.log(calculateArea(5, 10));        // 50
//   console.log(isEven(4));                   // true
//   console.log(celsiusToFahrenheit(100));    // 212

// REACT IMPLEMENTATION - NUMBER TYPE
// ------------------------------------
//   // Counter.tsx
//   import React, { useState } from 'react';

//   interface CounterProps {
//     initialCount: number;
//     step: number;
//   }

//   const Counter: React.FC<CounterProps> = ({ initialCount, step }) => {
//     const [count, setCount] = useState<number>(initialCount);

//     const increment = (): void => setCount(prev => prev + step);
//     const decrement = (): void => setCount(prev => prev - step);
//     const reset = (): void => setCount(initialCount);

//     return (
//       <div>
//         <h2>Count: {count}</h2>
//         <button onClick={increment}>+{step}</button>
//         <button onClick={decrement}>-{step}</button>
//         <button onClick={reset}>Reset</button>
//       </div>
//     );
//   };

//   export default Counter;

//   // Usage in App.tsx
//   // <Counter initialCount={0} step={5} />

// INTERVIEW QUESTIONS - LECTURE 2:
// ---------------------------------
// Q1: What is the difference between number types in TypeScript vs other languages?
// A: Unlike Java/C# which have int, float, double, etc., TypeScript has a single
//    'number' type (64-bit floating point) for all numeric values. For very large
//    integers, use 'bigint'.

// Q2: How do you handle NaN in TypeScript?
// A: NaN has type 'number' in TypeScript. Use Number.isNaN() to check for it:
//    if (Number.isNaN(value)) { ... }
//    Note: typeof NaN === 'number' returns true!

// Q3: When would you use number vs bigint?
// A: Use 'number' for most cases (safe up to 2^53 - 1 = 9,007,199,254,740,991).
//    Use 'bigint' for integers larger than this, like cryptography or unique IDs
//    from databases that exceed the safe integer limit.

// ================================================================================

// LECTURE 3: STRING AND BOOLEAN DATA TYPES
// ==========================================

// STRING TYPE
// -----------
// Represents text data. Can use single, double quotes, or template literals.

//   let firstName: string = "John";
//   let lastName: string = 'Doe';
//   let greeting: string = `Hello, ${firstName} ${lastName}!`;

// STRING METHODS (still available in TypeScript)
// -----------------------------------------------
//   let message: string = "Hello TypeScript";

//   console.log(message.length);           // 16
//   console.log(message.toUpperCase());    // "HELLO TYPESCRIPT"
//   console.log(message.toLowerCase());    // "hello typescript"
//   console.log(message.includes("Type")); // true
//   console.log(message.split(" "));       // ["Hello", "TypeScript"]
//   console.log(message.trim());           // removes whitespace
//   console.log(message.replace("Hello", "Hi")); // "Hi TypeScript"
//   console.log(message.slice(0, 5));      // "Hello"
//   console.log(message.indexOf("Type")); // 6
//   console.log(message.startsWith("Hello")); // true
//   console.log(message.endsWith("Script")); // true

// TEMPLATE LITERALS
// -----------------
//   function getUserInfo(name: string, age: number, city: string): string {
//     return `
//       User Profile:
//       Name: ${name}
//       Age: ${age}
//       City: ${city}
//       Adult: ${age >= 18 ? 'Yes' : 'No'}
//     `;
//   }

//   console.log(getUserInfo("Alice", 25, "NYC"));

// BOOLEAN TYPE
// ------------
// Represents true or false values.

//   let isLoggedIn: boolean = true;
//   let hasPermission: boolean = false;
//   let isActive: boolean = true;

// BOOLEAN IN CONDITIONS
// ----------------------
//   function checkAccess(isLoggedIn: boolean, isAdmin: boolean): string {
//     if (isLoggedIn && isAdmin) {
//       return "Full access granted";
//     } else if (isLoggedIn) {
//       return "Limited access granted";
//     } else {
//       return "Access denied";
//     }
//   }

//   console.log(checkAccess(true, true));   // "Full access granted"
//   console.log(checkAccess(true, false));  // "Limited access granted"
//   console.log(checkAccess(false, false)); // "Access denied"

// REACT IMPLEMENTATION - STRING AND BOOLEAN
// ------------------------------------------
//   // UserProfile.tsx
//   import React, { useState } from 'react';

//   interface User {
//     name: string;
//     email: string;
//     isActive: boolean;
//     isPremium: boolean;
//   }

//   const UserProfile: React.FC<User> = ({ name, email, isActive, isPremium }) => {
//     const [isEditing, setIsEditing] = useState<boolean>(false);
//     const [displayName, setDisplayName] = useState<string>(name);

//     return (
//       <div className={`profile ${isActive ? 'active' : 'inactive'}`}>
//         {isEditing ? (
//           <input
//             type="text"
//             value={displayName}
//             onChange={(e) => setDisplayName(e.target.value)}
//           />
//         ) : (
//           <h2>{displayName}</h2>
//         )}
//         <p>Email: {email}</p>
//         <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
//         <p>Account: {isPremium ? 'Premium' : 'Free'}</p>
//         <button onClick={() => setIsEditing(!isEditing)}>
//           {isEditing ? 'Save' : 'Edit'}
//         </button>
//       </div>
//     );
//   };

//   export default UserProfile;

// INTERVIEW QUESTIONS - LECTURE 3:
// ---------------------------------
// Q1: How are strings handled differently in TypeScript vs JavaScript?
// A: TypeScript adds type safety - you can't accidentally assign a non-string to a
//    string variable. All JavaScript string methods are available. TypeScript also
//    allows you to define string literal types (type Direction = "left" | "right").

// Q2: What is the difference between Boolean (capital B) and boolean (lowercase)?
// A: boolean (lowercase) is the TypeScript/JavaScript primitive type. Boolean
//    (uppercase) is the wrapper object. Always use lowercase boolean in TypeScript
//    for type annotations. Using Boolean object is generally discouraged.

// Q3: How does TypeScript handle string vs String types?
// A: In TypeScript, always use primitive 'string' (lowercase) for type annotations.
//    'String' (uppercase) refers to the String object wrapper and behaves
//    differently. TypeScript will warn you to use the primitive type.

// ================================================================================

// LECTURE 4: NULL AND UNDEFINED DATA TYPES
// ==========================================

// THE DIFFERENCE
// --------------
//   undefined: Variable declared but no value assigned (default state)
//   null:      Intentional absence of a value (explicitly set to nothing)

//   let a: undefined = undefined; // undefined type
//   let b: null = null;           // null type

// WITHOUT strictNullChecks (bad practice)
// -----------------------------------------
//   // TypeScript allows null/undefined everywhere - dangerous!
//   let name: string = null;      // allowed without strict
//   let age: number = undefined;  // allowed without strict

// WITH strictNullChecks: true (recommended)
// ------------------------------------------
//   let name: string = null;      // ERROR! Not assignable
//   let age: number = undefined;  // ERROR! Not assignable

//   // Must be explicit with union types:
//   let name: string | null = null;        // OK
//   let age: number | undefined = undefined; // OK

// PRACTICAL USAGE
// ---------------
//   // Function that might return null
//   function findUser(id: number): string | null {
//     const users: Record<number, string> = {
//       1: "Alice",
//       2: "Bob"
//     };
//     return users[id] || null;
//   }

//   const user = findUser(1);
//   if (user !== null) {
//     console.log(user.toUpperCase()); // Safe to use
//   }

//   // Optional parameters (implicitly undefined)
//   function greet(name: string, title?: string): string {
//     if (title !== undefined) {
//       return `Hello, ${title} ${name}!`;
//     }
//     return `Hello, ${name}!`;
//   }

//   console.log(greet("Alice"));           // "Hello, Alice!"
//   console.log(greet("Alice", "Dr."));   // "Hello, Dr. Alice!"

// NULLISH COALESCING OPERATOR (??)
// ----------------------------------
//   // Returns right side only if left is null or undefined
//   let username: string | null = null;
//   let displayName: string = username ?? "Guest";
//   console.log(displayName); // "Guest"

//   let score: number | undefined = undefined;
//   let finalScore: number = score ?? 0;
//   console.log(finalScore); // 0

// OPTIONAL CHAINING (?.)
// -----------------------
//   interface User {
//     name: string;
//     address?: {
//       city: string;
//       zip?: string;
//     };
//   }

//   let user: User = { name: "Alice" };
  
//   // Without optional chaining - might crash!
//   // console.log(user.address.city); // TypeError!

//   // With optional chaining - safe
//   console.log(user.address?.city);      // undefined (no error)
//   console.log(user.address?.zip);       // undefined (no error)
//   console.log(user?.address?.city ?? "No city"); // "No city"

// NON-NULL ASSERTION OPERATOR (!)
// ---------------------------------
//   // Use when YOU know value is not null but TypeScript doesn't
//   function getElement(): string | null {
//     return "hello";
//   }

//   let value = getElement()!; // Tells TypeScript: "Trust me, not null"
//   console.log(value.toUpperCase()); // Safe if you're sure

//   // In DOM:
//   const input = document.getElementById('username')!;
//   input.focus(); // No null error

// REACT IMPLEMENTATION - NULL AND UNDEFINED
// ------------------------------------------
//   // DataFetcher.tsx
//   import React, { useState, useEffect } from 'react';

//   interface Product {
//     id: number;
//     name: string;
//     price: number;
//   }

//   const DataFetcher: React.FC = () => {
//     const [product, setProduct] = useState<Product | null>(null);
//     const [error, setError] = useState<string | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);

//     useEffect(() => {
//       // Simulated fetch
//       setTimeout(() => {
//         setProduct({ id: 1, name: "Laptop", price: 999 });
//         setLoading(false);
//       }, 1000);
//     }, []);

//     if (loading) return <p>Loading...</p>;
//     if (error !== null) return <p>Error: {error}</p>;
//     if (product === null) return <p>No product found</p>;

//     return (
//       <div>
//         <h2>{product.name}</h2>
//         <p>Price: ${product.price}</p>
//       </div>
//     );
//   };

//   export default DataFetcher;

// INTERVIEW QUESTIONS - LECTURE 4:
// ---------------------------------
// Q1: What is the difference between null and undefined in TypeScript?
// A: undefined means a variable has been declared but not assigned a value.
//    null is an explicit assignment meaning "no value". In TypeScript with
//    strictNullChecks, both must be handled explicitly.

// Q2: What is the nullish coalescing operator (??) and how is it different from ||?
// A: ?? returns the right side only when left side is null or undefined.
//    || returns the right side for ANY falsy value (0, "", false, null, undefined).
//    Example: 0 ?? "default" = 0, but 0 || "default" = "default"

// Q3: What is optional chaining (?.) in TypeScript?
// A: Optional chaining allows safely accessing nested properties that might be
//    null or undefined. Instead of crashing, it returns undefined if any part
//    of the chain is null/undefined. e.g., user?.address?.city

// Q4: When should you use the non-null assertion operator (!)?
// A: Use it sparingly when you are certain a value is not null/undefined but
//    TypeScript cannot determine this. It's better to use type guards or
//    conditional checks. Overusing ! defeats the purpose of TypeScript's
//    null safety.

// ================================================================================

// LECTURE 5: BIGINT DATA TYPE
// ============================

// WHAT IS BIGINT?
// ---------------
// BigInt is a numeric type for integers of arbitrary size - beyond the safe
// integer limit of the 'number' type.

// Number max safe integer: 2^53 - 1 = 9,007,199,254,740,991

//   console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991

// CREATING BIGINT VALUES
// -----------------------
//   // Two ways to create BigInt:
//   let big1: bigint = 9007199254740991n;  // Append 'n'
//   let big2: bigint = BigInt(9007199254740991); // BigInt() function

//   // Large numbers that exceed number type:
//   let hugeNumber: bigint = 123456789012345678901234567890n;
//   console.log(hugeNumber); // 123456789012345678901234567890n

// BIGINT OPERATIONS
// -----------------
//   let a: bigint = 100n;
//   let b: bigint = 30n;

//   console.log(a + b);   // 130n
//   console.log(a - b);   // 70n
//   console.log(a * b);   // 3000n
//   console.log(a / b);   // 3n (integer division, no decimals)
//   console.log(a % b);   // 10n
//   console.log(a ** b);  // Very large number

// BIGINT LIMITATIONS
// ------------------
//   // CANNOT mix number and bigint
//   let num: number = 10;
//   let big: bigint = 10n;
  
//   // let result = num + big; // ERROR!
  
//   // Must convert:
//   let result1: bigint = BigInt(num) + big;  // 20n
//   let result2: number = num + Number(big);  // 20

//   // BigInt cannot be used with Math object
//   // Math.max(10n, 20n); // ERROR!

// PRACTICAL USE CASES
// -------------------
//   // Database IDs (some databases use 64-bit integers)
//   type DatabaseId = bigint;

//   function createId(): bigint {
//     return BigInt(Date.now()) * 1000n + BigInt(Math.floor(Math.random() * 1000));
//   }

//   // Cryptocurrency amounts (avoid floating point errors)
//   function addCryptoAmounts(a: bigint, b: bigint): bigint {
//     return a + b;
//   }

//   let balance: bigint = 1000000000000000000n; // 1 ETH in wei
//   let payment: bigint = 500000000000000000n;  // 0.5 ETH in wei
//   let remaining: bigint = balance - payment;
//   console.log(remaining); // 500000000000000000n

// REACT IMPLEMENTATION - BIGINT
// -------------------------------
//   // LargeNumberDisplay.tsx
//   import React, { useState } from 'react';

//   const LargeNumberCalculator: React.FC = () => {
//     const [result, setResult] = useState<string>('0');

//     const calculate = (): void => {
//       const a: bigint = 9007199254740991n; // MAX_SAFE_INTEGER
//       const b: bigint = 9007199254740991n;
//       const sum: bigint = a + b;
//       setResult(sum.toString()); // Convert to string for display
//     };

//     return (
//       <div>
//         <h2>BigInt Calculator</h2>
//         <button onClick={calculate}>Calculate MAX_SAFE_INTEGER * 2</button>
//         <p>Result: {result}</p>
//         <p>Note: Regular number would give: {Number.MAX_SAFE_INTEGER + Number.MAX_SAFE_INTEGER}</p>
//       </div>
//     );
//   };

//   export default LargeNumberCalculator;

// INTERVIEW QUESTIONS - LECTURE 5:
// ---------------------------------
// Q1: When would you use bigint over number?
// A: Use bigint when dealing with integers larger than Number.MAX_SAFE_INTEGER
//    (9,007,199,254,740,991). Common cases: database 64-bit IDs, cryptocurrency
//    amounts, large scientific calculations, precise integer arithmetic.

// Q2: Can you use bigint with regular number operators?
// A: You can use standard arithmetic operators (+, -, *, /, %, **) but ONLY
//    between bigint values. Mixing bigint and number throws a TypeError.
//    You must explicitly convert using BigInt() or Number().

// Q3: Does BigInt support decimal values?
// A: No. BigInt is integers only. Division truncates the decimal part.
//    For decimal precision, use 'number' type or a decimal library.

// ================================================================================

// LECTURE 6: SYMBOL DATA TYPE
// ============================

// WHAT IS SYMBOL?
// ---------------
// Symbol is a primitive type that creates unique, immutable identifiers.
// Every Symbol() call creates a guaranteed unique value.

// CREATING SYMBOLS
// ----------------
//   let sym1: symbol = Symbol();
//   let sym2: symbol = Symbol();
//   let sym3: symbol = Symbol("description");
//   let sym4: symbol = Symbol("description");

//   console.log(sym1 === sym2); // false - always unique!
//   console.log(sym3 === sym4); // false - description doesn't affect uniqueness
//   console.log(sym3.toString()); // "Symbol(description)"
//   console.log(sym3.description); // "description"

// SYMBOLS AS OBJECT KEYS
// -----------------------
//   const ID = Symbol("id");
//   const NAME = Symbol("name");

//   let user = {
//     [ID]: 12345,      // Symbol as key
//     [NAME]: "Alice",  // Symbol as key
//     role: "admin"     // Regular string key
//   };

//   console.log(user[ID]);    // 12345
//   console.log(user[NAME]);  // "Alice"
//   console.log(user.role);   // "admin"

//   // Symbols are NOT included in normal object iteration
//   console.log(Object.keys(user));   // ["role"] - ID and NAME not here!
//   console.log(Object.getOwnPropertySymbols(user)); // [Symbol(id), Symbol(name)]

// UNIQUE_SYMBOL TYPE
// ------------------
//   // const creates "unique symbol" type - more specific
//   const sym: unique symbol = Symbol("mySymbol");
  
//   // Cannot assign one unique symbol to another:
//   // const sym2: typeof sym = Symbol(); // ERROR

// WELL-KNOWN SYMBOLS
// ------------------
//   // Built-in symbols that customize object behavior
//   class MyArray {
//     [Symbol.iterator]() {
//       let index = 0;
//       const data = [1, 2, 3];
//       return {
//         next() {
//           return index < data.length
//             ? { value: data[index++], done: false }
//             : { value: undefined, done: true };
//         }
//       };
//     }
//   }

//   const arr = new MyArray();
//   for (const val of arr) {
//     console.log(val); // 1, 2, 3
//   }

// PRACTICAL USE CASE - PRIVATE-LIKE KEYS
// ----------------------------------------
//   const _privateMethod = Symbol("privateMethod");

//   class BankAccount {
//     private balance: number;
    
//     constructor(initialBalance: number) {
//       this.balance = initialBalance;
//     }

//     // Symbol-keyed method (extra layer of privacy)
//     [_privateMethod](): string {
//       return `Balance: ${this.balance}`;
//     }

//     getInfo(): string {
//       return this[_privateMethod]();
//     }
//   }

//   const account = new BankAccount(1000);
//   console.log(account.getInfo()); // "Balance: 1000"

// REACT IMPLEMENTATION - SYMBOL
// -------------------------------
//   // Using Symbol for unique action types (like in Redux)
//   // actionTypes.ts
//   export const INCREMENT = Symbol('INCREMENT');
//   export const DECREMENT = Symbol('DECREMENT');
//   export const RESET = Symbol('RESET');

//   // reducer.ts
//   type Action = 
//     | { type: typeof INCREMENT }
//     | { type: typeof DECREMENT }
//     | { type: typeof RESET };

//   function counterReducer(state: number, action: Action): number {
//     switch(action.type) {
//       case INCREMENT: return state + 1;
//       case DECREMENT: return state - 1;
//       case RESET: return 0;
//       default: return state;
//     }
//   }

//   // SymbolCounter.tsx
//   import React, { useReducer } from 'react';

//   const SymbolCounter: React.FC = () => {
//     const [count, dispatch] = useReducer(counterReducer, 0);

//     return (
//       <div>
//         <h2>Count: {count}</h2>
//         <button onClick={() => dispatch({ type: INCREMENT })}>+</button>
//         <button onClick={() => dispatch({ type: DECREMENT })}>-</button>
//         <button onClick={() => dispatch({ type: RESET })}>Reset</button>
//       </div>
//     );
//   };

//   export default SymbolCounter;

// INTERVIEW QUESTIONS - LECTURE 6:
// ---------------------------------
// Q1: What is a Symbol and why is it useful?
// A: Symbol creates a unique, immutable identifier. No two symbols are ever equal.
//    Useful as unique object property keys to avoid naming collisions, for
//    well-known symbols (Symbol.iterator, Symbol.hasInstance), and for
//    creating truly private-like properties.

// Q2: How is Symbol different from a string as an object key?
// A: String keys can collide (two libraries might use the same string key).
//    Symbol keys are always unique and don't appear in for...in loops or
//    Object.keys(). They require Object.getOwnPropertySymbols() to access.

// Q3: What is Symbol.for() and how does it differ from Symbol()?
// A: Symbol() always creates a new unique symbol.
//    Symbol.for(key) checks a global registry - if a symbol with that key exists,
//    it returns it; otherwise creates one. So Symbol.for('app') === Symbol.for('app')
//    is TRUE, but Symbol('app') === Symbol('app') is FALSE.

// ================================================================================
// END OF CHAPTER 2
// ================================================================================