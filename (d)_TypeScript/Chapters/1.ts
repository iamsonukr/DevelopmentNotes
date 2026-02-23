// ================================================================================
//            TYPESCRIPT COMPLETE COURSE - CHAPTER 1: INTRODUCTION & SETUP
// ================================================================================

// LECTURE 1: INTRODUCTION TO TYPESCRIPT
// ======================================

// WHAT IS TYPESCRIPT?
// -------------------
// TypeScript is a strongly typed, object-oriented, compiled superset of JavaScript
// developed and maintained by Microsoft. It adds optional static typing and
// class-based object-oriented programming to the language.

// KEY POINTS:
// - TypeScript = JavaScript + Type System
// - TypeScript code compiles down to plain JavaScript
// - Any valid JavaScript is also valid TypeScript
// - TypeScript catches errors at compile time, not runtime
// - File extension: .ts (or .tsx for React)

// WHY USE TYPESCRIPT?
// -------------------
// 1. Early Error Detection - catch bugs before running code
// 2. Better IDE Support - autocompletion, inline docs, refactoring
// 3. Improved Code Readability - types serve as documentation
// 4. Scalability - easier to manage large codebases
// 5. Modern JavaScript Features - supports latest ECMAScript features

// TYPESCRIPT vs JAVASCRIPT
// -------------------------
// JavaScript:
//   function add(a, b) {
//     return a + b;
//   }
//   add(5, "hello"); // No error, returns "5hello" (runtime bug!)

// TypeScript:
//   function add(a: number, b: number): number {
//     return a + b;
//   }
//   add(5, "hello"); // ERROR at compile time - Argument of type 'string'
//                    // is not assignable to parameter of type 'number'

// HOW TYPESCRIPT WORKS:
// ---------------------
//   .ts file --> TypeScript Compiler (tsc) --> .js file --> Browser/Node.js

// INTERVIEW QUESTIONS - LECTURE 1:
// ---------------------------------
// Q1: What is TypeScript and why is it used?
// A: TypeScript is a superset of JavaScript that adds static typing. It helps
//    catch errors at compile time, improves IDE support, and makes large codebases
//    more maintainable.

// Q2: What is the difference between TypeScript and JavaScript?
// A: JavaScript is dynamically typed (types checked at runtime), while TypeScript
//    is statically typed (types checked at compile time). TypeScript compiles to
//    JavaScript and adds features like interfaces, generics, enums, and decorators.

// Q3: Is TypeScript replacing JavaScript?
// A: No. TypeScript compiles to JavaScript. Browsers/Node.js still run JavaScript.
//    TypeScript is a development tool that makes writing JavaScript safer.

// Q4: What are the disadvantages of TypeScript?
// A: - Requires compilation step
//    - Learning curve for type system
//    - More verbose code
//    - Third-party library type definitions may be missing
//    - Increased initial setup time

// ================================================================================

// LECTURE 2: TYPESCRIPT SETUP
// ============================

// INSTALLATION
// ------------
// Step 1: Install Node.js from https://nodejs.org

// Step 2: Install TypeScript globally
//   npm install -g typescript

// Step 3: Verify installation
//   tsc --version
//   // Output: Version 5.x.x

// COMPILING TYPESCRIPT
// --------------------
//   // Create a file: hello.ts
//   const message: string = "Hello TypeScript!";
//   console.log(message);

//   // Compile
//   tsc hello.ts

//   // This creates hello.js - run it
//   node hello.js

// WATCH MODE (Auto-compile on save)
// ----------------------------------
//   tsc hello.ts --watch
//   // or
//   tsc --watch

// RUNNING TS DIRECTLY (Development)
// -----------------------------------
//   // Install ts-node for running TypeScript directly
//   npm install -g ts-node

//   // Run without compiling
//   ts-node hello.ts

// TYPESCRIPT IN REACT PROJECT
// -----------------------------
//   // Create React app with TypeScript template
//   npx create-react-app my-app --template typescript

//   // Or with Vite (recommended - faster)
//   npm create vite@latest my-app -- --template react-ts
//   cd my-app
//   npm install
//   npm run dev

// FILE STRUCTURE IN REACT + TS PROJECT:
// --------------------------------------
//   my-app/
//   ├── src/
//   │   ├── App.tsx          <-- .tsx for React components
//   │   ├── main.tsx
//   │   └── components/
//   │       └── Button.tsx
//   ├── tsconfig.json
//   └── package.json

// INTERVIEW QUESTIONS - LECTURE 2:
// ---------------------------------
// Q1: How do you set up TypeScript in a project?
// A: Install TypeScript via npm (npm install -g typescript or npm install --save-dev
//    typescript), create a tsconfig.json file, write .ts files, and compile using
//    tsc command.

// Q2: What is ts-node?
// A: ts-node is a TypeScript execution engine for Node.js that allows running
//    TypeScript files directly without pre-compiling them to JavaScript.

// Q3: What is the difference between .ts and .tsx files?
// A: .ts files are regular TypeScript files. .tsx files support JSX syntax and
//    are used for React components that include HTML-like markup.

// ================================================================================

// LECTURE 3: TYPESCRIPT CONFIG FILE (tsconfig.json)
// ===================================================

// WHAT IS tsconfig.json?
// -----------------------
// tsconfig.json is the TypeScript configuration file that tells the TypeScript
// compiler how to compile your project. It defines compiler options, which files
// to include/exclude, and project settings.

// GENERATE tsconfig.json
// -----------------------
//   tsc --init
//   // Creates a tsconfig.json with common options commented

// BASIC tsconfig.json STRUCTURE
// -------------------------------
//   {
//     "compilerOptions": {
//       "target": "ES6",
//       "module": "commonjs",
//       "strict": true,
//       "outDir": "./dist",
//       "rootDir": "./src",
//       "esModuleInterop": true,
//       "skipLibCheck": true,
//       "forceConsistentCasingInFileNames": true
//     },
//     "include": ["src/**/*"],
//     "exclude": ["node_modules", "dist"]
//   }

// KEY COMPILER OPTIONS EXPLAINED
// --------------------------------

// target: "ES6"
//   - Specifies ECMAScript version for compiled output
//   - Options: "ES5", "ES6"/"ES2015", "ES2017", "ES2020", "ESNext"
//   - Use "ES6" for modern browsers, "ES5" for older ones

// module: "commonjs"
//   - Module system for output
//   - "commonjs" for Node.js, "ES2015"/"ESNext" for browsers/bundlers

// strict: true
//   - Enables ALL strict type checking options
//   - HIGHLY RECOMMENDED - enables:
//     * strictNullChecks: variables can't be null/undefined unless specified
//     * noImplicitAny: variables must have explicit types
//     * strictFunctionTypes: strict function type checking
//     * and more...

// outDir: "./dist"
//   - Output directory for compiled JS files

// rootDir: "./src"
//   - Root directory of TypeScript source files

// esModuleInterop: true
//   - Enables interoperability between CommonJS and ES Modules
//   - Allows: import React from 'react' (instead of import * as React)

// skipLibCheck: true
//   - Skips type checking of declaration files (.d.ts)
//   - Speeds up compilation

// sourceMap: true
//   - Generates .map files for debugging TypeScript in browser devtools

// noImplicitAny: true
//   - Error when TypeScript can't infer type (defaults to 'any')
//   - Forces explicit type annotations

// REACT PROJECT tsconfig.json
// -----------------------------
//   {
//     "compilerOptions": {
//       "target": "ES5",
//       "lib": ["DOM", "DOM.Iterable", "ESNext"],
//       "allowJs": true,
//       "skipLibCheck": true,
//       "esModuleInterop": true,
//       "allowSyntheticDefaultImports": true,
//       "strict": true,
//       "forceConsistentCasingInFileNames": true,
//       "noFallthroughCasesInSwitch": true,
//       "module": "ESNext",
//       "moduleResolution": "node",
//       "resolveJsonModule": true,
//       "isolatedModules": true,
//       "noEmit": true,
//       "jsx": "react-jsx"
//     },
//     "include": ["src"]
//   }

// IMPORTANT OPTION: jsx
//   - "react": Compiles JSX to React.createElement() calls
//   - "react-jsx": Uses new JSX transform (React 17+), no need to import React
//   - "preserve": Keeps JSX as-is for other tools to handle

// INCLUDE vs EXCLUDE vs FILES
// -----------------------------
//   {
//     "include": ["src/**/*"],     // Glob patterns to include
//     "exclude": ["node_modules"], // Glob patterns to exclude
//     "files": ["src/index.ts"]   // Specific files to include
//   }

// PATHS ALIAS (useful for clean imports)
// ----------------------------------------
//   {
//     "compilerOptions": {
//       "baseUrl": ".",
//       "paths": {
//         "@components/*": ["src/components/*"],
//         "@utils/*": ["src/utils/*"]
//       }
//     }
//   }

//   // Now you can write:
//   import Button from '@components/Button';
//   // Instead of:
//   import Button from '../../components/Button';

// INTERVIEW QUESTIONS - LECTURE 3:
// ---------------------------------
// Q1: What is tsconfig.json and why is it important?
// A: tsconfig.json is the TypeScript compiler configuration file. It specifies
//    compiler options (like target JS version, strict mode, output directory),
//    which files to compile, and project structure settings. Without it, you'd
//    have to pass all options via command line.

// Q2: What does "strict: true" do in tsconfig.json?
// A: It enables a group of strict type-checking options including:
//    strictNullChecks (prevents null/undefined assignments), noImplicitAny
//    (requires explicit type annotations), strictFunctionTypes, and others.
//    It's best practice to always enable it.

// Q3: What is the difference between "target" and "lib" in tsconfig?
// A: "target" specifies the ECMAScript version for the OUTPUT JavaScript.
//    "lib" specifies which built-in API type definitions are available during
//    compilation (e.g., DOM APIs, ES6 APIs). You can target ES5 output but
//    still use ES6 APIs if "lib" includes them.

// Q4: What is "esModuleInterop" and why might you need it?
// A: It enables compatibility between CommonJS and ES module systems. With it,
//    you can use default imports (import React from 'react') instead of namespace
//    imports (import * as React from 'react'). Most React projects need this.

// ================================================================================
// END OF CHAPTER 1
// ================================================================================