# Complete React Interview Notes

## 🔄 React Lifecycle & Hooks

### useEffect Patterns
```javascript
// componentDidMount equivalent
useEffect(() => {
    // Runs once after initial render
    fetchData();
}, []); // Empty dependency array

// componentDidUpdate equivalent
useEffect(() => {
    // Runs after every render when dependency changes
    updateUI();
}, [dependency]);

// componentWillUnmount equivalent
useEffect(() => {
    const subscription = subscribe();
    return () => {
        // Cleanup function
        subscription.unsubscribe();
    };
}, []);

// Conditional effects
useEffect(() => {
    if (condition) {
        performAction();
    }
}, [condition]);
```

### Custom Hooks
```javascript
// Custom hook for API calls
function useApi(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false));
    }, [url]);
    
    return { data, loading, error };
}

// Custom hook for local storage
function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
    });
    
    const setStoredValue = (newValue) => {
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
    };
    
    return [value, setStoredValue];
}
```

## 🏗️ Component Architecture

### Stateful vs Stateless Components

**Stateful Components:**
- Manage their own internal state
- Can be class components or functional components with hooks
- Handle data that changes over time
- Examples: Forms, counters, data fetchers

```javascript
// Stateful functional component
function Counter() {
    const [count, setCount] = useState(0);
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
}
```

**Stateless Components:**
- Pure presentation components
- Rely only on props
- Easier to test and reason about
- Examples: Headers, buttons, display components

```javascript
// Stateless functional component
function Button({ onClick, children, variant = 'primary' }) {
    return (
        <button 
            className={`btn btn-${variant}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
```

### Prop Drilling Solutions

**1. Context API**
```javascript
// Create context
const ThemeContext = createContext();

// Provider
function App() {
    const [theme, setTheme] = useState('light');
    
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <Header />
            <Main />
        </ThemeContext.Provider>
    );
}

// Consumer
function Button() {
    const { theme } = useContext(ThemeContext);
    return <button className={theme}>Click me</button>;
}
```

**2. Component Composition**
```javascript
// Instead of prop drilling
function App() {
    const user = { name: 'John' };
    return (
        <Layout>
            <Header user={user} />
            <Sidebar user={user} />
            <Content user={user} />
        </Layout>
    );
}

// Use composition
function App() {
    const user = { name: 'John' };
    return (
        <Layout 
            header={<Header user={user} />}
            sidebar={<Sidebar user={user} />}
            content={<Content user={user} />}
        />
    );
}
```

## ⚡ Performance Optimization

### Memoization Techniques

**React.memo**
```javascript
// Prevents re-renders when props haven't changed
const ExpensiveComponent = React.memo(function ExpensiveComponent({ data, onClick }) {
    return (
        <div>
            {data.map(item => <div key={item.id}>{item.name}</div>)}
        </div>
    );
});

// Custom comparison function
const MyComponent = React.memo(function MyComponent(props) {
    return <div>{props.name}</div>;
}, (prevProps, nextProps) => {
    return prevProps.name === nextProps.name;
});
```

**useMemo**
```javascript
function ExpensiveCalculation({ items, filter }) {
    // Only recalculates when items or filter changes
    const filteredItems = useMemo(() => {
        return items.filter(item => item.category === filter);
    }, [items, filter]);
    
    const expensiveValue = useMemo(() => {
        return items.reduce((sum, item) => sum + item.price, 0);
    }, [items]);
    
    return <div>{/* render logic */}</div>;
}
```

**useCallback**
```javascript
function Parent({ items }) {
    const [count, setCount] = useState(0);
    
    // Without useCallback, this creates a new function on every render
    const handleClick = useCallback((id) => {
        // Handle click logic
        console.log('Clicked item:', id);
    }, []); // No dependencies, function never changes
    
    const handleItemClick = useCallback((id) => {
        setCount(prevCount => prevCount + 1);
        // Other logic that depends on current state
    }, [count]); // Recreates when count changes
    
    return (
        <div>
            {items.map(item => (
                <Child 
                    key={item.id} 
                    item={item} 
                    onClick={handleClick} 
                />
            ))}
        </div>
    );
}
```

### Code Splitting & Lazy Loading
```javascript
// Route-based code splitting
const Home = lazy(() => import('./Home'));
const About = lazy(() => import('./About'));
const Contact = lazy(() => import('./Contact'));

function App() {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </Suspense>
        </Router>
    );
}

// Component-based lazy loading
const HeavyComponent = lazy(() => 
    import('./HeavyComponent').then(module => ({
        default: module.HeavyComponent
    }))
);
```

### React 18 Concurrent Features
```javascript
// useTransition for non-urgent updates
function SearchComponent() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isPending, startTransition] = useTransition();
    
    const handleSearch = (value) => {
        setQuery(value); // Urgent update
        
        startTransition(() => {
            // Non-urgent update
            setResults(performSearch(value));
        });
    };
    
    return (
        <div>
            <input onChange={(e) => handleSearch(e.target.value)} />
            {isPending && <div>Searching...</div>}
            <SearchResults results={results} />
        </div>
    );
}

// useDeferredValue
function SearchResults({ query }) {
    const deferredQuery = useDeferredValue(query);
    const results = useMemo(() => 
        performExpensiveSearch(deferredQuery), 
        [deferredQuery]
    );
    
    return <div>{/* render results */}</div>;
}
```

## 🔄 State Management

### useState Patterns
```javascript
// Functional updates
const [count, setCount] = useState(0);
setCount(prevCount => prevCount + 1);

// Object state updates
const [user, setUser] = useState({ name: '', email: '' });
setUser(prevUser => ({ ...prevUser, name: 'John' }));

// Array state updates
const [items, setItems] = useState([]);
setItems(prevItems => [...prevItems, newItem]);
setItems(prevItems => prevItems.filter(item => item.id !== idToRemove));
```

### useReducer for Complex State
```javascript
const initialState = { count: 0, error: null, loading: false };

function reducer(state, action) {
    switch (action.type) {
        case 'INCREMENT':
            return { ...state, count: state.count + 1 };
        case 'DECREMENT':
            return { ...state, count: state.count - 1 };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    return (
        <div>
            <p>Count: {state.count}</p>
            <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
            <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
        </div>
    );
}
```

## 🔍 SEO & Performance

### Server-Side Rendering (SSR)
**Challenges:**
- SPAs render content client-side with JavaScript
- Search engines may struggle with JavaScript-heavy content
- Lack of unique URLs for different views
- Dynamic meta tags not updated properly

**Solutions:**
```javascript
// Next.js SSR example
export async function getServerSideProps(context) {
    const data = await fetchData();
    
    return {
        props: {
            data,
        },
    };
}

// Static Site Generation (SSG)
export async function getStaticProps() {
    const posts = await fetchPosts();
    
    return {
        props: {
            posts,
        },
        revalidate: 60, // ISR - regenerate every 60 seconds
    };
}
```

### Meta Tags Management
```javascript
// Using Next.js Head component
import Head from 'next/head';

function BlogPost({ post }) {
    return (
        <>
            <Head>
                <title>{post.title}</title>
                <meta name="description" content={post.excerpt} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.excerpt} />
                <meta property="og:image" content={post.image} />
            </Head>
            <article>
                <h1>{post.title}</h1>
                <p>{post.content}</p>
            </article>
        </>
    );
}
```

## 🎯 Advanced Patterns

### Higher-Order Components (HOCs)
```javascript
// Authentication HOC
function withAuth(WrappedComponent) {
    return function AuthenticatedComponent(props) {
        const { user, loading } = useAuth();
        
        if (loading) return <div>Loading...</div>;
        if (!user) return <div>Please log in</div>;
        
        return <WrappedComponent {...props} user={user} />;
    };
}

// Usage
const ProtectedProfile = withAuth(Profile);
```

### Render Props Pattern
```javascript
function DataFetcher({ url, children }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false));
    }, [url]);
    
    return children({ data, loading, error });
}

// Usage
function App() {
    return (
        <DataFetcher url="/api/users">
            {({ data, loading, error }) => {
                if (loading) return <div>Loading...</div>;
                if (error) return <div>Error: {error.message}</div>;
                return <UserList users={data} />;
            }}
        </DataFetcher>
    );
}
```

### Compound Components
```javascript
// Modal compound component
const Modal = ({ children, isOpen, onClose }) => {
    if (!isOpen) return null;
    
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

Modal.Header = ({ children }) => <div className="modal-header">{children}</div>;
Modal.Body = ({ children }) => <div className="modal-body">{children}</div>;
Modal.Footer = ({ children }) => <div className="modal-footer">{children}</div>;

// Usage
function App() {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <Modal.Header>
                <h2>Confirm Action</h2>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to continue?</p>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={() => setIsOpen(false)}>Cancel</button>
                <button onClick={handleConfirm}>Confirm</button>
            </Modal.Footer>
        </Modal>
    );
}
```

## 🧪 Testing Patterns

### Component Testing
```javascript
// Using React Testing Library
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('renders counter and increments on click', async () => {
    const user = userEvent.setup();
    render(<Counter />);
    
    const button = screen.getByRole('button', { name: /increment/i });
    const count = screen.getByText(/count: 0/i);
    
    expect(count).toBeInTheDocument();
    
    await user.click(button);
    
    expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
});

// Testing async components
test('displays user data after loading', async () => {
    render(<UserProfile userId="123" />);
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    
    await waitFor(() => {
        expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    });
});
```

## 🔧 Error Handling

### Error Boundaries
```javascript
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    
    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
        // Log to error reporting service
    }
    
    render() {
        if (this.state.hasError) {
            return this.props.fallback || <h1>Something went wrong.</h1>;
        }
        
        return this.props.children;
    }
}

// Functional error boundary (React 18+)
function ErrorBoundary({ children, fallback }) {
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const handleError = (error) => setError(error);
        window.addEventListener('error', handleError);
        return () => window.removeEventListener('error', handleError);
    }, []);
    
    if (error) {
        return fallback || <div>Something went wrong</div>;
    }
    
    return children;
}
```

## 🎯 Common Interview Questions & Answers

### 1. What is Virtual DOM and how does it work?
Virtual DOM is a JavaScript representation of the real DOM. React creates a virtual copy of the DOM in memory, compares it with the previous version (diffing), and updates only the changed parts (reconciliation).

### 2. Explain React Fiber
React Fiber is React's reconciliation algorithm that breaks down rendering work into units that can be paused, resumed, and prioritized. It enables concurrent features like time slicing and Suspense.

### 3. What's the difference between controlled and uncontrolled components?
- **Controlled**: Form data is handled by React state
- **Uncontrolled**: Form data is handled by the DOM itself using refs

```javascript
// Controlled
function ControlledInput() {
    const [value, setValue] = useState('');
    return <input value={value} onChange={e => setValue(e.target.value)} />;
}

// Uncontrolled
function UncontrolledInput() {
    const inputRef = useRef();
    const handleSubmit = () => console.log(inputRef.current.value);
    return <input ref={inputRef} />;
}
```

### 4. When to use useCallback vs useMemo?
- **useCallback**: Memoize functions to prevent child re-renders
- **useMemo**: Memoize expensive calculations or object references

### 5. What are React keys and why are they important?
Keys help React identify which items have changed, are added, or removed. They should be stable, predictable, and unique among siblings.

```javascript
// Good
{users.map(user => <User key={user.id} user={user} />)}

// Bad
{users.map((user, index) => <User key={index} user={user} />)}
```

## 📝 Best Practices

1. **Keep components small and focused**
2. **Use TypeScript for better type safety**
3. **Implement proper error boundaries**
4. **Use meaningful component and variable names**
5. **Avoid inline functions in render methods**
6. **Use React DevTools for debugging**
7. **Implement proper loading and error states**
8. **Follow the principle of least privilege for state**
9. **Use absolute imports for better code organization**
10. **Implement proper accessibility (a11y) features**