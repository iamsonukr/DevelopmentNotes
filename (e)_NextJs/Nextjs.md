# Complete Next.js Interview Guide & Notes

## Table of Contents
1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Core Concepts](#core-concepts)
4. [Routing](#routing)
5. [Rendering Methods](#rendering-methods)
6. [Data Fetching](#data-fetching)
7. [API Routes](#api-routes)
8. [Performance Optimization](#performance-optimization)
9. [Interview Questions & Answers](#interview-questions--answers)

---

## Introduction

**Next.js** is a React-based framework that provides a complete solution for building modern web applications. It's built on top of React and adds powerful features like server-side rendering, static site generation, automatic code splitting, and more.

### Key Benefits:
- **Zero Configuration**: Works out of the box with minimal setup
- **Performance**: Built-in optimizations for production
- **SEO Friendly**: Server-side rendering improves SEO
- **Developer Experience**: Hot reloading, TypeScript support, ESLint integration
- **Full-Stack**: API routes allow backend functionality

---

## Getting Started

### Project Setup

```bash
# Create a new Next.js app
npx create-next-app@latest my-next-app

# With TypeScript
npx create-next-app@latest my-next-app --typescript

# With Tailwind CSS
npx create-next-app@latest my-next-app --tailwind

# Navigate to project
cd my-next-app

# Start development server
npm run dev
```

### Project Structure (App Router - Next.js 13+)

```
my-next-app/
├── app/
│   ├── globals.css
│   ├── layout.js
│   ├── page.js
│   ├── about/
│   │   └── page.js
│   └── api/
│       └── users/
│           └── route.js
├── public/
├── components/
├── next.config.js
└── package.json
```

---

## Core Concepts

### 1. App Router vs Pages Router

**App Router (Recommended - Next.js 13+)**
- Files in `app/` directory
- Uses React Server Components by default
- Better performance and developer experience

**Pages Router (Legacy)**
- Files in `pages/` directory
- Traditional React components
- Still supported for backward compatibility

### 2. File-Based Routing

Next.js uses the file system to define routes:

```
app/
├── page.js                 → /
├── about/page.js          → /about
├── blog/
│   ├── page.js            → /blog
│   └── [slug]/page.js     → /blog/dynamic-route
└── dashboard/
    ├── layout.js
    ├── page.js            → /dashboard
    └── settings/page.js   → /dashboard/settings
```

---

## Routing

### Basic Pages

```javascript
// app/page.js (Home page)
export default function Home() {
  return (
    <div>
      <h1>Welcome to Next.js!</h1>
    </div>
  );
}

// app/about/page.js
export default function About() {
  return (
    <div>
      <h1>About Us</h1>
    </div>
  );
}
```

### Dynamic Routes

```javascript
// app/blog/[slug]/page.js
export default function BlogPost({ params }) {
  return (
    <div>
      <h1>Blog Post: {params.slug}</h1>
    </div>
  );
}

// app/shop/[...slug]/page.js (Catch-all routes)
export default function Shop({ params }) {
  return (
    <div>
      <h1>Shop: {params.slug.join('/')}</h1>
    </div>
  );
}
```

### Navigation

```javascript
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navigation() {
  const router = useRouter();

  const handleNavigation = () => {
    router.push('/dashboard');
  };

  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <button onClick={handleNavigation}>Go to Dashboard</button>
    </nav>
  );
}
```

### Layouts

```javascript
// app/layout.js (Root layout)
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>Navigation here</nav>
        </header>
        <main>{children}</main>
        <footer>Footer here</footer>
      </body>
    </html>
  );
}

// app/dashboard/layout.js (Nested layout)
export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard">
      <sidebar>Sidebar content</sidebar>
      <div className="content">{children}</div>
    </div>
  );
}
```

---

## Rendering Methods

### 1. Server-Side Rendering (SSR)

```javascript
// app/posts/page.js
async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    cache: 'no-store' // Ensures fresh data on every request
  });
  return res.json();
}

export default async function Posts() {
  const posts = await getPosts();
  
  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
```

### 2. Static Site Generation (SSG)

```javascript
// app/products/page.js
async function getProducts() {
  const res = await fetch('https://api.example.com/products');
  return res.json();
}

export default async function Products() {
  const products = await getProducts();
  
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}

// For dynamic routes with SSG
export async function generateStaticParams() {
  const products = await getProducts();
  
  return products.map(product => ({
    id: product.id.toString()
  }));
}
```

### 3. Client-Side Rendering (CSR)

```javascript
'use client'; // This directive makes it a Client Component

import { useState, useEffect } from 'react';

export default function ClientComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <div>Loading...</div>;

  return <div>{data.message}</div>;
}
```

---

## Data Fetching

### Server Components (Default)

```javascript
// This runs on the server
export default async function ServerComponent() {
  const data = await fetch('https://api.example.com/data');
  const result = await data.json();
  
  return <div>{result.message}</div>;
}
```

### Client Components

```javascript
'use client';

import { useState, useEffect } from 'react';

export default function ClientComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/data');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return <div>{data?.message}</div>;
}
```

### Caching Strategies

```javascript
// Static data (cached indefinitely)
fetch('https://api.example.com/data', { cache: 'force-cache' });

// Dynamic data (no caching)
fetch('https://api.example.com/data', { cache: 'no-store' });

// Revalidate every 60 seconds
fetch('https://api.example.com/data', { next: { revalidate: 60 } });
```

---

## API Routes

### Basic API Route

```javascript
// app/api/users/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ];
  
  return NextResponse.json(users);
}

export async function POST(request) {
  const body = await request.json();
  
  // Process the data
  const newUser = {
    id: Date.now(),
    name: body.name
  };
  
  return NextResponse.json(newUser, { status: 201 });
}
```

### Dynamic API Routes

```javascript
// app/api/users/[id]/route.js
export async function GET(request, { params }) {
  const { id } = params;
  
  // Fetch user by ID
  const user = await getUserById(id);
  
  if (!user) {
    return NextResponse.json(
      { error: 'User not found' }, 
      { status: 404 }
    );
  }
  
  return NextResponse.json(user);
}

export async function DELETE(request, { params }) {
  const { id } = params;
  
  await deleteUser(id);
  
  return NextResponse.json(
    { message: 'User deleted successfully' }
  );
}
```

---

## Performance Optimization

### Image Optimization

```javascript
import Image from 'next/image';

export default function Gallery() {
  return (
    <div>
      <Image
        src="/hero-image.jpg"
        alt="Hero"
        width={800}
        height={600}
        priority // Load immediately
      />
      
      <Image
        src="/gallery-image.jpg"
        alt="Gallery"
        width={400}
        height={300}
        loading="lazy" // Lazy load
      />
    </div>
  );
}
```

### Code Splitting & Dynamic Imports

```javascript
import dynamic from 'next/dynamic';

// Dynamic import with loading state
const DynamicComponent = dynamic(
  () => import('../components/HeavyComponent'),
  {
    loading: () => <p>Loading...</p>,
    ssr: false // Disable server-side rendering
  }
);

export default function Page() {
  return (
    <div>
      <h1>My Page</h1>
      <DynamicComponent />
    </div>
  );
}
```

### Metadata & SEO

```javascript
// app/layout.js
export const metadata = {
  title: 'My Next.js App',
  description: 'A comprehensive Next.js application',
};

// app/about/page.js
export const metadata = {
  title: 'About Us',
  description: 'Learn more about our company',
};

export default function About() {
  return <div>About page content</div>;
}
```

---

## Interview Questions & Answers

### Basic Questions

**Q1: What is Next.js and why would you use it over plain React?**

**Answer:** Next.js is a React framework that provides additional features like:
- Server-side rendering for better SEO and performance
- Static site generation for faster loading
- File-based routing system
- Built-in API routes for full-stack development
- Automatic code splitting and optimization
- Image optimization out of the box
- TypeScript support

**Q2: Explain the difference between SSR, SSG, and CSR in Next.js.**

**Answer:**
- **SSR (Server-Side Rendering)**: Pages are rendered on the server for each request. Good for dynamic content that changes frequently.
- **SSG (Static Site Generation)**: Pages are pre-rendered at build time. Best for content that doesn't change often.
- **CSR (Client-Side Rendering)**: Content is rendered in the browser using JavaScript. Good for highly interactive applications.

**Q3: What's the difference between App Router and Pages Router?**

**Answer:**
- **App Router** (Next.js 13+): Uses `app/` directory, supports React Server Components, better performance, co-located layouts
- **Pages Router** (Legacy): Uses `pages/` directory, traditional React components, still supported but not recommended for new projects

### Intermediate Questions

**Q4: How do you handle dynamic routing in Next.js?**

**Answer:** 
```javascript
// Dynamic route: [id].js or [slug].js
// Catch-all route: [...slug].js
// Optional catch-all: [[...slug]].js

// Access params in component
export default function Post({ params }) {
  const { slug } = params;
  return <div>Post: {slug}</div>;
}
```

**Q5: How does Next.js handle code splitting?**

**Answer:** Next.js automatically splits code at the page level and supports dynamic imports for component-level splitting:
```javascript
const DynamicComponent = dynamic(() => import('./Component'));
```

**Q6: What are React Server Components in Next.js?**

**Answer:** Server Components run on the server and can directly access databases, APIs, or the file system. They don't include client-side JavaScript in the bundle, reducing bundle size and improving performance.

### Advanced Questions

**Q7: How do you implement middleware in Next.js?**

**Answer:**
```javascript
// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Check authentication
    const token = request.cookies.get('token');
    if (!token) {
      return NextResponse.redirect('/login');
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*'
};
```

**Q8: How do you optimize images in Next.js?**

**Answer:** Use the `next/image` component which provides:
- Automatic image optimization
- Lazy loading by default
- Responsive images
- WebP format when supported
- Placeholder options

**Q9: Explain Next.js caching strategies.**

**Answer:**
- **Request Memoization**: Automatic deduplication of fetch requests
- **Data Cache**: Persistent cache across requests and deployments
- **Full Route Cache**: Caches rendered routes at build time
- **Router Cache**: Client-side cache for visited routes

### Performance Questions

**Q10: How would you optimize a Next.js application for production?**

**Answer:**
1. Use `next/image` for image optimization
2. Implement proper caching strategies
3. Use dynamic imports for code splitting
4. Optimize fonts with `next/font`
5. Enable compression in `next.config.js`
6. Use static generation where possible
7. Implement proper error boundaries
8. Monitor with Web Vitals

**Q11: What's the purpose of `next.config.js`?**

**Answer:** Configuration file for customizing Next.js behavior:
```javascript
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['example.com'],
  },
  env: {
    CUSTOM_KEY: 'value',
  },
  redirects: async () => [
    {
      source: '/old-path',
      destination: '/new-path',
      permanent: true,
    },
  ],
};
```

### Debugging & Troubleshooting

**Q12: How do you debug a Next.js application?**

**Answer:**
- Use React DevTools
- Enable source maps in development
- Use `console.log` strategically
- Check Network tab for API calls
- Use Next.js built-in error pages
- Implement proper error boundaries

**Q13: Common Next.js errors and solutions:**

1. **Hydration Mismatch**: Ensure server and client render the same content
2. **Module Not Found**: Check import paths and case sensitivity
3. **API Route 404**: Verify file naming and structure in `app/api/`
4. **Image Optimization Error**: Configure domains in `next.config.js`

---

## Best Practices

1. **File Organization**: Keep components, utils, and styles organized
2. **Error Handling**: Implement proper error boundaries and API error handling
3. **Performance**: Use appropriate rendering methods for each page
4. **SEO**: Implement proper metadata and structured data
5. **Security**: Validate inputs and implement proper authentication
6. **Testing**: Write unit and integration tests for critical functionality
7. **TypeScript**: Use TypeScript for better code quality and developer experience

---

## Quick Reference Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint

# Type checking (if using TypeScript)
npx tsc --noEmit
```

This guide covers the essential concepts and interview questions for Next.js. Practice building applications with these concepts to solidify your understanding!