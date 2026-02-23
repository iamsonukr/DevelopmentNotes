// ================================================================================
//            TYPESCRIPT COMPLETE COURSE - CHAPTER 4: ADVANCED TYPE SYSTEM
// ================================================================================

// LECTURE 1: INTERFACE IN TYPESCRIPT
// =====================================

// WHAT IS AN INTERFACE?
// ---------------------
// An interface defines the shape (structure) of an object. It's a contract
// that objects must follow - listing what properties and methods they should have.

// BASIC INTERFACE
// ---------------
//   interface User {
//     id: number;
//     name: string;
//     email: string;
//     age: number;
//   }

//   let user: User = {
//     id: 1,
//     name: "Alice",
//     email: "alice@email.com",
//     age: 25
//   };

//   // Missing property - TypeScript error
//   // let user2: User = { id: 2, name: "Bob" }; // ERROR!

// OPTIONAL AND READONLY PROPERTIES
// ----------------------------------
//   interface Product {
//     readonly id: number;    // Cannot change after creation
//     name: string;
//     price: number;
//     description?: string;   // Optional
//     category?: string;      // Optional
//   }

//   let laptop: Product = {
//     id: 1,
//     name: "Laptop",
//     price: 999
//   };

//   // laptop.id = 2; // ERROR! id is readonly

// METHOD SIGNATURES IN INTERFACE
// -------------------------------
//   interface Calculator {
//     add(a: number, b: number): number;
//     subtract(a: number, b: number): number;
//     multiply: (a: number, b: number) => number; // Alternative syntax
//   }

//   const calc: Calculator = {
//     add(a, b) { return a + b; },
//     subtract(a, b) { return a - b; },
//     multiply: (a, b) => a * b
//   };

// INTERFACE EXTENSION (INHERITANCE)
// -----------------------------------
//   interface Animal {
//     name: string;
//     age: number;
//   }

//   interface Dog extends Animal {
//     breed: string;
//     bark(): void;
//   }

//   interface ServiceDog extends Dog {
//     trained: boolean;
//     service: string;
//   }

//   const myDog: ServiceDog = {
//     name: "Rex",
//     age: 3,
//     breed: "German Shepherd",
//     bark() { console.log("Woof!"); },
//     trained: true,
//     service: "Guide"
//   };

// EXTENDING MULTIPLE INTERFACES
// ------------------------------
//   interface Flyable {
//     fly(): void;
//     maxAltitude: number;
//   }

//   interface Swimmable {
//     swim(): void;
//     maxDepth: number;
//   }

//   interface Duck extends Flyable, Swimmable {
//     quack(): void;
//   }

// INTERFACE DECLARATION MERGING
// -------------------------------
//   // Interfaces with the same name get merged automatically
//   interface User {
//     id: number;
//     name: string;
//   }

//   interface User {
//     email: string;  // Gets merged with above!
//   }

//   // Now User has: id, name, email
//   const user: User = {
//     id: 1,
//     name: "Alice",
//     email: "alice@email.com"
//   };

//   // Note: Type aliases CANNOT be merged like this!

// FUNCTION INTERFACE
// ------------------
//   interface StringTransformer {
//     (input: string): string;
//   }

//   const toUpper: StringTransformer = (s) => s.toUpperCase();
//   const toLower: StringTransformer = (s) => s.toLowerCase();

// INDEXABLE INTERFACE
// -------------------
//   interface StringMap {
//     [key: string]: string;
//   }

//   let colorMap: StringMap = {
//     primary: "blue",
//     secondary: "green",
//     accent: "red"
//   };

// REACT IMPLEMENTATION - INTERFACES
// -----------------------------------
//   // Comprehensive React interface examples
//   import React, { useState } from 'react';

//   // Props interface
//   interface ButtonProps {
//     label: string;
//     onClick: () => void;
//     variant?: "primary" | "secondary" | "danger";
//     size?: "small" | "medium" | "large";
//     disabled?: boolean;
//     icon?: React.ReactNode;
//   }

//   // Component using interface
//   const Button: React.FC<ButtonProps> = ({
//     label,
//     onClick,
//     variant = "primary",
//     size = "medium",
//     disabled = false,
//     icon
//   }) => {
//     return (
//       <button
//         onClick={onClick}
//         disabled={disabled}
//         className={`btn btn-${variant} btn-${size}`}
//       >
//         {icon && <span className="icon">{icon}</span>}
//         {label}
//       </button>
//     );
//   };

//   // State interface
//   interface FormState {
//     username: string;
//     email: string;
//     password: string;
//     confirmPassword: string;
//     errors: Partial<Record<keyof FormState, string>>;
//   }

//   // Context interface
//   interface AuthContextType {
//     user: User | null;
//     login: (email: string, password: string) => Promise<void>;
//     logout: () => void;
//     isAuthenticated: boolean;
//   }

// INTERVIEW QUESTIONS - LECTURE 1:
// ---------------------------------
// Q1: What is an interface in TypeScript?
// A: An interface defines the structure/shape that an object must conform to. It's
//    a compile-time contract specifying what properties and methods an object must
//    have. Interfaces are erased at runtime - they're purely for type checking.

// Q2: What is the difference between interface and type alias?
// A: Interfaces: can be extended (extends), support declaration merging (same-name
//    interfaces merge), preferred for object shapes and class contracts.
//    Type aliases: can represent any type (unions, primitives, tuples, intersections),
//    no merging. For object shapes, they're largely interchangeable. Microsoft
//    recommends interfaces for public APIs.

// Q3: Can interfaces have methods?
// A: Yes. Interfaces can declare method signatures: methodName(param: type): returnType
//    Classes or objects implementing the interface must provide the implementation.

// Q4: What is declaration merging?
// A: If you declare two interfaces with the same name, TypeScript merges them into
//    one. This is useful for extending third-party types (like augmenting Window object).
//    Type aliases do not support merging.

// ================================================================================

// LECTURE 2: TYPE ALIAS IN TYPESCRIPT
// =====================================

// WHAT IS A TYPE ALIAS?
// ---------------------
// A type alias creates a new name for an existing type. Unlike interfaces,
// type aliases can represent ANY type - not just objects.

// BASIC TYPE ALIAS
// ----------------
//   type UserId = number;
//   type UserName = string;
//   type IsActive = boolean;

//   // Now use them
//   let id: UserId = 1;
//   let name: UserName = "Alice";
//   let active: IsActive = true;

// OBJECT TYPE ALIAS
// -----------------
//   type User = {
//     id: number;
//     name: string;
//     email: string;
//   };

//   type Point = {
//     x: number;
//     y: number;
//   };

//   let user: User = { id: 1, name: "Alice", email: "a@a.com" };
//   let point: Point = { x: 10, y: 20 };

// UNION TYPE ALIAS
// ----------------
//   type StringOrNumber = string | number;
//   type ID = string | number;
//   type Status = "active" | "inactive" | "pending";
//   type NullableString = string | null;

//   let userId: ID = 123;
//   userId = "abc"; // also valid

// INTERSECTION TYPE ALIAS
// ------------------------
//   type Admin = User & {
//     role: "admin";
//     permissions: string[];
//   };

// TUPLE TYPE ALIAS
// ----------------
//   type Coordinate = [number, number];
//   type NameAge = [string, number];
//   type RGB = [number, number, number];

//   let position: Coordinate = [10.5, 20.8];
//   let person: NameAge = ["Alice", 25];
//   let color: RGB = [255, 128, 0];

// FUNCTION TYPE ALIAS
// -------------------
//   type Predicate<T> = (value: T) => boolean;
//   type Transformer<T, U> = (input: T) => U;
//   type EventHandler = (event: Event) => void;

//   const isEven: Predicate<number> = (n) => n % 2 === 0;
//   const toString: Transformer<number, string> = (n) => n.toString();

// RECURSIVE TYPE ALIAS
// --------------------
//   // Types can reference themselves!
//   type TreeNode = {
//     value: number;
//     left?: TreeNode;  // recursive!
//     right?: TreeNode; // recursive!
//   };

//   type NestedArray<T> = T | NestedArray<T>[];
//   type JSONValue = string | number | boolean | null | JSONValue[] | { [key: string]: JSONValue };

// EXTENDING TYPE ALIAS (Intersection)
// -------------------------------------
//   type Animal = {
//     name: string;
//     age: number;
//   };

//   // "Extend" using intersection (&)
//   type Dog = Animal & {
//     breed: string;
//   };

//   // Compare: interface uses 'extends' keyword
//   // interface Dog extends Animal { breed: string; }

// REACT IMPLEMENTATION - TYPE ALIAS
// -----------------------------------
//   // Theme types
//   type Theme = "light" | "dark" | "high-contrast";
//   type FontSize = "small" | "medium" | "large";

//   type ThemeConfig = {
//     theme: Theme;
//     fontSize: FontSize;
//     reducedMotion: boolean;
//   };

//   // API types
//   type ApiStatus = "idle" | "loading" | "success" | "error";

//   type ApiState<T> = {
//     status: ApiStatus;
//     data: T | null;
//     error: string | null;
//   };

//   // Usage
//   type UserApiState = ApiState<User>;
//   type ProductsApiState = ApiState<Product[]>;

//   // Event types
//   type ClickHandler = React.MouseEventHandler<HTMLButtonElement>;
//   type ChangeHandler = React.ChangeEventHandler<HTMLInputElement>;
//   type SubmitHandler = React.FormEventHandler<HTMLFormElement>;

// INTERVIEW QUESTIONS - LECTURE 2:
// ---------------------------------
// Q1: When would you use type alias vs interface?
// A: Use type alias for: unions, tuples, primitives, function types, complex
//    compositions, utility types. Use interface for: object shapes that might be
//    extended, class implementations, library public APIs. In practice, both work
//    for object types - pick a style and be consistent.

// Q2: Can type aliases be extended?
// A: Not with the 'extends' keyword. Instead, use intersection types (&):
//    type Admin = User & { role: string }. This creates a new type that has
//    all properties of both. Interfaces use 'extends' more cleanly.

// Q3: What can type aliases represent that interfaces cannot?
// A: Type aliases can represent any type: primitives (type ID = string),
//    unions (type Status = "a" | "b"), tuples (type Pair = [string, number]),
//    and intersections. Interfaces can only represent object shapes.

// ================================================================================

// LECTURE 3: INTERSECTION TYPES
// ================================

// WHAT IS INTERSECTION TYPE?
// ---------------------------
// Intersection types combine multiple types into one. A value of an intersection
// type must satisfy ALL of the combined types.

// BASIC INTERSECTION
// ------------------
//   type A = { a: string };
//   type B = { b: number };
//   type C = A & B; // Must have both 'a' (string) and 'b' (number)

//   let value: C = { a: "hello", b: 42 }; // OK
//   // let value2: C = { a: "hello" }; // ERROR! Missing 'b'

// COMBINING INTERFACES
// --------------------
//   interface Name {
//     firstName: string;
//     lastName: string;
//   }

//   interface Contact {
//     email: string;
//     phone?: string;
//   }

//   interface Address {
//     street: string;
//     city: string;
//     country: string;
//   }

//   type Person = Name & Contact & Address;

//   const person: Person = {
//     firstName: "Alice",
//     lastName: "Smith",
//     email: "alice@email.com",
//     street: "123 Main St",
//     city: "New York",
//     country: "USA"
//   };

// ROLE-BASED TYPES
// ----------------
//   type BaseUser = {
//     id: number;
//     name: string;
//     email: string;
//   };

//   type AdminRole = {
//     role: "admin";
//     permissions: string[];
//     canDeleteUsers: boolean;
//   };

//   type UserRole = {
//     role: "user";
//     subscriptionLevel: "free" | "premium";
//   };

//   type AdminUser = BaseUser & AdminRole;
//   type RegularUser = BaseUser & UserRole;

//   const admin: AdminUser = {
//     id: 1,
//     name: "Alice",
//     email: "alice@email.com",
//     role: "admin",
//     permissions: ["read", "write", "delete"],
//     canDeleteUsers: true
//   };

// MIXIN PATTERN WITH INTERSECTION
// ---------------------------------
//   type Serializable = {
//     serialize(): string;
//     deserialize(data: string): void;
//   };

//   type Loggable = {
//     log(message: string): void;
//     getLog(): string[];
//   };

//   type DataModel<T> = T & Serializable & Loggable;

// REACT IMPLEMENTATION - INTERSECTION TYPES
// ------------------------------------------
//   // HOC (Higher Order Component) pattern
//   import React from 'react';

//   // Base props
//   interface ComponentProps {
//     title: string;
//     children?: React.ReactNode;
//   }

//   // Loading mixin
//   interface WithLoading {
//     isLoading: boolean;
//     loadingText?: string;
//   }

//   // Error mixin
//   interface WithError {
//     error: string | null;
//     onRetry?: () => void;
//   }

//   // Combined type
//   type DataComponentProps = ComponentProps & WithLoading & WithError;

//   const DataComponent: React.FC<DataComponentProps> = ({
//     title, children, isLoading, loadingText, error, onRetry
//   }) => {
//     if (isLoading) return <div>{loadingText ?? "Loading..."}</div>;
//     if (error) return (
//       <div>
//         <p>Error: {error}</p>
//         {onRetry && <button onClick={onRetry}>Retry</button>}
//       </div>
//     );
//     return (
//       <div>
//         <h2>{title}</h2>
//         {children}
//       </div>
//     );
//   };

// INTERVIEW QUESTIONS - LECTURE 3:
// ---------------------------------
// Q1: What is the difference between Union (|) and Intersection (&) types?
// A: Union (|): value can be ONE of the types. Type A | B means "either A or B".
//    Intersection (&): value must be ALL of the types combined. A & B means
//    "both A and B simultaneously". Union is OR logic, Intersection is AND logic.

// Q2: What happens when you intersect types with conflicting properties?
// A: If two types have the same property name with different types, the intersection
//    becomes 'never' for that property (string & number = never), making the
//    whole type effectively unusable. Avoid intersecting incompatible types.

// ================================================================================

// LECTURE 4: ENUM IN TYPESCRIPT
// ===============================

// WHAT IS ENUM?
// -------------
// Enums allow defining a set of named constants. They make code more readable
// by replacing "magic" numbers or strings with meaningful names.

// NUMERIC ENUM (DEFAULT)
// -----------------------
//   enum Direction {
//     Up,     // 0
//     Down,   // 1
//     Left,   // 2
//     Right   // 3
//   }

//   let move: Direction = Direction.Up;
//   console.log(move);           // 0
//   console.log(Direction.Up);   // 0
//   console.log(Direction[0]);   // "Up" (reverse mapping!)

//   // Custom starting value
//   enum StatusCode {
//     OK = 200,
//     Created = 201,
//     BadRequest = 400,
//     Unauthorized = 401,
//     NotFound = 404,
//     ServerError = 500
//   }

// STRING ENUM (PREFERRED FOR DEBUGGING)
// ---------------------------------------
//   enum Theme {
//     Light = "LIGHT",
//     Dark = "DARK",
//     System = "SYSTEM"
//   }

//   let currentTheme: Theme = Theme.Dark;
//   console.log(currentTheme); // "DARK" - much more readable!

//   enum Role {
//     Admin = "ADMIN",
//     User = "USER",
//     Guest = "GUEST"
//   }

//   function checkPermission(role: Role): boolean {
//     return role === Role.Admin;
//   }

// CONST ENUM (COMPILE-TIME OPTIMIZATION)
// ----------------------------------------
//   const enum Color {
//     Red = "RED",
//     Green = "GREEN",
//     Blue = "BLUE"
//   }

//   let myColor: Color = Color.Red;
//   // Compiles to: let myColor = "RED"; (inlined!)
//   // No enum object created at runtime - more efficient

// ENUM IN SWITCH STATEMENTS
// --------------------------
//   enum PaymentStatus {
//     Pending = "PENDING",
//     Processing = "PROCESSING",
//     Success = "SUCCESS",
//     Failed = "FAILED",
//     Refunded = "REFUNDED"
//   }

//   function handlePayment(status: PaymentStatus): string {
//     switch (status) {
//       case PaymentStatus.Pending:
//         return "Payment is pending";
//       case PaymentStatus.Processing:
//         return "Payment is being processed";
//       case PaymentStatus.Success:
//         return "Payment successful!";
//       case PaymentStatus.Failed:
//         return "Payment failed. Please try again.";
//       case PaymentStatus.Refunded:
//         return "Payment has been refunded";
//       default:
//         const exhaustive: never = status;
//         throw new Error(`Unknown status: ${exhaustive}`);
//     }
//   }

// REACT IMPLEMENTATION - ENUMS
// ------------------------------
//   // theme.ts
//   export enum Theme {
//     Light = "light",
//     Dark = "dark",
//     HighContrast = "high-contrast"
//   }

//   export enum FontSize {
//     Small = "small",
//     Medium = "medium",
//     Large = "large"
//   }

//   // ThemeToggle.tsx
//   import React, { useState } from 'react';

//   const ThemeToggle: React.FC = () => {
//     const [theme, setTheme] = useState<Theme>(Theme.Light);

//     const toggleTheme = (): void => {
//       setTheme(prev => {
//         if (prev === Theme.Light) return Theme.Dark;
//         if (prev === Theme.Dark) return Theme.HighContrast;
//         return Theme.Light;
//       });
//     };

//     return (
//       <div data-theme={theme}>
//         <p>Current: {theme}</p>
//         <button onClick={toggleTheme}>Toggle Theme</button>
//       </div>
//     );
//   };

//   // Route enum for navigation
//   export enum AppRoute {
//     Home = "/",
//     About = "/about",
//     Products = "/products",
//     Profile = "/profile",
//     Settings = "/settings"
//   }

// INTERVIEW QUESTIONS - LECTURE 4:
// ---------------------------------
// Q1: What is an enum in TypeScript and why use it?
// A: Enum defines a set of named constants. Use it to avoid "magic" values in code,
//    make related constants grouped together, enable autocomplete, and make code
//    self-documenting. Example: use Direction.North instead of 0 or "north".

// Q2: What is the difference between numeric and string enums?
// A: Numeric enums auto-increment (0, 1, 2...) and support reverse mapping
//    (Enum[0] gives the name). String enums have explicit string values, no reverse
//    mapping, but are much easier to debug since you see the actual string value.
//    Prefer string enums for debug-ability.

// Q3: What is a const enum and when would you use it?
// A: const enums are inlined at compile time - the enum object doesn't exist at
//    runtime. Use them for performance optimization in performance-critical code.
//    Downside: cannot be used with some tools that process JS (not TS) files.

// ================================================================================

// LECTURE 5: KEYOF OPERATOR
// ===========================

// WHAT IS KEYOF?
// --------------
// The 'keyof' operator creates a union type of all keys (property names) of
// a given type. It's like Object.keys() but at the type level.

// BASIC KEYOF
// -----------
//   type User = {
//     id: number;
//     name: string;
//     email: string;
//     age: number;
//   };

//   type UserKeys = keyof User; // "id" | "name" | "email" | "age"

//   let key: UserKeys = "name"; // OK
//   let key2: UserKeys = "id";  // OK
//   // let key3: UserKeys = "phone"; // ERROR! Not a key of User

// KEYOF WITH GENERIC FUNCTIONS
// -----------------------------
//   // Type-safe property getter
//   function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
//     return obj[key];
//   }

//   const user = { id: 1, name: "Alice", age: 25 };

//   let name = getProperty(user, "name"); // type: string
//   let age = getProperty(user, "age");   // type: number
//   let id = getProperty(user, "id");     // type: number

//   // getProperty(user, "phone"); // ERROR! "phone" is not a key

// KEYOF WITH OBJECT TYPES
// ------------------------
//   type Config = {
//     host: string;
//     port: number;
//     secure: boolean;
//   };

//   // Create a type that allows only Config keys
//   type ConfigKey = keyof Config; // "host" | "port" | "secure"

//   // Function to set config by key
//   function setConfig<K extends keyof Config>(
//     config: Config,
//     key: K,
//     value: Config[K] // Type of the value matches the key!
//   ): Config {
//     return { ...config, [key]: value };
//   }

//   const config: Config = { host: "localhost", port: 3000, secure: false };
//   const updated = setConfig(config, "port", 8080); // OK - number
//   const secured = setConfig(config, "secure", true); // OK - boolean
//   // setConfig(config, "port", "8080"); // ERROR! "8080" is string, not number

// MAPPED TYPES WITH KEYOF
// ------------------------
//   // Creating types based on another type's keys
//   type Optional<T> = {
//     [K in keyof T]?: T[K]; // All properties optional
//   };

//   type Readonly<T> = {
//     readonly [K in keyof T]: T[K]; // All properties readonly
//   };

//   type UserOptional = Optional<User>;   // All fields optional
//   type UserReadonly = Readonly<User>;   // All fields readonly

// REACT IMPLEMENTATION - KEYOF
// ------------------------------
//   // Type-safe form field updater
//   import React, { useState } from 'react';

//   interface ProfileForm {
//     firstName: string;
//     lastName: string;
//     email: string;
//     age: number;
//     bio: string;
//   }

//   const ProfileEditor: React.FC = () => {
//     const [form, setForm] = useState<ProfileForm>({
//       firstName: "",
//       lastName: "",
//       email: "",
//       age: 0,
//       bio: ""
//     });

//     // Type-safe field updater
//     const updateField = <K extends keyof ProfileForm>(
//       field: K,
//       value: ProfileForm[K]
//     ): void => {
//       setForm(prev => ({ ...prev, [field]: value }));
//     };

//     return (
//       <form>
//         <input
//           value={form.firstName}
//           onChange={e => updateField("firstName", e.target.value)}
//           placeholder="First Name"
//         />
//         <input
//           value={form.age}
//           type="number"
//           onChange={e => updateField("age", Number(e.target.value))}
//           placeholder="Age"
//         />
//         <textarea
//           value={form.bio}
//           onChange={e => updateField("bio", e.target.value)}
//         />
//       </form>
//     );
//   };

// INTERVIEW QUESTIONS - LECTURE 5:
// ---------------------------------
// Q1: What does the keyof operator do?
// A: keyof T produces a union type of all the keys of type T. If T has properties
//    id, name, email, then keyof T = "id" | "name" | "email". It's used to create
//    type-safe property accessors, mapped types, and constrained generics.

// Q2: What is the practical use case of keyof with generics?
// A: Creating type-safe accessor functions: function get<T, K extends keyof T>(obj: T, key: K): T[K]
//    This ensures you can only pass valid property names for the given object,
//    and the return type is automatically inferred based on the key.

// ================================================================================

// LECTURE 6: INDEX SIGNATURE
// ============================

// WHAT IS INDEX SIGNATURE?
// -------------------------
// Index signatures allow you to define types for objects with dynamic property
// names (keys you don't know ahead of time).

// BASIC INDEX SIGNATURE
// ---------------------
//   interface StringMap {
//     [key: string]: string;
//   }

//   let translations: StringMap = {
//     hello: "Hola",
//     world: "Mundo",
//     goodbye: "Adiós"
//   };

//   // Can add any string key with string value
//   translations["thanks"] = "Gracias"; // OK
//   // translations["count"] = 42;       // ERROR! Must be string

// NUMBER INDEX SIGNATURE
// -----------------------
//   interface NumberArray {
//     [index: number]: string;
//   }

//   let words: NumberArray = ["hello", "world", "typescript"];
//   console.log(words[0]); // "hello"

// MIXED KNOWN AND DYNAMIC PROPERTIES
// ------------------------------------
//   interface Config {
//     host: string;          // Known property
//     port: number;          // Known property
//     [key: string]: unknown; // Allow additional unknown properties
//     // NOTE: unknown properties must be compatible with known ones
//     // If you have port: number, the index value can't be just string
//     // Use unknown or string | number as the value type
//   }

//   const serverConfig: Config = {
//     host: "localhost",
//     port: 3000,
//     timeout: 5000,    // dynamic
//     debug: true       // dynamic
//   };

// RECORD TYPE (Cleaner Alternative)
// -----------------------------------
//   // Record<KeyType, ValueType> is cleaner than index signatures
//   type ColorMap = Record<string, string>;
//   type ScoreMap = Record<string, number>;

//   // With specific keys:
//   type ThemeColors = Record<"primary" | "secondary" | "accent", string>;

//   const colors: ThemeColors = {
//     primary: "#1E40AF",
//     secondary: "#0EA5E9",
//     accent: "#7C3AED"
//   };

//   // Equivalent to interface with union key
//   interface ThemeColors2 {
//     primary: string;
//     secondary: string;
//     accent: string;
//   }

// PRACTICAL USAGE
// ---------------
//   // Translation system
//   interface Translations {
//     [locale: string]: {
//       [key: string]: string;
//     };
//   }

//   const i18n: Translations = {
//     en: {
//       greeting: "Hello",
//       farewell: "Goodbye"
//     },
//     es: {
//       greeting: "Hola",
//       farewell: "Adiós"
//     }
//   };

//   function translate(locale: string, key: string): string {
//     return i18n[locale]?.[key] ?? key;
//   }

//   // Cache system
//   interface Cache<T> {
//     [key: string]: T;
//   }

//   const userCache: Cache<User> = {};
//   userCache["user_1"] = { id: 1, name: "Alice", email: "a@a.com", age: 25 };

// REACT IMPLEMENTATION - INDEX SIGNATURE
// ----------------------------------------
//   // Dynamic form fields
//   import React, { useState } from 'react';

//   // Index signature for form state with dynamic fields
//   interface FormData {
//     [fieldName: string]: string;
//   }

//   interface FieldConfig {
//     label: string;
//     type: "text" | "email" | "password" | "number";
//     required?: boolean;
//   }

//   interface DynamicFormProps {
//     fields: Record<string, FieldConfig>;
//     onSubmit: (data: FormData) => void;
//   }

//   const DynamicForm: React.FC<DynamicFormProps> = ({ fields, onSubmit }) => {
//     const [formData, setFormData] = useState<FormData>(
//       Object.keys(fields).reduce((acc, key) => ({ ...acc, [key]: "" }), {})
//     );

//     const handleChange = (fieldName: string, value: string): void => {
//       setFormData(prev => ({ ...prev, [fieldName]: value }));
//     };

//     const handleSubmit = (e: React.FormEvent): void => {
//       e.preventDefault();
//       onSubmit(formData);
//     };

//     return (
//       <form onSubmit={handleSubmit}>
//         {Object.entries(fields).map(([name, config]) => (
//           <div key={name}>
//             <label>{config.label}</label>
//             <input
//               type={config.type}
//               value={formData[name]}
//               onChange={e => handleChange(name, e.target.value)}
//               required={config.required}
//             />
//           </div>
//         ))}
//         <button type="submit">Submit</button>
//       </form>
//     );
//   };

// INTERVIEW QUESTIONS - LECTURE 6:
// ---------------------------------
// Q1: What is an index signature in TypeScript?
// A: An index signature [key: string]: ValueType allows an object to have
//    any number of properties with keys of a specific type (usually string or
//    number). It's used when you don't know property names ahead of time,
//    like dictionaries, maps, or dynamic configuration objects.

// Q2: What is Record<K, V> and how does it relate to index signatures?
// A: Record<K, V> is a utility type that creates an object type with keys of
//    type K and values of type V. It's equivalent to { [key in K]: V } and is
//    often cleaner than writing index signatures directly.

// ================================================================================

// LECTURE 7: UTILITY TYPES
// ==========================

// WHAT ARE UTILITY TYPES?
// -----------------------
// TypeScript provides built-in "utility types" that transform other types.
// They save you from writing common type transformations manually.

// PARTIAL<T> - Make all properties optional
// ------------------------------------------
//   interface User {
//     id: number;
//     name: string;
//     email: string;
//     age: number;
//   }

//   type PartialUser = Partial<User>;
//   // Equivalent to: { id?: number; name?: string; email?: string; age?: number }

//   // Use case: Update function (only pass what you want to update)
//   function updateUser(id: number, updates: Partial<User>): User {
//     // ... find user and merge updates
//     return { id, name: "Alice", email: "a@a.com", age: 25, ...updates };
//   }

//   updateUser(1, { name: "Bob" }); // Only update name
//   updateUser(1, { email: "b@b.com", age: 26 }); // Update email and age

// REQUIRED<T> - Make all properties required
// -------------------------------------------
//   interface Config {
//     host?: string;
//     port?: number;
//     debug?: boolean;
//   }

//   type RequiredConfig = Required<Config>;
//   // { host: string; port: number; debug: boolean }

//   function createServer(config: Required<Config>): void {
//     // All properties guaranteed to exist
//     console.log(`${config.host}:${config.port}`);
//   }

// READONLY<T> - Make all properties readonly
// -------------------------------------------
//   type ReadonlyUser = Readonly<User>;
//   // { readonly id: number; readonly name: string; ... }

//   const frozenUser: Readonly<User> = {
//     id: 1, name: "Alice", email: "a@a.com", age: 25
//   };

//   // frozenUser.name = "Bob"; // ERROR! Cannot assign to 'name'

// PICK<T, K> - Pick specific properties
// ----------------------------------------
//   type UserPreview = Pick<User, "id" | "name">;
//   // { id: number; name: string }

//   type LoginCredentials = Pick<User, "email">;
//   // { email: string }

//   // Useful for displaying subsets of data
//   function showUserCard(user: Pick<User, "name" | "email">): void {
//     console.log(`${user.name} - ${user.email}`);
//   }

// OMIT<T, K> - Omit specific properties
// ----------------------------------------
//   type UserWithoutId = Omit<User, "id">;
//   // { name: string; email: string; age: number }

//   type UserPublicInfo = Omit<User, "id" | "email">;
//   // { name: string; age: number }

//   // Use case: Create new user without ID (DB assigns it)
//   function createNewUser(data: Omit<User, "id">): User {
//     return { ...data, id: Math.random() };
//   }

// RECORD<K, V> - Create object type with specific keys
// ------------------------------------------------------
//   type UserRole = "admin" | "user" | "guest";
//   type RolePermissions = Record<UserRole, string[]>;

//   const permissions: RolePermissions = {
//     admin: ["read", "write", "delete"],
//     user: ["read", "write"],
//     guest: ["read"]
//   };

//   // Record for lookup tables
//   type CountryCode = "US" | "UK" | "IN" | "DE";
//   type CountryName = Record<CountryCode, string>;

//   const countries: CountryName = {
//     US: "United States",
//     UK: "United Kingdom",
//     IN: "India",
//     DE: "Germany"
//   };

// EXCLUDE<T, U> - Exclude types from union
// ------------------------------------------
//   type AllTypes = string | number | boolean | null | undefined;
//   type Primitives = Exclude<AllTypes, null | undefined>;
//   // string | number | boolean

//   type Status = "active" | "inactive" | "pending" | "deleted";
//   type ActiveStatus = Exclude<Status, "deleted">;
//   // "active" | "inactive" | "pending"

// EXTRACT<T, U> - Extract matching types from union
// ---------------------------------------------------
//   type AllTypes = string | number | boolean | null | undefined;
//   type Strings = Extract<AllTypes, string>;   // string
//   type Nullables = Extract<AllTypes, null | undefined>; // null | undefined

// NONNULLABLE<T> - Remove null and undefined
// -------------------------------------------
//   type MaybeString = string | null | undefined;
//   type DefiniteString = NonNullable<MaybeString>; // string

// RETURNTYPE<T> - Extract function return type
// ---------------------------------------------
//   function fetchUser(): { id: number; name: string } {
//     return { id: 1, name: "Alice" };
//   }

//   type UserReturn = ReturnType<typeof fetchUser>;
//   // { id: number; name: string }

// PARAMETERS<T> - Extract function parameters
// --------------------------------------------
//   function createPost(title: string, content: string, tags: string[]): void {}

//   type PostParams = Parameters<typeof createPost>;
//   // [string, string, string[]]

//   type FirstParam = Parameters<typeof createPost>[0]; // string

// AWAITED<T> - Unwrap Promise type
// ----------------------------------
//   type PromisedUser = Promise<User>;
//   type ResolvedUser = Awaited<PromisedUser>; // User

//   async function getUser(): Promise<User> {
//     return { id: 1, name: "Alice", email: "a@a.com", age: 25 };
//   }

//   type GetUserReturn = Awaited<ReturnType<typeof getUser>>; // User

// REACT IMPLEMENTATION - UTILITY TYPES
// --------------------------------------
//   import React, { useState } from 'react';

//   interface Article {
//     id: number;
//     title: string;
//     content: string;
//     author: string;
//     publishedAt: string;
//     tags: string[];
//     views: number;
//   }

//   // Card only shows preview - Pick fields needed
//   type ArticleCard = Pick<Article, "id" | "title" | "author" | "publishedAt" | "tags">;

//   // Create form - no id (auto-assigned) or views (starts at 0)
//   type CreateArticleForm = Omit<Article, "id" | "views" | "publishedAt">;

//   // Edit form - all fields optional (only update what changed)
//   type UpdateArticleForm = Partial<Omit<Article, "id">>;

//   // Props
//   interface ArticleCardProps {
//     article: ArticleCard;
//     onClick: (id: number) => void;
//   }

//   const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick }) => {
//     return (
//       <div onClick={() => onClick(article.id)}>
//         <h3>{article.title}</h3>
//         <p>By {article.author}</p>
//         <p>{article.publishedAt}</p>
//         <div>{article.tags.map(tag => <span key={tag}>#{tag}</span>)}</div>
//       </div>
//     );
//   };

//   // Form component using Partial
//   interface EditFormProps {
//     article: Article;
//     onSave: (updates: UpdateArticleForm) => void;
//   }

//   const EditForm: React.FC<EditFormProps> = ({ article, onSave }) => {
//     const [updates, setUpdates] = useState<UpdateArticleForm>({});

//     const updateField = <K extends keyof UpdateArticleForm>(
//       field: K,
//       value: UpdateArticleForm[K]
//     ) => {
//       setUpdates(prev => ({ ...prev, [field]: value }));
//     };

//     return (
//       <form onSubmit={(e) => { e.preventDefault(); onSave(updates); }}>
//         <input
//           defaultValue={article.title}
//           onChange={e => updateField("title", e.target.value)}
//         />
//         <textarea
//           defaultValue={article.content}
//           onChange={e => updateField("content", e.target.value)}
//         />
//         <button type="submit">Save Changes</button>
//       </form>
//     );
//   };

// INTERVIEW QUESTIONS - LECTURE 7:
// ---------------------------------
// Q1: What are utility types and name some common ones?
// A: Utility types are built-in TypeScript types that transform other types.
//    Common ones: Partial<T> (all optional), Required<T> (all required),
//    Readonly<T> (all readonly), Pick<T,K> (select keys), Omit<T,K> (remove keys),
//    Record<K,V> (key-value type), Exclude<T,U>, Extract<T,U>, NonNullable<T>,
//    ReturnType<T>, Parameters<T>.

// Q2: What is the difference between Pick and Omit?
// A: Pick<T, K> selects specific properties K from type T. Good when you want
//    a small subset. Omit<T, K> removes specific properties K from type T.
//    Good when you want most properties except a few. Use Pick for small
//    selections, Omit when excluding a few from a large type.

// Q3: How would you create a type for updating a user (where all fields are optional)?
// A: Use Partial<User>: type UpdateUser = Partial<User>. This makes all properties
//    optional so you can pass only the fields you want to update. Often combined
//    with Omit: type UpdateUser = Partial<Omit<User, "id">> to exclude the ID.

// Q4: What does ReturnType<T> do and when is it useful?
// A: ReturnType<typeof fn> extracts the return type of a function. Useful when
//    you want to type a variable to match what a function returns without
//    duplicating the type definition. Especially helpful for complex return types.

// ================================================================================
// END OF CHAPTER 4
// ================================================================================