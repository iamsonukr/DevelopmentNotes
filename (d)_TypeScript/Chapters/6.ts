// ================================================================================
//         TYPESCRIPT COMPLETE COURSE - CHAPTER 6: OBJECT-ORIENTED PROGRAMMING
// ================================================================================

// LECTURE 1: CLASSES IN TYPESCRIPT
// ==================================

// BASIC CLASS
// -----------
//   class Person {
//     name: string;
//     age: number;

//     constructor(name: string, age: number) {
//       this.name = name;
//       this.age = age;
//     }

//     greet(): string {
//       return `Hi, I'm ${this.name} and I'm ${this.age} years old`;
//     }

//     isAdult(): boolean {
//       return this.age >= 18;
//     }
//   }

//   const person = new Person("Alice", 25);
//   console.log(person.greet());    // "Hi, I'm Alice and I'm 25 years old"
//   console.log(person.isAdult()); // true

// SHORTHAND PROPERTY DECLARATION
// --------------------------------
//   // Long way
//   class User {
//     name: string;
//     email: string;
    
//     constructor(name: string, email: string) {
//       this.name = name;
//       this.email = email;
//     }
//   }

//   // Shorthand (access modifier in constructor parameter = auto declares + assigns)
//   class User2 {
//     constructor(
//       public name: string,     // auto: this.name = name
//       public email: string,    // auto: this.email = email
//       private age: number,     // auto: this.age = age (private)
//       readonly id: number      // auto: this.id = id (readonly)
//     ) {}
//   }

//   const user = new User2("Alice", "alice@email.com", 25, 1);
//   console.log(user.name);  // "Alice"
//   // console.log(user.age); // ERROR! private

// REACT IMPLEMENTATION - CLASSES
// --------------------------------
//   // Class-based service for data management
//   class ProductService {
//     private products: Product[] = [];
//     private nextId: number = 1;

//     add(data: Omit<Product, "id">): Product {
//       const product: Product = { ...data, id: this.nextId++ };
//       this.products.push(product);
//       return product;
//     }

//     getAll(): Product[] {
//       return [...this.products]; // Return copy
//     }

//     getById(id: number): Product | undefined {
//       return this.products.find(p => p.id === id);
//     }

//     update(id: number, updates: Partial<Product>): Product | null {
//       const index = this.products.findIndex(p => p.id === id);
//       if (index === -1) return null;
//       this.products[index] = { ...this.products[index], ...updates };
//       return this.products[index];
//     }

//     delete(id: number): boolean {
//       const index = this.products.findIndex(p => p.id === id);
//       if (index === -1) return false;
//       this.products.splice(index, 1);
//       return true;
//     }
//   }

//   // In React, use as singleton or with context
//   const productService = new ProductService();

// ================================================================================

// LECTURE 2: ACCESS MODIFIERS
// =============================

// THREE MODIFIERS
// ---------------
//   class BankAccount {
//     public accountNumber: string;    // Accessible everywhere
//     protected balance: number;       // Accessible in class + subclasses
//     private pin: string;             // Only accessible within this class
//     readonly createdAt: Date;        // Cannot change after construction

//     constructor(accountNumber: string, pin: string, initialBalance: number) {
//       this.accountNumber = accountNumber;
//       this.pin = pin;
//       this.balance = initialBalance;
//       this.createdAt = new Date();
//     }

//     public deposit(amount: number): void {
//       if (amount <= 0) throw new Error("Amount must be positive");
//       this.balance += amount;
//     }

//     public withdraw(amount: number, pin: string): void {
//       if (!this.validatePin(pin)) throw new Error("Invalid PIN");
//       if (amount > this.balance) throw new Error("Insufficient funds");
//       this.balance -= amount;
//     }

//     public getBalance(): number {
//       return this.balance; // Public method to read balance
//     }

//     private validatePin(pin: string): boolean {
//       return this.pin === pin; // Private: can only be called inside class
//     }
//   }

//   const account = new BankAccount("12345", "1234", 1000);
//   account.deposit(500);
//   account.withdraw(200, "1234");
//   console.log(account.getBalance()); // 1300
//   // account.pin              // ERROR! private
//   // account.balance          // ERROR! protected (from outside class)
//   // account.validatePin("x") // ERROR! private

// PROTECTED IN INHERITANCE
// ------------------------
//   class SavingsAccount extends BankAccount {
//     private interestRate: number;

//     constructor(accountNumber: string, pin: string, balance: number, rate: number) {
//       super(accountNumber, pin, balance);
//       this.interestRate = rate;
//     }

//     addInterest(): void {
//       // Can access 'balance' because it's protected
//       this.balance += this.balance * this.interestRate;
//     }
//   }

//   const savings = new SavingsAccount("67890", "5678", 2000, 0.05);
//   savings.addInterest();
//   console.log(savings.getBalance()); // 2100

// REACT IMPLEMENTATION - ACCESS MODIFIERS
// -----------------------------------------
//   // AuthService class with access modifiers
//   class AuthService {
//     private static instance: AuthService;
//     private currentUser: User | null = null;
//     private token: string | null = null;
    
//     public readonly loginUrl: string = "/api/login";

//     private constructor() {} // Private constructor = singleton

//     public static getInstance(): AuthService {
//       if (!AuthService.instance) {
//         AuthService.instance = new AuthService();
//       }
//       return AuthService.instance;
//     }

//     public async login(email: string, password: string): Promise<User> {
//       const response = await fetch(this.loginUrl, {
//         method: "POST",
//         body: JSON.stringify({ email, password })
//       });
//       const data = await response.json();
//       this.currentUser = data.user;
//       this.token = data.token;
//       return data.user;
//     }

//     public logout(): void {
//       this.currentUser = null;
//       this.token = null;
//     }

//     public getCurrentUser(): User | null {
//       return this.currentUser;
//     }

//     public isAuthenticated(): boolean {
//       return this.currentUser !== null && this.token !== null;
//     }

//     protected getToken(): string | null {
//       return this.token;
//     }
//   }

//   const authService = AuthService.getInstance();

// ================================================================================

// LECTURE 3: GETTER AND SETTER
// ==============================

// WHY GETTERS/SETTERS?
// --------------------
// Getters and Setters allow you to control how properties are accessed
// and modified - adding validation, transformation, or side effects.

// BASIC GETTER AND SETTER
// ------------------------
//   class Temperature {
//     private _celsius: number;

//     constructor(celsius: number) {
//       this._celsius = celsius;
//     }

//     // Getter - accessed as property, not method call
//     get fahrenheit(): number {
//       return (this._celsius * 9/5) + 32;
//     }

//     get celsius(): number {
//       return this._celsius;
//     }

//     // Setter - with validation
//     set celsius(value: number) {
//       if (value < -273.15) {
//         throw new Error("Temperature below absolute zero!");
//       }
//       this._celsius = value;
//     }
//   }

//   const temp = new Temperature(100);
//   console.log(temp.celsius);     // 100  (getter)
//   console.log(temp.fahrenheit);  // 212  (getter - computed)
  
//   temp.celsius = 0;              // setter
//   console.log(temp.fahrenheit);  // 32

//   // temp.celsius = -300; // ERROR at runtime: below absolute zero

// PRACTICAL CLASS WITH GETTERS/SETTERS
// --------------------------------------
//   class User {
//     private _firstName: string;
//     private _lastName: string;
//     private _age: number;
//     private _email: string;

//     constructor(firstName: string, lastName: string, age: number, email: string) {
//       this._firstName = firstName;
//       this._lastName = lastName;
//       this._age = age;
//       this._email = email;
//     }

//     // Computed getter
//     get fullName(): string {
//       return `${this._firstName} ${this._lastName}`;
//     }

//     // Set both first and last at once
//     set fullName(value: string) {
//       const parts = value.split(" ");
//       if (parts.length !== 2) throw new Error("Must provide first and last name");
//       this._firstName = parts[0];
//       this._lastName = parts[1];
//     }

//     get age(): number {
//       return this._age;
//     }

//     set age(value: number) {
//       if (value < 0 || value > 150) throw new Error("Invalid age");
//       this._age = value;
//     }

//     get email(): string {
//       return this._email;
//     }

//     set email(value: string) {
//       if (!value.includes("@")) throw new Error("Invalid email format");
//       this._email = value.toLowerCase();
//     }

//     get isAdult(): boolean {
//       return this._age >= 18;
//     }
//   }

//   const user = new User("John", "Doe", 25, "JOHN@EMAIL.COM");
//   console.log(user.fullName);  // "John Doe"
//   console.log(user.email);     // "john@email.com" (lowercased by setter)
//   console.log(user.isAdult);  // true (getter-only)
  
//   user.fullName = "Jane Smith";
//   console.log(user.fullName);  // "Jane Smith"
  
//   // user.isAdult = false;     // ERROR! No setter defined

// REACT IMPLEMENTATION - GETTERS AND SETTERS
// --------------------------------------------
//   // Using class with getters for data model in React
//   import React, { useState } from 'react';

//   class CartItem {
//     private _quantity: number;
    
//     constructor(
//       public readonly product: Product,
//       quantity: number
//     ) {
//       this._quantity = quantity;
//     }

//     get quantity(): number {
//       return this._quantity;
//     }

//     set quantity(value: number) {
//       if (value < 0) throw new Error("Quantity cannot be negative");
//       if (value > 99) throw new Error("Cannot add more than 99 items");
//       this._quantity = value;
//     }

//     get subtotal(): number {
//       return this.product.price * this._quantity;
//     }
//   }

//   class ShoppingCart {
//     private _items: CartItem[] = [];

//     add(product: Product, quantity: number = 1): void {
//       const existing = this._items.find(i => i.product.id === product.id);
//       if (existing) {
//         existing.quantity += quantity;
//       } else {
//         this._items.push(new CartItem(product, quantity));
//       }
//     }

//     remove(productId: number): void {
//       this._items = this._items.filter(i => i.product.id !== productId);
//     }

//     get items(): CartItem[] {
//       return [...this._items];
//     }

//     get total(): number {
//       return this._items.reduce((sum, item) => sum + item.subtotal, 0);
//     }

//     get itemCount(): number {
//       return this._items.reduce((sum, item) => sum + item.quantity, 0);
//     }

//     get isEmpty(): boolean {
//       return this._items.length === 0;
//     }
//   }

// ================================================================================

// LECTURE 4: STATIC KEYWORD
// ===========================

// WHAT IS STATIC?
// ---------------
// Static members belong to the CLASS itself, not to instances.
// They're shared across all instances and accessed via ClassName.member.

// STATIC PROPERTIES AND METHODS
// -------------------------------
//   class Counter {
//     private static count: number = 0; // Class-level, shared

//     constructor() {
//       Counter.count++; // Each new instance increments
//     }

//     static getCount(): number {
//       return Counter.count;
//     }

//     static reset(): void {
//       Counter.count = 0;
//     }
//   }

//   new Counter();
//   new Counter();
//   new Counter();
//   console.log(Counter.getCount()); // 3
//   Counter.reset();
//   console.log(Counter.getCount()); // 0

// STATIC UTILITY CLASS
// --------------------
//   class MathUtils {
//     static readonly PI: number = 3.14159265358979;
//     static readonly E: number = 2.71828182845905;

//     static add(a: number, b: number): number { return a + b; }
//     static subtract(a: number, b: number): number { return a - b; }
    
//     static circleArea(radius: number): number {
//       return MathUtils.PI * radius ** 2;
//     }

//     static clamp(value: number, min: number, max: number): number {
//       return Math.min(Math.max(value, min), max);
//     }

//     static randomBetween(min: number, max: number): number {
//       return Math.floor(Math.random() * (max - min + 1)) + min;
//     }
//   }

//   // No instance needed
//   console.log(MathUtils.circleArea(5)); // 78.539...
//   console.log(MathUtils.clamp(150, 0, 100)); // 100
//   console.log(MathUtils.randomBetween(1, 10)); // 1-10

// SINGLETON PATTERN WITH STATIC
// -------------------------------
//   class Database {
//     private static instance: Database | null = null;
//     private isConnected: boolean = false;

//     private constructor(private connectionString: string) {}

//     static getInstance(connectionString: string): Database {
//       if (!Database.instance) {
//         Database.instance = new Database(connectionString);
//       }
//       return Database.instance;
//     }

//     connect(): void {
//       this.isConnected = true;
//       console.log(`Connected to ${this.connectionString}`);
//     }

//     query(sql: string): string {
//       if (!this.isConnected) throw new Error("Not connected!");
//       return `Result of: ${sql}`;
//     }
//   }

//   const db1 = Database.getInstance("mongodb://localhost:27017");
//   const db2 = Database.getInstance("mongodb://localhost:27017");
//   console.log(db1 === db2); // true! Same instance

// REACT IMPLEMENTATION - STATIC
// -------------------------------
//   // Static validation methods
//   class Validator {
//     static isEmail(email: string): boolean {
//       return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//     }

//     static isPhone(phone: string): boolean {
//       return /^\+?[\d\s-]{10,}$/.test(phone);
//     }

//     static isStrongPassword(password: string): { valid: boolean; errors: string[] } {
//       const errors: string[] = [];
//       if (password.length < 8) errors.push("At least 8 characters");
//       if (!/[A-Z]/.test(password)) errors.push("At least one uppercase letter");
//       if (!/[0-9]/.test(password)) errors.push("At least one number");
//       if (!/[!@#$%^&*]/.test(password)) errors.push("At least one special character");
//       return { valid: errors.length === 0, errors };
//     }

//     static isUrl(url: string): boolean {
//       try { new URL(url); return true; }
//       catch { return false; }
//     }
//   }

//   // Used in React form without creating instance
//   import React, { useState } from 'react';

//   const RegistrationForm: React.FC = () => {
//     const [email, setEmail] = useState<string>('');
//     const [password, setPassword] = useState<string>('');
//     const [errors, setErrors] = useState<string[]>([]);

//     const handleSubmit = (): void => {
//       const allErrors: string[] = [];
//       if (!Validator.isEmail(email)) allErrors.push("Invalid email");
//       const pwResult = Validator.isStrongPassword(password);
//       allErrors.push(...pwResult.errors);
//       setErrors(allErrors);
//     };

//     return (
//       <div>
//         <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
//         <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
//         {errors.map((err, i) => <p key={i} style={{color: 'red'}}>{err}</p>)}
//         <button onClick={handleSubmit}>Register</button>
//       </div>
//     );
//   };

// ================================================================================

// LECTURE 5: INHERITANCE
// ========================

// BASIC INHERITANCE
// -----------------
//   class Animal {
//     constructor(
//       public name: string,
//       public age: number
//     ) {}

//     speak(): string {
//       return `${this.name} makes a sound`;
//     }

//     toString(): string {
//       return `${this.name} (${this.age} years old)`;
//     }
//   }

//   class Dog extends Animal {
//     constructor(
//       name: string,
//       age: number,
//       public breed: string
//     ) {
//       super(name, age); // Must call super() first!
//     }

//     // Override parent method
//     speak(): string {
//       return `${this.name} barks: Woof!`;
//     }

//     fetch(): string {
//       return `${this.name} fetches the ball!`;
//     }
//   }

//   class Cat extends Animal {
//     speak(): string {
//       return `${this.name} meows: Meow!`;
//     }

//     purr(): string {
//       return `${this.name} purrs...`;
//     }
//   }

//   const dog = new Dog("Rex", 3, "Labrador");
//   const cat = new Cat("Whiskers", 5);

//   console.log(dog.speak()); // "Rex barks: Woof!"
//   console.log(cat.speak()); // "Whiskers meows: Meow!"
//   console.log(dog.fetch()); // "Rex fetches the ball!"
//   // console.log(cat.fetch()); // ERROR! Cat doesn't have fetch()

// ABSTRACT CLASSES
// -----------------
//   // Abstract classes can't be instantiated - only extended
//   abstract class Shape {
//     constructor(public color: string) {}

//     // Abstract method - subclasses MUST implement
//     abstract getArea(): number;
//     abstract getPerimeter(): number;

//     // Concrete method - shared by all subclasses
//     describe(): string {
//       return `A ${this.color} shape with area ${this.getArea().toFixed(2)}`;
//     }
//   }

//   class Circle extends Shape {
//     constructor(color: string, public radius: number) {
//       super(color);
//     }

//     getArea(): number {
//       return Math.PI * this.radius ** 2;
//     }

//     getPerimeter(): number {
//       return 2 * Math.PI * this.radius;
//     }
//   }

//   class Rectangle extends Shape {
//     constructor(
//       color: string,
//       public width: number,
//       public height: number
//     ) {
//       super(color);
//     }

//     getArea(): number {
//       return this.width * this.height;
//     }

//     getPerimeter(): number {
//       return 2 * (this.width + this.height);
//     }
//   }

//   // const shape = new Shape("red"); // ERROR! Can't instantiate abstract class
//   const circle = new Circle("blue", 5);
//   const rect = new Rectangle("red", 4, 6);

//   console.log(circle.describe()); // "A blue shape with area 78.54"
//   console.log(rect.describe());   // "A red shape with area 24.00"

// REACT IMPLEMENTATION - INHERITANCE
// ------------------------------------
//   // Base API client with inherited specific clients
//   abstract class BaseApiClient {
//     constructor(protected baseUrl: string) {}

//     protected async request<T>(
//       endpoint: string,
//       options?: RequestInit
//     ): Promise<T> {
//       const response = await fetch(`${this.baseUrl}${endpoint}`, {
//         headers: {
//           "Content-Type": "application/json",
//           ...options?.headers
//         },
//         ...options
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//       }

//       return response.json();
//     }

//     abstract getBaseEndpoint(): string;
//   }

//   class UserApiClient extends BaseApiClient {
//     constructor() {
//       super("https://jsonplaceholder.typicode.com");
//     }

//     getBaseEndpoint(): string { return "/users"; }

//     async getAll(): Promise<User[]> {
//       return this.request<User[]>(this.getBaseEndpoint());
//     }

//     async getById(id: number): Promise<User> {
//       return this.request<User>(`${this.getBaseEndpoint()}/${id}`);
//     }
//   }

//   class PostApiClient extends BaseApiClient {
//     constructor() {
//       super("https://jsonplaceholder.typicode.com");
//     }

//     getBaseEndpoint(): string { return "/posts"; }

//     async getAll(): Promise<Post[]> {
//       return this.request<Post[]>(this.getBaseEndpoint());
//     }

//     async getByUser(userId: number): Promise<Post[]> {
//       return this.request<Post[]>(`${this.getBaseEndpoint()}?userId=${userId}`);
//     }
//   }

// ================================================================================

// LECTURE 6: INTERFACE WITH CLASS
// ================================

// IMPLEMENTING INTERFACES
// ------------------------
//   interface Printable {
//     print(): void;
//     getContent(): string;
//   }

//   interface Saveable {
//     save(): boolean;
//     load(id: number): boolean;
//   }

//   // Class can implement multiple interfaces
//   class Document implements Printable, Saveable {
//     constructor(
//       private title: string,
//       private content: string
//     ) {}

//     print(): void {
//       console.log(`=== ${this.title} ===`);
//       console.log(this.content);
//     }

//     getContent(): string {
//       return this.content;
//     }

//     save(): boolean {
//       console.log(`Saving "${this.title}"...`);
//       return true;
//     }

//     load(id: number): boolean {
//       console.log(`Loading document ${id}...`);
//       return true;
//     }
//   }

// INTERFACE AS CONTRACT FOR MULTIPLE CLASSES
// -------------------------------------------
//   interface Logger {
//     log(message: string): void;
//     warn(message: string): void;
//     error(message: string): void;
//   }

//   class ConsoleLogger implements Logger {
//     log(message: string): void { console.log(`[LOG] ${message}`); }
//     warn(message: string): void { console.warn(`[WARN] ${message}`); }
//     error(message: string): void { console.error(`[ERROR] ${message}`); }
//   }

//   class FileLogger implements Logger {
//     private logs: string[] = [];

//     log(message: string): void { this.logs.push(`[LOG] ${message}`); }
//     warn(message: string): void { this.logs.push(`[WARN] ${message}`); }
//     error(message: string): void { this.logs.push(`[ERROR] ${message}`); }

//     getLogs(): string[] { return this.logs; }
//   }

//   class SilentLogger implements Logger {
//     log(): void {}   // Does nothing
//     warn(): void {}  // Does nothing
//     error(): void {} // Does nothing
//   }

//   // Functions work with any Logger
//   function processData(data: string[], logger: Logger): void {
//     logger.log("Starting processing...");
//     if (data.length === 0) {
//       logger.warn("Empty data!");
//       return;
//     }
//     logger.log(`Processing ${data.length} items`);
//     logger.log("Done!");
//   }

//   processData(["a", "b"], new ConsoleLogger()); // prints to console
//   processData([], new FileLogger());             // saves to array
//   processData(["x"], new SilentLogger());        // does nothing

// REACT IMPLEMENTATION - INTERFACE WITH CLASS
// ---------------------------------------------
//   // Repository pattern
//   interface Repository<T> {
//     findById(id: number): Promise<T | null>;
//     findAll(): Promise<T[]>;
//     create(data: Omit<T, "id">): Promise<T>;
//     update(id: number, data: Partial<T>): Promise<T | null>;
//     delete(id: number): Promise<boolean>;
//   }

//   // In-memory implementation
//   class MemoryUserRepository implements Repository<User> {
//     private users: User[] = [];
//     private nextId = 1;

//     async findById(id: number): Promise<User | null> {
//       return this.users.find(u => u.id === id) ?? null;
//     }

//     async findAll(): Promise<User[]> {
//       return [...this.users];
//     }

//     async create(data: Omit<User, "id">): Promise<User> {
//       const user: User = { ...data, id: this.nextId++ } as User;
//       this.users.push(user);
//       return user;
//     }

//     async update(id: number, data: Partial<User>): Promise<User | null> {
//       const idx = this.users.findIndex(u => u.id === id);
//       if (idx === -1) return null;
//       this.users[idx] = { ...this.users[idx], ...data };
//       return this.users[idx];
//     }

//     async delete(id: number): Promise<boolean> {
//       const idx = this.users.findIndex(u => u.id === id);
//       if (idx === -1) return false;
//       this.users.splice(idx, 1);
//       return true;
//     }
//   }

//   // API implementation
//   class ApiUserRepository implements Repository<User> {
//     constructor(private baseUrl: string) {}

//     async findById(id: number): Promise<User | null> {
//       const res = await fetch(`${this.baseUrl}/users/${id}`);
//       if (!res.ok) return null;
//       return res.json();
//     }

//     async findAll(): Promise<User[]> {
//       return fetch(`${this.baseUrl}/users`).then(r => r.json());
//     }

//     async create(data: Omit<User, "id">): Promise<User> {
//       const res = await fetch(`${this.baseUrl}/users`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data)
//       });
//       return res.json();
//     }

//     async update(id: number, data: Partial<User>): Promise<User | null> {
//       const res = await fetch(`${this.baseUrl}/users/${id}`, {
//         method: "PATCH",
//         body: JSON.stringify(data)
//       });
//       return res.ok ? res.json() : null;
//     }

//     async delete(id: number): Promise<boolean> {
//       const res = await fetch(`${this.baseUrl}/users/${id}`, { method: "DELETE" });
//       return res.ok;
//     }
//   }

// INTERVIEW QUESTIONS - CHAPTER 6:
// ----------------------------------
// Q1: What is the difference between interface and abstract class?
// A: Interfaces: compile-time only, no implementation code, multiple implements,
//    define contract only. Abstract classes: can have implementation, single
//    inheritance only, can have constructor and state. Use interface for contracts,
//    abstract class when sharing implementation logic.

// Q2: What is the difference between public, private, and protected?
// A: public: accessible everywhere (default).
//    private: only within the declaring class.
//    protected: within the class AND its subclasses.

// Q3: When would you use static methods vs instance methods?
// A: Static methods when logic doesn't need instance data (utility functions,
//    factories, singleton). Instance methods when they operate on or modify
//    the object's state.

// Q4: What does the super() call do?
// A: super() calls the parent class constructor. In TypeScript/JavaScript,
//    you MUST call super() before accessing 'this' in a subclass constructor.
//    super.method() calls the parent's method from an overriding method.

// ================================================================================
// END OF CHAPTER 6
// // ================================================================================