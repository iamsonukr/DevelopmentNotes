{
    // __________________________________________________ Basic React _________________________

    // --------------------- react lifecycle -------------
    useEffect(() => {
        // componentDidMount
        return () => {
            // componentWillUnmount
        };
    }, []); // Empty deps = run once

    useEffect(() => {
        // componentDidUpdate
    }, [dependency]);

    // ------------------------------- Prop drilling -----------------------------
    //     What is prop drilling and how can you avoid it?
    // A: Prop drilling is passing props through intermediate components. Solutions:


    // Context API
    // Redux/State management
    // Component composition

    



}


{
    // ___________________________________ Optimization in react _________________________________________________________-

    //  Code Splitting and Lazy Loading
    // Use React.lazy and React Suspense to load components only when they’re needed.
    // Implement dynamic imports to load JavaScript files in smaller chunks, so the initial load is faster.
    // Use React Router's lazy() for route-based code-splitting.
    // javascript
    // Copy code
    const LazyComponent = React.lazy(() => import('./LazyComponent'));


    // 2. Memoization with React.memo and useMemo

    // useMemo memoizes a computed value and only recalculates it when its dependencies change. It's helpful for expensive calculations that you want to avoid re-running on every render.

    // useCallback memoizes a function definition, so the same function instance is returned unless its dependencies change. It’s especially useful when passing functions as props to child components that rely on referential equality.

    // React.memo: Wraps functional components to prevent unnecessary re-renders if the props haven’t changed.
    // useMemo: Memoizes values to prevent expensive computations on each render.
    // useCallback: Memoizes callback functions, useful when passing functions as props to child components.
    // javascript
    // Copy code
    const MemoizedComponent = React.memo(MyComponent);
    const expensiveCalculation = useMemo(() => computeExpensiveValue(data), [data]);
    const memoizedCallback = useCallback(() => doSomething(a, b), [a, b]);

    // useMemo for expensive calculations
    // const memoizedValue = useMemo(() => computeExpensive(a, b), [a, b]);

    // useCallback for function references
    // const memoizedCallback = useCallback(
    //     () => doSomething(a, b),
    //     [a, b]
    // );


    // React.memo
    // React.memo is a higher-order component that can help improve performance by memoizing functional components. It allows React to skip re-rendering the component if its props haven’t changed. This is especially useful for optimizing functional components that receive the same props frequently, as it prevents unnecessary renders.

    // How React.memo Works
    // React.memo wraps a functional component and compares its previous props with the new props.
    // If the props haven’t changed, React will skip re-rendering that component.
    // If the props have changed, the component re-renders as usual.

    // 3. Optimize Component Re-Renders
    // Keep your component hierarchy shallow to avoid excessive prop drilling.
    // Use React context carefully, as it can trigger re-renders if not managed correctly.
    // Break down components into smaller pieces to allow React to re-render only necessary components.


    // 4. Using shouldComponentUpdate in Class Components
    // Implement shouldComponentUpdate to avoid re-renders if the new props or state are the same as the previous ones.
    // Alternatively, use PureComponent for components that can avoid re-rendering when props and state are shallowly equal.


    // 5. Reduce Bundle Size
    // Tree-shaking: Import only the specific functions or components you need, especially from large libraries like lodash, moment, etc.
    // Use webpack or Rollup to remove unused code.
    // Avoid large dependencies if smaller alternatives are available.


    // 6. Optimize State Management
    // Use Context API for lightweight state needs, but for complex applications, use efficient libraries like Redux or Zustand.
    // Keep state local to specific components when possible to prevent unnecessary re-renders across the app.


    // 7. Use useTransition for Deferred Updates
    // In React 18 and above, useTransition defers state updates to avoid blocking interactions.
    // This is particularly helpful in scenarios like form submission, where non-urgent state updates can wait.
    // javascript
    // Copy code
    // const [isPending, startTransition] = useTransition();
    // startTransition(() => {
    //   setData(newData);
    // });


    // 8. Implement Proper Caching
    // Use libraries like React Query or SWR for caching server responses and synchronizing your UI with server data.
    // Cache heavy computations using libraries like memoize-one for functions that receive the same arguments frequently.


    // 9. Optimize Assets
    // Compress images and use modern formats (like WebP).
    // Lazy load images and other assets using libraries like react-lazy-load-image-component.
    // Use SVGs for icons where possible, as they scale well and are lightweight.


    // 10. Optimize API Calls
    // Combine API calls when possible to reduce the number of requests.
    // Use Debouncing or Throttling for frequent calls, such as in search inputs.
    // Cache data to avoid redundant requests and reduce load on the server.


    // 11. Use Service Workers for Caching
    // Service workers can cache static assets, improving load times for returning users.
    // Use libraries like Workbox to manage service workers easily.


    // 12. Avoid Anonymous Functions in JSX
    // Avoid inline functions and arrow functions in JSX, as they create new instances on every render, leading to unwanted re-renders.
    // Instead, define functions outside the JSX or use useCallback to memoize them.
    // javascript
    // Copy code
    // // Avoid this
    // <button onClick={() => handleClick(item.id)}>Click me</button>

    // // Use this
    // const handleClick = (id) => { /* logic */ };
    // <button onClick={() => handleClick(item.id)}>Click me</button>;


    // 13. Use Profiler for Performance Monitoring
    // React DevTools Profiler helps identify bottlenecks and monitor which components are re-rendering frequently.
    // This can reveal performance hotspots to help you pinpoint and address the most impactful issues.


    // 14. Server-Side Rendering (SSR) and Static Site Generation (SSG)
    // Use Next.js for SSR or SSG, especially for pages that don’t require frequent updates. It reduces load time and improves SEO.

}
{
    // ___________________________________ SEO in React _________________________________________________________-


    // Single Page Applications (SPAs) bring unique SEO challenges because they rely heavily on JavaScript to render content, often impacting how search engines crawl and index these pages. Here are some of the main SEO challenges for SPAs and how to address them:

    // 1. Content Rendering Issues
    // Challenge: SPAs typically render content on the client side using JavaScript, which search engines like Google can sometimes struggle to process. This can lead to incomplete or incorrect indexing.
    // Solution: Use Server-Side Rendering (SSR) with frameworks like Next.js or Nuxt.js to render content on the server before sending it to the client. Alternatively, consider hydration techniques to load essential content upfront.

    // 2. Lack of Unique URLs
    // Challenge: Many SPAs are structured as a single URL where content changes dynamically without updating the URL, making it difficult for search engines to index separate sections or pages.
    // Solution: Implement URL-based routing so that each "page" has a unique URL. Use the history.pushState() API or a routing library (e.g., React Router) to manage URLs, and make sure each route is accessible and has a unique URL structure.

    // 3. Meta Tags and Title Management
    // Challenge: Meta tags (e.g., title, description) are essential for SEO but don’t dynamically update with content changes in many SPAs, making it hard to provide search engines with correct metadata.
    // Solution: Use libraries like React Helmet or Vue Meta to dynamically manage meta tags and titles based on the current page or view. SSR frameworks like Next.js also handle meta tags on the server side, helping search engines see the right information.

}
{

    // ___________________________________ Statefull and stateless in react _________________________________________________________-

    // In React, the concepts of stateful and stateless components refer to how these components manage data internally.

    // 1. Stateful Components (Class Components)
    // Definition: Stateful components manage their own state. They store and handle data that might change over time and trigger updates in the UI when this data changes.
    // Structure: They were traditionally created using class components in older versions of React, though now functional components with hooks can also handle state.
    // Example: They use this.state in class components or useState hook in functional components.
    // Use case: Components that need to track changing data over time, like form inputs, toggles, and counters.
    // 2. Stateless Components (Functional Components)
    // Definition: Stateless components do not manage their own state. They rely entirely on props passed from parent components and don’t maintain or update any internal data.
    // Structure: They are generally written as functional components (using plain functions).
    // Example: They accept props as an argument and render based on those props without any internal state management.
    // Use case: Components that are purely presentational or display-only, like headers, footers, or static content.
}