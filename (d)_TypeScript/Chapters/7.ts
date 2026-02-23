// ================================================================================
//            TYPESCRIPT COMPLETE COURSE - CHAPTER 7: ADVANCED CONCEPTS
// ================================================================================

// LECTURE 1: GENERICS
// ====================

// WHAT ARE GENERICS?
// ------------------
// Generics allow you to write reusable code that works with different types
// while still maintaining type safety. Think of them as "type variables."

// BASIC GENERIC FUNCTION
// -----------------------
//   // Without generics - loses type info
//   function identity(value: any): any {
//     return value; // any - no type safety!
//   }

//   // With generics - maintains type info
//   function identity<T>(value: T): T {
//     return value; // TypeScript knows exactly what type T is
//   }

//   // TypeScript infers T from the argument
//   let str = identity("hello");   // T is string, returns string
//   let num = identity(42);        // T is number, returns number
//   let bool = identity(true);     // T is boolean, returns boolean

//   // Or explicitly specify T
//   let val = identity<string>("hello"); // Explicit - T is string

// GENERIC FUNCTIONS
// -----------------
//   // Swap two values
//   function swap<T, U>(a: T, b: U): [U, T] {
//     return [b, a];
//   }

//   let result = swap("hello", 42); // [42, "hello"] - [number, string]

//   // First element of array
//   function first<T>(arr: T[]): T | undefined {
//     return arr[0];
//   }

//   let firstNum = first([1, 2, 3]);       // number | undefined
//   let firstStr = first(["a", "b", "c"]); // string | undefined

//   // Filter function
//   function filterArray<T>(arr: T[], predicate: (item: T) => boolean): T[] {
//     return arr.filter(predicate);
//   }

//   let evens = filterArray([1, 2, 3, 4, 5], n => n % 2 === 0); // [2, 4]
//   let longWords = filterArray(["hi", "hello", "hey"], s => s.length > 2); // ["hello"]

// GENERIC INTERFACES
// ------------------
//   interface ApiResponse<T> {
//     data: T;
//     status: number;
//     message: string;
//     timestamp: Date;
//   }

//   interface PaginatedResponse<T> {
//     items: T[];
//     total: number;
//     page: number;
//     perPage: number;
//     totalPages: number;
//   }

//   type UserResponse = ApiResponse<User>;
//   type UsersListResponse = PaginatedResponse<User>;
//   type ProductsResponse = ApiResponse<Product[]>;

//   async function fetchUsers(): Promise<PaginatedResponse<User>> {
//     const response = await fetch("/api/users?page=1&limit=10");
//     return response.json();
//   }

// GENERIC CLASSES
// ---------------
//   class Stack<T> {
//     private items: T[] = [];

//     push(item: T): void {
//       this.items.push(item);
//     }

//     pop(): T | undefined {
//       return this.items.pop();
//     }

//     peek(): T | undefined {
//       return this.items[this.items.length - 1];
//     }

//     get size(): number {
//       return this.items.length;
//     }

//     isEmpty(): boolean {
//       return this.items.length === 0;
//     }
//   }

//   const numberStack = new Stack<number>();
//   numberStack.push(1);
//   numberStack.push(2);
//   numberStack.push(3);
//   console.log(numberStack.pop()); // 3
//   console.log(numberStack.peek()); // 2

//   const stringStack = new Stack<string>();
//   stringStack.push("first");
//   stringStack.push("second");

// GENERIC CONSTRAINTS
// -------------------
//   // extends constraints - T must have certain properties
//   interface HasId {
//     id: number;
//   }

//   function findById<T extends HasId>(items: T[], id: number): T | undefined {
//     return items.find(item => item.id === id);
//   }

//   const users: User[] = [
//     { id: 1, name: "Alice", email: "a@a.com", age: 25 },
//     { id: 2, name: "Bob", email: "b@b.com", age: 30 }
//   ];

//   const user = findById(users, 1); // Returns User | undefined
//   // findById([1, 2, 3], 1); // ERROR! numbers don't have .id

//   // keyof constraint
//   function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
//     return obj[key];
//   }

//   const user2 = { name: "Alice", age: 25 };
//   let name = getProperty(user2, "name"); // string
//   let age = getProperty(user2, "age");   // number
//   // getProperty(user2, "phone");          // ERROR! Not a key

// DEFAULT GENERIC TYPE
// --------------------
//   // Generic with default type
//   interface Container<T = string> {
//     value: T;
//     label: string;
//   }

//   let strContainer: Container = { value: "hello", label: "text" }; // T defaults to string
//   let numContainer: Container<number> = { value: 42, label: "count" };

// REACT IMPLEMENTATION - GENERICS
// ---------------------------------
//   import React, { useState } from 'react';

//   // Generic List component
//   interface ListProps<T> {
//     items: T[];
//     renderItem: (item: T, index: number) => React.ReactNode;
//     keyExtractor: (item: T) => string | number;
//     emptyMessage?: string;
//   }

//   function GenericList<T>({
//     items,
//     renderItem,
//     keyExtractor,
//     emptyMessage = "No items found"
//   }: ListProps<T>) {
//     if (items.length === 0) {
//       return <p>{emptyMessage}</p>;
//     }

//     return (
//       <ul>
//         {items.map((item, index) => (
//           <li key={keyExtractor(item)}>
//             {renderItem(item, index)}
//           </li>
//         ))}
//       </ul>
//     );
//   }

//   // Usage
//   const UserList: React.FC<{ users: User[] }> = ({ users }) => (
//     <GenericList
//       items={users}
//       keyExtractor={user => user.id}
//       renderItem={user => <span>{user.name} - {user.email}</span>}
//       emptyMessage="No users found"
//     />
//   );

//   // Generic useLocalStorage hook
//   function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
//     const [storedValue, setStoredValue] = useState<T>(() => {
//       try {
//         const item = window.localStorage.getItem(key);
//         return item ? JSON.parse(item) : initialValue;
//       } catch {
//         return initialValue;
//       }
//     });

//     const setValue = (value: T): void => {
//       setStoredValue(value);
//       window.localStorage.setItem(key, JSON.stringify(value));
//     };

//     return [storedValue, setValue];
//   }

//   // Usage
//   const [theme, setTheme] = useLocalStorage<string>("theme", "light");
//   const [user, setUser] = useLocalStorage<User | null>("user", null);

// ================================================================================

// LECTURE 2: MODULES
// ===================

// MODULE SYSTEM
// -------------
// TypeScript uses ES Module syntax. Each file is its own module.
// Use export to make things available, import to use them.

// NAMED EXPORTS
// -------------
//   // math.ts
//   export function add(a: number, b: number): number {
//     return a + b;
//   }

//   export function subtract(a: number, b: number): number {
//     return a - b;
//   }

//   export const PI: number = 3.14159;

//   export interface MathConfig {
//     precision: number;
//     rounding: "up" | "down" | "nearest";
//   }

//   // Importing
//   import { add, subtract, PI, MathConfig } from "./math";

// DEFAULT EXPORT
// --------------
//   // logger.ts
//   class Logger {
//     log(message: string): void { console.log(message); }
//     error(message: string): void { console.error(message); }
//   }

//   export default Logger;

//   // Importing default
//   import Logger from "./logger";
//   import MyLogger from "./logger"; // Can use any name for default

// MIXED EXPORTS
// -------------
//   // api.ts
//   export const API_URL: string = "https://api.example.com";

//   export interface RequestOptions {
//     method: "GET" | "POST" | "PUT" | "DELETE";
//     body?: unknown;
//     headers?: Record<string, string>;
//   }

//   async function fetchData<T>(endpoint: string, options?: RequestOptions): Promise<T> {
//     // implementation
//     return {} as T;
//   }

//   export default fetchData;

//   // Importing mixed
//   import fetchData, { API_URL, RequestOptions } from "./api";

// RE-EXPORTING (Barrel exports)
// -------------------------------
//   // index.ts - barrel file
//   export { add, subtract, PI } from "./math";
//   export { default as Logger } from "./logger";
//   export * from "./types";
//   export type { User, Product } from "./types";

//   // Now consumers can import from one place:
//   import { add, Logger, User } from "./utils";

// REACT IMPLEMENTATION - MODULES
// --------------------------------
//   // types/index.ts - all shared types
//   export interface User {
//     id: number;
//     name: string;
//     email: string;
//   }

//   export interface Product {
//     id: number;
//     name: string;
//     price: number;
//   }

//   export type Theme = "light" | "dark";

//   // hooks/useApi.ts
//   import { useState, useEffect } from 'react';

//   export interface ApiState<T> {
//     data: T | null;
//     loading: boolean;
//     error: string | null;
//   }

//   export function useApi<T>(url: string): ApiState<T> {
//     const [state, setState] = useState<ApiState<T>>({
//       data: null, loading: true, error: null
//     });

//     useEffect(() => {
//       fetch(url)
//         .then(r => r.json())
//         .then(data => setState({ data, loading: false, error: null }))
//         .catch(err => setState({ data: null, loading: false, error: err.message }));
//     }, [url]);

//     return state;
//   }

//   // components/UserCard.tsx
//   import React from 'react';
//   import { User } from '../types';

//   export interface UserCardProps {
//     user: User;
//     onClick?: (user: User) => void;
//   }

//   export const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => (
//     <div onClick={() => onClick?.(user)}>
//       <h3>{user.name}</h3>
//       <p>{user.email}</p>
//     </div>
//   );

// ================================================================================

// LECTURE 3: NAMESPACE
// =====================

// WHAT IS NAMESPACE?
// ------------------
// Namespaces organize code into logical groups to avoid naming collisions.
// They're TypeScript's older module system. ES modules are preferred today,
// but namespaces are still used in large declaration files.

// BASIC NAMESPACE
// ---------------
//   namespace Validation {
//     export interface StringValidator {
//       isValid(s: string): boolean;
//     }

//     export class EmailValidator implements StringValidator {
//       isValid(email: string): boolean {
//         return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//       }
//     }

//     export class UrlValidator implements StringValidator {
//       isValid(url: string): boolean {
//         try { new URL(url); return true; }
//         catch { return false; }
//       }
//     }

//     export function validate(value: string, validator: StringValidator): boolean {
//       return validator.isValid(value);
//     }
//   }

//   // Usage - must prefix with namespace name
//   const emailValidator = new Validation.EmailValidator();
//   console.log(Validation.validate("test@test.com", emailValidator)); // true

// NESTED NAMESPACES
// -----------------
//   namespace App {
//     export namespace Models {
//       export interface User {
//         id: number;
//         name: string;
//       }
//     }

//     export namespace Services {
//       export class UserService {
//         getUser(id: number): App.Models.User {
//           return { id, name: "Alice" };
//         }
//       }
//     }

//     export namespace Utils {
//       export function formatUser(user: Models.User): string {
//         return `User #${user.id}: ${user.name}`;
//       }
//     }
//   }

//   const service = new App.Services.UserService();
//   const user = service.getUser(1);
//   console.log(App.Utils.formatUser(user)); // "User #1: Alice"

// ================================================================================

// LECTURE 4: DECORATORS
// ======================

// SETUP FOR DECORATORS
// ---------------------
//   // In tsconfig.json, enable:
//   {
//     "compilerOptions": {
//       "experimentalDecorators": true,
//       "emitDecoratorMetadata": true
//     }
//   }

// WHAT ARE DECORATORS?
// --------------------
// Decorators are special functions that add metadata or modify classes,
// methods, properties, and parameters at design time.

// CLASS DECORATOR
// ---------------
//   // Class decorator - receives the constructor
//   function Sealed(constructor: Function): void {
//     Object.seal(constructor);
//     Object.seal(constructor.prototype);
//   }

//   function Singleton<T extends { new(...args: any[]): {} }>(constructor: T) {
//     let instance: T;
//     return class extends constructor {
//       constructor(...args: any[]) {
//         if (instance) return instance;
//         super(...args);
//         instance = this as any;
//       }
//     };
//   }

//   @Singleton
//   class ConfigService {
//     constructor(public env: string) {
//       console.log(`ConfigService created for ${env}`);
//     }
//   }

//   const config1 = new ConfigService("production"); // Created
//   const config2 = new ConfigService("development"); // Returns same instance
//   console.log(config1 === config2); // true

// METHOD DECORATOR
// ----------------
//   // Method decorator
//   function Log(
//     target: any,
//     propertyKey: string,
//     descriptor: PropertyDescriptor
//   ) {
//     const originalMethod = descriptor.value;
    
//     descriptor.value = function(...args: any[]) {
//       console.log(`Calling ${propertyKey} with:`, args);
//       const result = originalMethod.apply(this, args);
//       console.log(`${propertyKey} returned:`, result);
//       return result;
//     };
    
//     return descriptor;
//   }

//   function Memoize(
//     target: any,
//     propertyKey: string,
//     descriptor: PropertyDescriptor
//   ) {
//     const originalMethod = descriptor.value;
//     const cache = new Map<string, any>();
    
//     descriptor.value = function(...args: any[]) {
//       const key = JSON.stringify(args);
//       if (cache.has(key)) {
//         console.log(`${propertyKey}: Cache hit for`, args);
//         return cache.get(key);
//       }
//       const result = originalMethod.apply(this, args);
//       cache.set(key, result);
//       return result;
//     };
    
//     return descriptor;
//   }

//   class MathService {
//     @Log
//     add(a: number, b: number): number {
//       return a + b;
//     }

//     @Memoize
//     expensiveCalc(n: number): number {
//       console.log(`Computing for ${n}...`);
//       return n ** 2;
//     }
//   }

//   const math = new MathService();
//   math.add(3, 4);           // Logs: Calling add with [3, 4] / add returned 7
//   math.expensiveCalc(5);    // Computing for 5...
//   math.expensiveCalc(5);    // Cache hit! No recomputation

// PROPERTY DECORATOR
// ------------------
//   function Validate(minLength: number) {
//     return function(target: any, propertyKey: string) {
//       let value: string;
      
//       Object.defineProperty(target, propertyKey, {
//         get() { return value; },
//         set(newValue: string) {
//           if (newValue.length < minLength) {
//             throw new Error(`${propertyKey} must be at least ${minLength} chars`);
//           }
//           value = newValue;
//         }
//       });
//     };
//   }

//   class User {
//     @Validate(3)
//     name: string = "";

//     @Validate(8)
//     password: string = "";
//   }

// PARAMETER DECORATOR
// -------------------
//   function Required(target: any, propertyKey: string, parameterIndex: number) {
//     const existingRequired: number[] = 
//       Reflect.getOwnMetadata("required", target, propertyKey) || [];
//     existingRequired.push(parameterIndex);
//     Reflect.defineMetadata("required", existingRequired, target, propertyKey);
//   }

// ================================================================================

// LECTURE 5: OVERRIDE FUNCTIONS WITH DECORATORS
// ===============================================

// TIMING DECORATOR
// ----------------
//   function Timer(
//     target: any,
//     propertyKey: string,
//     descriptor: PropertyDescriptor
//   ): PropertyDescriptor {
//     const original = descriptor.value;
    
//     descriptor.value = async function(...args: any[]) {
//       const start = performance.now();
//       const result = await original.apply(this, args);
//       const end = performance.now();
//       console.log(`${propertyKey} took ${(end - start).toFixed(2)}ms`);
//       return result;
//     };
    
//     return descriptor;
//   }

// RETRY DECORATOR
// ---------------
//   function Retry(attempts: number = 3, delay: number = 1000) {
//     return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//       const original = descriptor.value;
      
//       descriptor.value = async function(...args: any[]) {
//         for (let i = 0; i < attempts; i++) {
//           try {
//             return await original.apply(this, args);
//           } catch (error) {
//             if (i === attempts - 1) throw error;
//             console.log(`Attempt ${i + 1} failed, retrying in ${delay}ms...`);
//             await new Promise(resolve => setTimeout(resolve, delay));
//           }
//         }
//       };
      
//       return descriptor;
//     };
//   }

// AUTHORIZE DECORATOR
// -------------------
//   type Role = "admin" | "user" | "guest";

//   function Authorize(...allowedRoles: Role[]) {
//     return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//       const original = descriptor.value;
      
//       descriptor.value = function(...args: any[]) {
//         const currentRole: Role = "guest"; // Get from auth service
        
//         if (!allowedRoles.includes(currentRole)) {
//           throw new Error(`Access denied. Required: ${allowedRoles.join(", ")}`);
//         }
        
//         return original.apply(this, args);
//       };
      
//       return descriptor;
//     };
//   }

// COMBINED DECORATORS
// -------------------
//   class ApiService {
//     @Timer
//     @Retry(3, 1000)
//     async fetchCriticalData(endpoint: string): Promise<unknown> {
//       const response = await fetch(endpoint);
//       if (!response.ok) throw new Error(`HTTP ${response.status}`);
//       return response.json();
//     }

//     @Authorize("admin")
//     @Log
//     deleteUser(userId: number): void {
//       console.log(`Deleting user ${userId}`);
//     }
//   }

// INTERVIEW QUESTIONS - CHAPTER 7:
// ----------------------------------
// Q1: What are generics in TypeScript and why are they useful?
// A: Generics allow writing reusable code that works with multiple types while
//    preserving type safety. Instead of using 'any', generics use type parameters
//    (T) that are filled in when the function/class/interface is used. They provide
//    the flexibility of 'any' without losing type information.

// Q2: What is the difference between Generics and 'any'?
// A: 'any' disables type checking entirely - you lose all type info.
//    Generics preserve type relationships - if input is T, output is also T.
//    identity<T>(x: T): T guarantees input and output types match.
//    identity(x: any): any does not.

// Q3: What is a Decorator in TypeScript?
// A: Decorators are functions that can modify/annotate classes, methods, properties,
//    and parameters. They use @decoratorName syntax and run at class definition
//    time. Common uses: logging, caching, authorization, validation.

// Q4: What is the difference between namespace and module?
// A: Namespaces: TypeScript's internal module system, uses namespace keyword,
//    good for organizing global code. Modules: ES6 module system with import/export,
//    each file is a module, preferred for modern projects. Namespaces are often
//    used in .d.ts declaration files.

// ================================================================================
// CHAPTER 8: BEST PRACTICES IN TYPESCRIPT
// ================================================================================

// LECTURE 1: BEST PRACTICES IN TYPESCRIPT
// =========================================

// 1. ALWAYS ENABLE STRICT MODE
// -----------------------------
//   // tsconfig.json
//   {
//     "compilerOptions": {
//       "strict": true  // ALWAYS enable this
//     }
//   }

//   // strict enables:
//   // - strictNullChecks: no implicit null/undefined
//   // - noImplicitAny: no implicit any types
//   // - strictFunctionTypes: strict function type checking
//   // - strictBindCallApply: strict bind, call, apply
//   // - strictPropertyInitialization: class properties must be initialized

// 2. PREFER INTERFACES FOR OBJECT SHAPES, TYPE FOR EVERYTHING ELSE
// -----------------------------------------------------------------
//   // Prefer interface for objects (especially when extending is possible)
//   interface User {
//     id: number;
//     name: string;
//   }

//   interface AdminUser extends User {
//     role: "admin";
//     permissions: string[];
//   }

//   // Use type for unions, tuples, primitives
//   type Status = "active" | "inactive";
//   type Coordinates = [number, number];
//   type ID = string | number;

// 3. AVOID 'any' - USE 'unknown' INSTEAD
// ----------------------------------------
//   // BAD
//   function processInput(data: any): void {
//     data.doSomething(); // No safety!
//   }

//   // GOOD
//   function processInput(data: unknown): void {
//     if (typeof data === "string") {
//       data.toUpperCase(); // Safe after narrowing
//     }
//   }

// 4. USE CONST ASSERTIONS FOR LITERAL TYPES
// ------------------------------------------
//   // Without const - TypeScript widens the types
//   const config = {
//     env: "production",
//     port: 3000
//   };
//   // config.env type is string (not "production")

//   // With const assertion - exact literal types
//   const config2 = {
//     env: "production",
//     port: 3000
//   } as const;
//   // config2.env type is "production" (not string)
//   // config2.port type is 3000 (not number)
//   // All properties are readonly!

// 5. USE DISCRIMINATED UNIONS FOR COMPLEX STATE
// ---------------------------------------------
//   // BAD - ambiguous, hard to know which fields are valid
//   interface State {
//     loading?: boolean;
//     data?: User[];
//     error?: string;
//   }

//   // GOOD - clear, each case is independent
//   type State =
//     | { status: "idle" }
//     | { status: "loading" }
//     | { status: "success"; data: User[] }
//     | { status: "error"; error: string };

//   // Now TypeScript ensures correct field access for each case
//   function render(state: State): string {
//     switch (state.status) {
//       case "idle": return "Ready";
//       case "loading": return "Loading...";
//       case "success": return `Found ${state.data.length} users`;
//       case "error": return `Error: ${state.error}`;
//     }
//   }

// 6. USE UTILITY TYPES INSTEAD OF DUPLICATING
// --------------------------------------------
//   // BAD - manually duplicating types
//   interface CreateUserDTO {
//     name: string;      // Duplicate
//     email: string;     // Duplicate
//     age: number;       // Duplicate
//   }

//   interface UpdateUserDTO {
//     name?: string;     // Duplicate
//     email?: string;    // Duplicate
//     age?: number;      // Duplicate
//   }

//   // GOOD - derive from the source of truth
//   interface User {
//     id: number;
//     name: string;
//     email: string;
//     age: number;
//   }

//   type CreateUserDTO = Omit<User, "id">;
//   type UpdateUserDTO = Partial<Omit<User, "id">>;

// 7. MAKE IMPOSSIBLE STATES IMPOSSIBLE
// --------------------------------------
//   // BAD - can be in impossible state (loading and error both true)
//   interface FetchState {
//     loading: boolean;
//     error: boolean;
//     data: any;
//   }

//   // GOOD - only valid states are representable
//   type FetchState<T> =
//     | { status: "idle" }
//     | { status: "loading" }
//     | { status: "success"; data: T }
//     | { status: "error"; error: Error };

// 8. USE READONLY FOR IMMUTABILITY
// ----------------------------------
//   // Function params that shouldn't be modified
//   function processUsers(users: readonly User[]): void {
//     // users.push(...) // ERROR! Cannot modify readonly array
//     const result = users.filter(u => u.age > 18); // OK - creates new array
//   }

//   // Readonly objects
//   type Config = Readonly<{
//     host: string;
//     port: number;
//   }>;

// 9. NAMED EXPORTS OVER DEFAULT EXPORTS
// --------------------------------------
//   // BAD - default export (can be imported with any name)
//   export default function Button() {}
//   // Can be imported as: import Btn from './Button' (confusing)

//   // GOOD - named export (always imported with same name)
//   export function Button() {}
//   // Must be imported as: import { Button } from './Button'
//   // Better for autocomplete and refactoring

// 10. USE TYPE PREDICATES FOR COMPLEX NARROWING
// ----------------------------------------------
//   interface Cat { meow(): void; }
//   interface Dog { bark(): void; }

//   // Type predicate
//   function isCat(pet: Cat | Dog): pet is Cat {
//     return (pet as Cat).meow !== undefined;
//   }

//   function handlePet(pet: Cat | Dog): void {
//     if (isCat(pet)) {
//       pet.meow(); // TypeScript knows it's Cat
//     } else {
//       pet.bark(); // TypeScript knows it's Dog
//     }
//   }

// 11. TEMPLATE LITERAL TYPES (TypeScript 4.1+)
// ---------------------------------------------
//   type EventName = "click" | "focus" | "blur";
//   type Handler = `on${Capitalize<EventName>}`; // "onClick" | "onFocus" | "onBlur"

//   type CSSProperty = "margin" | "padding";
//   type CSSDirection = "top" | "right" | "bottom" | "left";
//   type CSSValue = `${CSSProperty}-${CSSDirection}`;
//   // "margin-top" | "margin-right" | ... | "padding-left"

// 12. SATISFIES OPERATOR (TypeScript 4.9+)
// -----------------------------------------
//   type Colors = "red" | "green" | "blue";
//   type ColorMap = Record<Colors, string>;

//   // 'satisfies' checks type but keeps the more specific inferred type
//   const palette = {
//     red: "#FF0000",
//     green: "#00FF00",
//     blue: "#0000FF"
//   } satisfies ColorMap;

//   // Now palette.red is "string" NOT ColorMap["red"]
//   palette.red.toUpperCase(); // OK! TypeScript knows it's a string

// REACT BEST PRACTICES
// ---------------------

//   // 1. Type component props explicitly
//   interface ButtonProps {
//     label: string;
//     onClick: () => void;
//     variant?: "primary" | "secondary";
//     disabled?: boolean;
//   }

//   // 2. Prefer React.FC with explicit props
//   const Button: React.FC<ButtonProps> = ({ label, onClick, variant = "primary", disabled = false }) => (
//     <button onClick={onClick} disabled={disabled} className={variant}>
//       {label}
//     </button>
//   );

//   // 3. Type useState properly
//   const [users, setUsers] = useState<User[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

//   // 4. Type refs properly
//   const inputRef = useRef<HTMLInputElement>(null);
//   const timerRef = useRef<NodeJS.Timeout | null>(null);

//   // 5. Type event handlers
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//     setValue(e.target.value);
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
//     e.preventDefault();
//   };

//   // 6. Create typed context
//   interface ThemeContextType {
//     theme: "light" | "dark";
//     toggleTheme: () => void;
//   }

//   const ThemeContext = React.createContext<ThemeContextType>({
//     theme: "light",
//     toggleTheme: () => {}
//   });

//   // 7. Type useReducer properly
//   type Action =
//     | { type: "INCREMENT" }
//     | { type: "DECREMENT" }
//     | { type: "SET"; payload: number };

//   function reducer(state: number, action: Action): number {
//     switch (action.type) {
//       case "INCREMENT": return state + 1;
//       case "DECREMENT": return state - 1;
//       case "SET": return action.payload;
//       default:
//         const _exhaustive: never = action;
//         return state;
//     }
//   }

// TOP 20 TYPESCRIPT INTERVIEW QUESTIONS
// ---------------------------------------

// Q1: What is TypeScript and how does it differ from JavaScript?
// A: TypeScript is a statically typed superset of JavaScript that compiles to JS.
//    Adds: type annotations, interfaces, generics, enums, decorators, access
//    modifiers. JS is dynamically typed (runtime errors), TS catches errors at
//    compile time. TS = JavaScript + Types + Modern features.

// Q2: What is the difference between 'interface' and 'type' in TypeScript?
// A: Interface: object shapes only, supports declaration merging, uses 'extends'.
//    Type: any type (primitives, unions, tuples, intersections), no merging.
//    Both can define object shapes - prefer interface for extendable APIs.

// Q3: What is 'never' type?
// A: 'never' represents values that never occur. Used for functions that never
//    return (always throw), and for exhaustive checks in unions.

// Q4: What is the difference between 'any' and 'unknown'?
// A: 'any': opt out of type checking - can do anything with it.
//    'unknown': type-safe version - must narrow type before using.
//    Always prefer 'unknown' over 'any'.

// Q5: What are generics?
// A: Type parameters that allow writing reusable, type-safe code for multiple types.
//    function identity<T>(x: T): T - T is filled in at usage site.

// Q6: What are decorators?
// A: Functions that modify classes, methods, properties, parameters at design time.
//    Uses @decorator syntax. Require experimentalDecorators in tsconfig.

// Q7: What is 'keyof'?
// A: Produces a union of all keys of a type: keyof User = "id" | "name" | "email"

// Q8: What are utility types?
// A: Built-in TypeScript types: Partial, Required, Readonly, Pick, Omit, Record,
//    Exclude, Extract, NonNullable, ReturnType, Parameters, Awaited.

// Q9: What is type narrowing?
// A: Refining a broad type to a specific type within a code block using:
//    typeof, instanceof, in operator, equality checks, custom type guards.

// Q10: What are discriminated unions?
// A: Union types with a shared literal property (discriminant) used to narrow types.
//    type Shape = Circle | Rectangle where each has kind: "circle" | "rectangle".

// Q11: What is structural typing?
// A: TypeScript uses structural typing (duck typing) - types are compatible if their
//    structures are compatible, not based on explicit declarations.
//    { name: string } is compatible with { name: string; age?: number }

// Q12: What is declaration merging?
// A: When two interfaces with the same name are merged into one by TypeScript.
//    Useful for extending third-party types. Not available with type aliases.

// Q13: What is the difference between type assertion and type casting?
// A: TypeScript doesn't have runtime casting. Type assertion (as Type or <Type>)
//    tells TypeScript what type you believe a value is - no runtime transformation.

// Q14: What is 'satisfies' operator?
// A: TypeScript 4.9+ operator that validates a value against a type while keeping
//    the more specific inferred type (unlike 'as' which loses specificity).

// Q15: What is 'infer' keyword?
// A: Used in conditional types to infer type variables from the matched type.
//    type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

// Q16: What are mapped types?
// A: Types that transform each property of another type:
//    type Readonly<T> = { readonly [K in keyof T]: T[K] }

// Q17: What is the difference between 'extends' in generics vs interface?
// A: Interface extends: inherits properties from another interface.
//    Generic extends: constrains the generic type parameter (T extends HasId).

// Q18: What are ambient declarations?
// A: Declarations (.d.ts files) that describe types for JavaScript code that
//    TypeScript doesn't compile (like third-party libraries). declare keyword.

// Q19: What is the noImplicitAny flag?
// A: Compiler option that errors when TypeScript cannot infer a type and would
//    default to 'any'. Forces explicit type annotations.

// Q20: What are template literal types?
// A: Types that use template literal syntax to combine string types:
//    type Route = `/api/${string}` or type Handler = `on${Capitalize<Events>}`

// ================================================================================
// END OF CHAPTER 7 & 8 - COMPLETE COURSE
// ================================================================================