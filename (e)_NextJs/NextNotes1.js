// getServerSideprop , getStaticProp, getStaticProp what are these?
// These are Next.js Pages Router data-fetching methods used to decide when and how your data is fetched and pages are rendered.
// 👉 They only work in the Pages Router (pages/ fold

// getServerSideProps = server render every request
// getStaticProps = build-time static render
// getStaticPaths = pre-generate dynamic static routes

// getServerSideProps (SSR) -------------
// 📌 Meaning:

// Fetch data on every request

// Runs:

// 🟢 Server
// 🟢 Every time user visits page
// Use when:
// ✔ Real-time data
// ✔ Auth pages
// ✔ Dashboard
// ✔ Payments
// ✔ Frequently changing data
// ❌ Downsides:
// Slower than static
// Server runs every request

// ✅ 2️⃣ getStaticProps (SSG) -------------
// 📌 Meaning:
// Fetch data at build time
// Runs:
// 🟢 Server
// 🔵 Only during build (npm run build)
// getStaticPaths (for dynamic routes)
// Used with getStaticProps for dynamic routes.

// | Feature        | getServerSideProps | getStaticProps | getStaticPaths       |
// | -------------- | ------------------ | -------------- | -------------------- |
// | When runs      | Every request      | Build time     | Build time           |
// | Speed          | Medium             | Fastest ⚡      | Fast                |
// | SEO            | Good               | Excellent      | Excellent            |
// | Data freshness | Always latest      | Static         | Static               |
// | Use case       | Dashboard          | Blog           | Dynamic blog/product |


// SSG, SSR, CSR, ISR
// CSR — Client Side Rendering
// Everything renders in the browser (client)
// useEffect(() => {
//   fetch("/api/data").then(res => res.json()).then(setData);
// }, []);

// SSR — Server Side Rendering
// HTML generated on every request on server
// Request → server fetch → render HTML → send → hydrate
// getServerSideProps()

// SSG — Static Site Generation
// Page generated once at build time
// Build → generate HTML → CDN → serve instantly
// getStaticProps()

// ISR — Incremental Static Regeneration
// Static page auto-updates after some time 
// Build static → serve → after X sec → regenerate in background
// getStaticProps() with revalidate
// return {
//   props: { data },
//   revalidate: 60
// }

// fetch(url, { cache: "no-store" })   // SSR
// fetch(url, { cache: "force-cache" }) // SSG
// fetch(url, { next: { revalidate: 60 } }) // ISR


// | Type | Where render       | When render   | Speed      | SEO  | Use case   |
// | ---- | ------------------ | ------------- | ---------- | ---- | ---------- |
// | CSR  | Browser            | After load    | Slow first | Poor | Dashboard  |
// | SSR  | Server             | Every request | Medium     | Good | Real-time  |
// | SSG  | Build time         | Once          | Fastest ⚡  | Best | Blog       |
// | ISR  | Build + background | Timed         | Fast       | Best | E-commerce |



// What is Hydration?----------------------
// 👉 Definition

// Hydration is the process where React attaches JavaScript (events + state) to server-rendered HTML to make it interactive.
// Hydration is converting server-rendered static HTML into a fully interactive React application on the client.
// When using SSR/SSG, the server sends: ready-made HTML
// React hydrates
// matches HTML
// attaches event listeners
// initializes state
// activates hooks

// What is a Hydration Issue?
// 👉 Definition
// A hydration issue happens when server HTML ≠ client-rendered HTML , Server and client generate different UI.

// | Term            | Meaning            |
// | --------------- | ------------------ |
// | Rendering       | Creating HTML      |
// | Hydration       | Adding JS behavior |
// | Hydration issue | HTML mismatch      |


// Hydration is the process where React attaches JavaScript, event listeners, and state to HTML that was already rendered on the server, making the page fully interactive.
// When using SSR or SSG, the server first sends static HTML for fast loading. Then React runs in the browser and “hydrates” that HTML to enable interactivity like clicks, state updates, and hooks.

// Hydration Issue (Hydration Mismatch)

// A hydration issue occurs when the HTML generated on the server is different from what React renders on the client.
// React expects both outputs to match. If they don’t, it throws a hydration error.

// Error example:
// Hydration failed because the initial UI does not match what was rendered on the server

// Common Causes of Hydration Issues

// Random values
// Math.random()
// Date/time
// new Date()
// Browser-only APIs
// window, document, localStorage
// Conditional rendering differences between server and client
// Different data fetched on server and client

// How to Fix Hydration Issues

// • Use useEffect for client-only code
// • Avoid random/date values during render
// • Keep server and client output same
// • Disable SSR for specific components if needed



// React Server Components (RSC)--------------------------

// React Server Components are components that run only on the server instead of the browser.
// They render on the server and send only HTML (not JavaScript) to the client.
// This makes the app faster and smaller because less JS is downloaded.

// React Server Components = Server-rendered components with zero client-side JavaScript


// SSR VS CSR

// CSR (Client-Side Rendering)
// Definition:

// Client-Side Rendering means the browser renders the page using JavaScript after loading.
// The server sends an almost empty HTML file and React builds the UI in the browser.

// Flow:
// Browser requests page
// Server sends empty HTML + JS
// JS loads
// React fetches data
// React renders UI

// SSR (Server-Side Rendering)
// Definition:

// Server-Side Rendering means HTML is generated on the server for every request and sent to the browser.
// The page is already ready when it reaches the user.

// Flow:
// Browser requests page
// Server fetches data
// Server renders HTML
// Sends ready HTML
// React hydrates

// Difference Between SSR and CSR
// ✅ SSR (Server-Side Rendering)

// SSR stands for Server-Side Rendering.
// In SSR, the page is rendered on the server before being sent to the browser.

// The server generates complete HTML and sends it to the client, so the page loads with content already visible.

// It is more SEO friendly because search engines can easily read the pre-rendered HTML.

// User interactivity is slightly delayed because hydration happens after the page loads.

// It consumes more server resources since rendering happens on every request.

// It gives better performance on low-powered devices because less JavaScript runs on the client.

// It may require more server capacity to handle multiple rendering requests.

// ✅ CSR (Client-Side Rendering)

// CSR stands for Client-Side Rendering.
// In CSR, rendering happens inside the browser using JavaScript.

// The server sends an almost empty HTML file and JavaScript builds the UI after loading.

// It is less SEO friendly because content is generated after JavaScript execution.

// User interactivity is highly dynamic and fast after the app loads.

// It consumes more client resources since the browser handles rendering.

// It may not perform well on low-powered devices because heavy JavaScript runs on the client.

// It does not require heavy server resources for rendering.

//  What is partial rendering and selective rendering



// Partial hydration-----------------------------------

// Definition:

// Partial Hydration means only some components of the page are hydrated, and the rest are never hydrated at all.
// Non-interactive parts stay as static HTML forever.

// Selective Hydration
// Definition:
// Selective Hydration means all components will eventually hydrate, but React chooses which ones to hydrate first based on priority.
// Important or visible parts hydrate first, others later.

