// ================================================================================
//            TYPESCRIPT COMPLETE COURSE - CHAPTER 5: DOM & PRACTICAL USAGE
// ================================================================================

// LECTURE 1: USING TYPESCRIPT WITH INPUT FIELD DATA
// ===================================================

// HTML INPUT ELEMENT TYPES
// -------------------------
// TypeScript provides specific types for DOM elements.
// HTMLInputElement is the type for <input> elements.

// BASIC INPUT HANDLING
// ---------------------
//   // Get input element (might be null)
//   const input = document.getElementById("myInput");
//   // Type: HTMLElement | null

//   // Type assertion to HTMLInputElement
//   const input2 = document.getElementById("myInput") as HTMLInputElement;
//   // Type: HTMLInputElement - now has .value, .type, .checked, etc.

//   // Or use type-specific querySelector
//   const input3 = document.querySelector<HTMLInputElement>("#myInput");
//   // Type: HTMLInputElement | null

//   // Access value
//   const value: string = input2.value;
//   const numValue: number = parseInt(input2.value);

// EVENT HANDLING WITH TYPES
// --------------------------
//   const nameInput = document.getElementById("name") as HTMLInputElement;
//   const ageInput = document.getElementById("age") as HTMLInputElement;

//   // onChange event
//   nameInput.addEventListener("input", (event: Event) => {
//     const target = event.target as HTMLInputElement;
//     console.log(target.value); // TypeScript knows it's string
//   });

//   // Specific event types
//   nameInput.addEventListener("change", (e: Event) => {
//     const val: string = (e.target as HTMLInputElement).value;
//     console.log(val);
//   });

//   nameInput.addEventListener("keydown", (e: KeyboardEvent) => {
//     if (e.key === "Enter") {
//       console.log("Enter pressed:", nameInput.value);
//     }
//   });

// FORM HANDLING IN VANILLA TS
// -----------------------------
//   interface FormData {
//     name: string;
//     email: string;
//     age: number;
//     newsletter: boolean;
//   }

//   const form = document.getElementById("myForm") as HTMLFormElement;
//   const nameInput = document.getElementById("name") as HTMLInputElement;
//   const emailInput = document.getElementById("email") as HTMLInputElement;
//   const ageInput = document.getElementById("age") as HTMLInputElement;
//   const newsletterInput = document.getElementById("newsletter") as HTMLInputElement;

//   form.addEventListener("submit", (e: SubmitEvent) => {
//     e.preventDefault();

//     const data: FormData = {
//       name: nameInput.value,
//       email: emailInput.value,
//       age: parseInt(ageInput.value),
//       newsletter: newsletterInput.checked
//     };

//     console.log(data);
//     processForm(data);
//   });

//   function processForm(data: FormData): void {
//     if (!data.name || !data.email) {
//       alert("Please fill all required fields");
//       return;
//     }
//     console.log("Form submitted:", data);
//   }

// REACT IMPLEMENTATION - INPUT DATA
// -----------------------------------
//   import React, { useState, useRef } from 'react';

//   interface SignupForm {
//     username: string;
//     email: string;
//     password: string;
//     age: number;
//     acceptTerms: boolean;
//   }

//   type FormErrors = Partial<Record<keyof SignupForm, string>>;

//   const SignupForm: React.FC = () => {
//     const [form, setForm] = useState<SignupForm>({
//       username: "",
//       email: "",
//       password: "",
//       age: 0,
//       acceptTerms: false
//     });

//     const [errors, setErrors] = useState<FormErrors>({});
//     const [submitted, setSubmitted] = useState<boolean>(false);

//     // Ref example
//     const firstInputRef = useRef<HTMLInputElement>(null);

//     const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//       const { name, value } = e.target;
//       setForm(prev => ({ ...prev, [name]: value }));
//       // Clear error on change
//       if (errors[name as keyof SignupForm]) {
//         setErrors(prev => ({ ...prev, [name]: undefined }));
//       }
//     };

//     const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//       setForm(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }));
//     };

//     const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//       setForm(prev => ({ ...prev, acceptTerms: e.target.checked }));
//     };

//     const validate = (): boolean => {
//       const newErrors: FormErrors = {};
//       if (!form.username) newErrors.username = "Username is required";
//       if (!form.email.includes("@")) newErrors.email = "Valid email required";
//       if (form.password.length < 8) newErrors.password = "Min 8 characters";
//       if (form.age < 18) newErrors.age = "Must be 18 or older";
//       if (!form.acceptTerms) newErrors.acceptTerms = "Must accept terms";
//       setErrors(newErrors);
//       return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
//       e.preventDefault();
//       if (validate()) {
//         setSubmitted(true);
//         console.log("Form data:", form);
//       }
//     };

//     if (submitted) return <p>Signup successful!</p>;

//     return (
//       <form onSubmit={handleSubmit}>
//         <input
//           ref={firstInputRef}
//           name="username"
//           value={form.username}
//           onChange={handleTextChange}
//           placeholder="Username"
//         />
//         {errors.username && <span>{errors.username}</span>}

//         <input
//           name="email"
//           type="email"
//           value={form.email}
//           onChange={handleTextChange}
//           placeholder="Email"
//         />
//         {errors.email && <span>{errors.email}</span>}

//         <input
//           name="password"
//           type="password"
//           value={form.password}
//           onChange={handleTextChange}
//           placeholder="Password"
//         />
//         {errors.password && <span>{errors.password}</span>}

//         <input
//           type="number"
//           value={form.age}
//           onChange={handleNumberChange}
//           placeholder="Age"
//         />
//         {errors.age && <span>{errors.age}</span>}

//         <label>
//           <input
//             type="checkbox"
//             checked={form.acceptTerms}
//             onChange={handleCheckboxChange}
//           />
//           Accept Terms
//         </label>
//         {errors.acceptTerms && <span>{errors.acceptTerms}</span>}

//         <button type="submit">Sign Up</button>
//       </form>
//     );
//   };

// ================================================================================

// LECTURE 2: DOM HANDLING AND TYPECASTING
// ========================================

// DOM ELEMENT TYPES HIERARCHY
// -----------------------------
//   EventTarget
//     └── Node
//           └── Element
//                 └── HTMLElement
//                       ├── HTMLInputElement  (.value, .checked, .type)
//                       ├── HTMLButtonElement (.disabled, .type)
//                       ├── HTMLFormElement   (.submit(), .reset())
//                       ├── HTMLDivElement
//                       ├── HTMLParagraphElement
//                       ├── HTMLSelectElement (.value, .options, .selectedIndex)
//                       ├── HTMLTextAreaElement (.value, .rows)
//                       ├── HTMLAnchorElement (.href, .target)
//                       └── HTMLImageElement  (.src, .alt, .width)

// GETTING DOM ELEMENTS
// ---------------------
//   // getElementById returns HTMLElement | null
//   const div = document.getElementById("myDiv");           // HTMLElement | null
//   const input = document.getElementById("myInput");       // HTMLElement | null

//   // querySelector returns Element | null
//   const h1 = document.querySelector("h1");               // Element | null
//   const btn = document.querySelector(".btn");            // Element | null

//   // querySelector with generic - more specific type
//   const input2 = document.querySelector<HTMLInputElement>("#myInput"); // HTMLInputElement | null
//   const select = document.querySelector<HTMLSelectElement>("#mySelect"); // HTMLSelectElement | null

// TYPECASTING / TYPE ASSERTIONS
// -------------------------------
//   // Method 1: 'as' keyword (recommended)
//   const input = document.getElementById("myInput") as HTMLInputElement;
//   console.log(input.value);      // OK - HTMLInputElement has .value
//   console.log(input.checked);    // OK - HTMLInputElement has .checked

//   // Method 2: Angle bracket (NOT usable in .tsx files)
//   const input2 = <HTMLInputElement>document.getElementById("myInput");

//   // Method 3: Non-null assertion (if you know it exists)
//   const input3 = document.getElementById("myInput")!;
//   // Still HTMLElement type, just not null

//   // Combine: not null + specific type
//   const input4 = document.getElementById("myInput")! as HTMLInputElement;

// CREATING AND MANIPULATING DOM
// -------------------------------
//   // Create elements
//   const div: HTMLDivElement = document.createElement("div");
//   const p: HTMLParagraphElement = document.createElement("p");
//   const input: HTMLInputElement = document.createElement("input");
//   const img: HTMLImageElement = document.createElement("img");

//   // Set properties
//   div.className = "container";
//   div.id = "main";
//   p.textContent = "Hello TypeScript!";
//   input.type = "email";
//   input.placeholder = "Enter email";
//   img.src = "photo.jpg";
//   img.alt = "A photo";

//   // Append
//   div.appendChild(p);
//   document.body.appendChild(div);

// WORKING WITH EVENTS
// --------------------
//   const button = document.querySelector<HTMLButtonElement>("#submitBtn")!;

//   // Mouse events
//   button.addEventListener("click", (e: MouseEvent) => {
//     console.log(e.clientX, e.clientY); // MouseEvent specific properties
//     console.log(e.target);
//   });

//   // Keyboard events
//   document.addEventListener("keydown", (e: KeyboardEvent) => {
//     console.log(e.key, e.code, e.ctrlKey, e.shiftKey);
//   });

//   // Input events
//   const input = document.querySelector<HTMLInputElement>("#search")!;
//   input.addEventListener("input", (e: InputEvent) => {
//     console.log((e.target as HTMLInputElement).value);
//   });

//   // Drag events
//   const draggable = document.querySelector("#draggable")!;
//   draggable.addEventListener("dragstart", (e: DragEvent) => {
//     e.dataTransfer?.setData("text/plain", "dragged!");
//   });

// REACT IMPLEMENTATION - DOM TYPECASTING
// ----------------------------------------
//   import React, { useRef, useEffect } from 'react';

//   const DomExample: React.FC = () => {
//     // Typed refs
//     const divRef = useRef<HTMLDivElement>(null);
//     const inputRef = useRef<HTMLInputElement>(null);
//     const canvasRef = useRef<HTMLCanvasElement>(null);

//     useEffect(() => {
//       // Focus input on mount
//       inputRef.current?.focus();

//       // Access div dimensions
//       if (divRef.current) {
//         const { width, height } = divRef.current.getBoundingClientRect();
//         console.log(`Div size: ${width}x${height}`);
//       }

//       // Canvas drawing
//       if (canvasRef.current) {
//         const ctx = canvasRef.current.getContext("2d");
//         if (ctx) {
//           ctx.fillStyle = "blue";
//           ctx.fillRect(0, 0, 100, 100);
//         }
//       }
//     }, []);

//     return (
//       <div ref={divRef}>
//         <input ref={inputRef} placeholder="Auto-focused input" />
//         <canvas ref={canvasRef} width={200} height={200} />
//       </div>
//     );
//   };

// ================================================================================

// LECTURE 3: TYPEGUARD IN TYPESCRIPT
// =====================================

// WHAT IS A TYPE GUARD?
// ---------------------
// A type guard is a runtime check that narrows the type of a value within
// a code block. TypeScript uses this to provide better type information.

// BUILT-IN TYPE GUARDS
// ---------------------
//   // typeof guard
//   function process(value: string | number): void {
//     if (typeof value === "string") {
//       // Here TypeScript knows value is string
//       console.log(value.toUpperCase());
//     } else {
//       // Here TypeScript knows value is number
//       console.log(value.toFixed(2));
//     }
//   }

//   // instanceof guard
//   function handleError(error: unknown): void {
//     if (error instanceof Error) {
//       // error is Error type here
//       console.log(error.message, error.stack);
//     } else {
//       console.log("Unknown error");
//     }
//   }

//   // in operator guard
//   interface Car { drive(): void; }
//   interface Boat { sail(): void; }

//   function move(vehicle: Car | Boat): void {
//     if ("drive" in vehicle) {
//       vehicle.drive(); // TypeScript knows it's Car
//     } else {
//       vehicle.sail(); // TypeScript knows it's Boat
//     }
//   }

// CUSTOM TYPE GUARD FUNCTIONS
// -----------------------------
//   // Syntax: value is Type
//   function isString(value: unknown): value is string {
//     return typeof value === "string";
//   }

//   function isNumber(value: unknown): value is number {
//     return typeof value === "number" && !isNaN(value);
//   }

//   // Object type guard
//   interface Admin { role: "admin"; permissions: string[]; }
//   interface User { role: "user"; name: string; }

//   function isAdmin(user: Admin | User): user is Admin {
//     return user.role === "admin";
//   }

//   function handleUser(user: Admin | User): void {
//     if (isAdmin(user)) {
//       console.log("Admin permissions:", user.permissions);
//     } else {
//       console.log("User name:", user.name);
//     }
//   }

// COMPLEX TYPE GUARDS
// -------------------
//   interface ApiResponse {
//     data: unknown;
//     status: number;
//   }

//   interface UserData {
//     id: number;
//     name: string;
//     email: string;
//   }

//   // Guard for API response
//   function isUserData(data: unknown): data is UserData {
//     return (
//       typeof data === "object" &&
//       data !== null &&
//       "id" in data &&
//       "name" in data &&
//       "email" in data &&
//       typeof (data as UserData).id === "number" &&
//       typeof (data as UserData).name === "string" &&
//       typeof (data as UserData).email === "string"
//     );
//   }

//   // Guard for arrays
//   function isStringArray(arr: unknown): arr is string[] {
//     return (
//       Array.isArray(arr) &&
//       arr.every(item => typeof item === "string")
//     );
//   }

// ASSERTION FUNCTIONS (TypeScript 3.7+)
// ---------------------------------------
//   // Throws if condition not met
//   function assertIsString(value: unknown): asserts value is string {
//     if (typeof value !== "string") {
//       throw new Error(`Expected string, got ${typeof value}`);
//     }
//   }

//   function assertIsNotNull<T>(value: T | null): asserts value is T {
//     if (value === null) {
//       throw new Error("Value is null!");
//     }
//   }

//   let value: unknown = "hello";
//   assertIsString(value);
//   // From here, TypeScript treats value as string
//   console.log(value.toUpperCase()); // OK!

// REACT IMPLEMENTATION - TYPE GUARDS
// ------------------------------------
//   import React, { useState, useEffect } from 'react';

//   // Different response shapes
//   interface SuccessResponse<T> {
//     success: true;
//     data: T;
//   }

//   interface ErrorResponse {
//     success: false;
//     error: string;
//     code: number;
//   }

//   type ApiResult<T> = SuccessResponse<T> | ErrorResponse;

//   // Type guards
//   function isSuccess<T>(result: ApiResult<T>): result is SuccessResponse<T> {
//     return result.success === true;
//   }

//   function isError<T>(result: ApiResult<T>): result is ErrorResponse {
//     return result.success === false;
//   }

//   interface Post {
//     id: number;
//     title: string;
//     body: string;
//   }

//   const TypeGuardDemo: React.FC = () => {
//     const [result, setResult] = useState<ApiResult<Post[]> | null>(null);

//     const fetchPosts = async (): Promise<void> => {
//       try {
//         const response = await fetch("https://jsonplaceholder.typicode.com/posts");
//         const data = await response.json();
//         setResult({ success: true, data: data.slice(0, 3) });
//       } catch (error) {
//         setResult({ success: false, error: "Fetch failed", code: 500 });
//       }
//     };

//     if (!result) return <button onClick={fetchPosts}>Fetch Posts</button>;

//     if (isError(result)) {
//       return <p>Error {result.code}: {result.error}</p>;
//     }

//     if (isSuccess(result)) {
//       return (
//         <ul>
//           {result.data.map(post => (
//             <li key={post.id}>{post.title}</li>
//           ))}
//         </ul>
//       );
//     }

//     return null;
//   };

// ================================================================================

// LECTURE 4: TYPED PROMISE
// =========================

// PROMISE BASICS WITH TYPES
// --------------------------
//   // Promise<T> where T is the resolved value type
//   const promise: Promise<string> = new Promise((resolve, reject) => {
//     resolve("Hello!");  // resolves with string
//   });

//   promise.then((value: string) => {
//     console.log(value.toUpperCase()); // TypeScript knows it's string
//   });

//   // Promise that can fail
//   function fetchUser(id: number): Promise<User> {
//     return new Promise((resolve, reject) => {
//       if (id <= 0) {
//         reject(new Error("Invalid ID"));
//       } else {
//         resolve({ id, name: "Alice", email: "a@a.com", age: 25 });
//       }
//     });
//   }

// ASYNC/AWAIT WITH TYPES
// -----------------------
//   // Async function return type: Promise<T>
//   async function getUser(id: number): Promise<User> {
//     const response = await fetch(`/api/users/${id}`);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data: User = await response.json();
//     return data;
//   }

//   // Using the async function
//   async function main(): Promise<void> {
//     try {
//       const user: User = await getUser(1);
//       console.log(user.name);
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         console.error(error.message);
//       }
//     }
//   }

// PROMISE.ALL WITH TYPES
// -----------------------
//   async function fetchMultiple(): Promise<[User[], Product[], string]> {
//     const [users, products, config] = await Promise.all([
//       fetch("/api/users").then(r => r.json()) as Promise<User[]>,
//       fetch("/api/products").then(r => r.json()) as Promise<Product[]>,
//       fetch("/api/config").then(r => r.text()) as Promise<string>
//     ]);

//     return [users, products, config];
//   }

// CUSTOM PROMISE WRAPPER
// -----------------------
//   // Wrapper that handles errors gracefully
//   async function safeAsync<T>(
//     promise: Promise<T>
//   ): Promise<[T, null] | [null, Error]> {
//     try {
//       const data = await promise;
//       return [data, null];
//     } catch (error) {
//       return [null, error instanceof Error ? error : new Error(String(error))];
//     }
//   }

//   // Usage
//   async function example(): Promise<void> {
//     const [user, error] = await safeAsync(fetchUser(1));
//     if (error) {
//       console.error("Failed:", error.message);
//       return;
//     }
//     console.log(user?.name); // TypeScript knows user is User here
//   }

// REACT IMPLEMENTATION - TYPED PROMISES
// ---------------------------------------
//   import React, { useState, useEffect, useCallback } from 'react';

//   // Generic hook for data fetching
//   interface UseDataState<T> {
//     data: T | null;
//     loading: boolean;
//     error: string | null;
//   }

//   function useData<T>(fetchFn: () => Promise<T>): UseDataState<T> & { refetch: () => void } {
//     const [state, setState] = useState<UseDataState<T>>({
//       data: null,
//       loading: true,
//       error: null
//     });

//     const fetch = useCallback(async () => {
//       setState(prev => ({ ...prev, loading: true, error: null }));
//       try {
//         const data = await fetchFn();
//         setState({ data, loading: false, error: null });
//       } catch (e) {
//         setState({
//           data: null,
//           loading: false,
//           error: e instanceof Error ? e.message : "Unknown error"
//         });
//       }
//     }, [fetchFn]);

//     useEffect(() => { fetch(); }, [fetch]);

//     return { ...state, refetch: fetch };
//   }

//   interface Post {
//     id: number;
//     title: string;
//     userId: number;
//   }

//   async function fetchPosts(): Promise<Post[]> {
//     const response = await fetch("https://jsonplaceholder.typicode.com/posts");
//     return response.json();
//   }

//   const PostList: React.FC = () => {
//     const { data: posts, loading, error, refetch } = useData<Post[]>(fetchPosts);

//     if (loading) return <p>Loading...</p>;
//     if (error) return (
//       <div>
//         <p>Error: {error}</p>
//         <button onClick={refetch}>Retry</button>
//       </div>
//     );

//     return (
//       <ul>
//         {posts?.slice(0, 5).map(post => (
//           <li key={post.id}>{post.title}</li>
//         ))}
//       </ul>
//     );
//   };

// ================================================================================

// LECTURE 5: API CALLS IN TYPESCRIPT
// =====================================

// TYPED FETCH WRAPPER
// --------------------
//   // Generic typed fetch function
//   async function typedFetch<T>(
//     url: string,
//     options?: RequestInit
//   ): Promise<T> {
//     const response = await fetch(url, options);
    
//     if (!response.ok) {
//       throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//     }
    
//     return response.json() as Promise<T>;
//   }

//   // Usage with typed return
//   const users = await typedFetch<User[]>("/api/users");
//   const post = await typedFetch<Post>("/api/posts/1");

// COMPLETE API SERVICE
// ---------------------
//   // api/types.ts
//   interface User {
//     id: number;
//     name: string;
//     email: string;
//     username: string;
//   }

//   interface Post {
//     id: number;
//     userId: number;
//     title: string;
//     body: string;
//   }

//   interface ApiError {
//     message: string;
//     status: number;
//   }

//   // api/users.ts
//   const BASE_URL = "https://jsonplaceholder.typicode.com";

//   class UserApiService {
//     private baseUrl: string;

//     constructor(baseUrl: string) {
//       this.baseUrl = baseUrl;
//     }

//     async getAll(): Promise<User[]> {
//       return typedFetch<User[]>(`${this.baseUrl}/users`);
//     }

//     async getById(id: number): Promise<User> {
//       return typedFetch<User>(`${this.baseUrl}/users/${id}`);
//     }

//     async create(data: Omit<User, "id">): Promise<User> {
//       return typedFetch<User>(`${this.baseUrl}/users`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data)
//       });
//     }

//     async update(id: number, data: Partial<User>): Promise<User> {
//       return typedFetch<User>(`${this.baseUrl}/users/${id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data)
//       });
//     }

//     async delete(id: number): Promise<void> {
//       await typedFetch<void>(`${this.baseUrl}/users/${id}`, {
//         method: "DELETE"
//       });
//     }
//   }

//   export const userService = new UserApiService(BASE_URL);

// REACT IMPLEMENTATION - API CALLS
// ----------------------------------
//   import React, { useState, useEffect } from 'react';

//   // Types
//   interface User {
//     id: number;
//     name: string;
//     email: string;
//     username: string;
//     phone: string;
//     website: string;
//   }

//   // API service
//   const API_BASE = "https://jsonplaceholder.typicode.com";

//   const api = {
//     users: {
//       getAll: (): Promise<User[]> =>
//         fetch(`${API_BASE}/users`).then(r => r.json()),
//       getById: (id: number): Promise<User> =>
//         fetch(`${API_BASE}/users/${id}`).then(r => r.json()),
//     }
//   };

//   // State types
//   type Status = "idle" | "loading" | "success" | "error";

//   interface State<T> {
//     status: Status;
//     data: T | null;
//     error: string | null;
//   }

//   // Component
//   const UserDirectory: React.FC = () => {
//     const [state, setState] = useState<State<User[]>>({
//       status: "idle",
//       data: null,
//       error: null
//     });

//     const [selectedUser, setSelectedUser] = useState<User | null>(null);
//     const [userState, setUserState] = useState<State<User>>({
//       status: "idle",
//       data: null,
//       error: null
//     });

//     useEffect(() => {
//       setState({ status: "loading", data: null, error: null });
      
//       api.users.getAll()
//         .then(users => setState({ status: "success", data: users, error: null }))
//         .catch(err => setState({
//           status: "error",
//           data: null,
//           error: err.message
//         }));
//     }, []);

//     const loadUser = async (id: number): Promise<void> => {
//       setUserState({ status: "loading", data: null, error: null });
//       try {
//         const user = await api.users.getById(id);
//         setUserState({ status: "success", data: user, error: null });
//         setSelectedUser(user);
//       } catch (err) {
//         setUserState({
//           status: "error",
//           data: null,
//           error: err instanceof Error ? err.message : "Unknown error"
//         });
//       }
//     };

//     return (
//       <div>
//         {state.status === "loading" && <p>Loading users...</p>}
//         {state.status === "error" && <p>Error: {state.error}</p>}
//         {state.status === "success" && state.data && (
//           <div>
//             <ul>
//               {state.data.map(user => (
//                 <li key={user.id} onClick={() => loadUser(user.id)}>
//                   {user.name} - {user.email}
//                 </li>
//               ))}
//             </ul>
//             {selectedUser && (
//               <div>
//                 <h3>{selectedUser.name}</h3>
//                 <p>Email: {selectedUser.email}</p>
//                 <p>Phone: {selectedUser.phone}</p>
//                 <p>Website: {selectedUser.website}</p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     );
//   };

//   export default UserDirectory;

// INTERVIEW QUESTIONS - CHAPTER 5:
// ----------------------------------
// Q1: How do you type fetch API responses in TypeScript?
// A: Use generics with your fetch wrapper: async function fetchData<T>(url: string): Promise<T>
//    Then cast: return response.json() as Promise<T>. Always validate the shape
//    with type guards before trusting the data.

// Q2: What is the type of event.target in TypeScript?
// A: event.target is typed as EventTarget | null, which is a very broad type.
//    To access specific properties like .value, you need to cast it:
//    (event.target as HTMLInputElement).value

// Q3: How do you handle errors in async/await with proper TypeScript types?
// A: In try/catch, the error is typed as 'unknown'. You must narrow it:
//    catch (e: unknown) { if (e instanceof Error) { e.message } }
//    Never use 'any' for caught errors.

// Q4: What is a type guard and why is it important for API data?
// A: A type guard is a runtime check that narrows types. For API data typed as
//    'unknown', you need guards to verify the shape before using it safely.
//    function isUser(data: unknown): data is User { return ... }

// ================================================================================
// END OF CHAPTER 5
// ================================================================================