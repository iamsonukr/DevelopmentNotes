# Complete CSS Course - 7 Lectures

---

## 📚 Table of Contents

1. [Introduction to CSS](#lecture-1-introduction-to-css)
2. [Box Model and Layout Basics](#lecture-2-box-model-and-layout-basics)
3. [Styling Text and Fonts](#lecture-3-styling-text-and-fonts)
4. [Backgrounds and Gradients](#lecture-4-backgrounds-and-gradients)
5. [Flexbox Layout](#lecture-5-flexbox-flexible-box-layout)
6. [Grid Layout](#lecture-6-grid-layout)
7. [Positioning and Z-Index](#lecture-7-positioning-and-z-index)

---

# Lecture 1: Introduction to CSS

## 🎯 What is CSS?

**CSS (Cascading Style Sheets)** is a styling language used to control the presentation of HTML elements. It manages:
- Layout and positioning
- Colors and backgrounds
- Typography and fonts
- Spacing and dimensions
- Visual effects

---

## 🔧 Types of CSS

### 1. Inline CSS
Style applied directly to HTML elements using the `style` attribute.

```html
<p style="color: red; font-size: 16px;">This is red text.</p>
```

### 2. Internal CSS
Styles defined within `<style>` tags in the document's `<head>` section.

```html
<head>
    <style>
        p {
            color: blue;
            font-size: 18px;
        }
    </style>
</head>
```

### 3. External CSS
Styles written in separate `.css` files and linked to HTML documents.

```html
<link rel="stylesheet" href="styles.css">
```

---

## 📝 CSS Syntax

```css
selector {
    property: value;
    property: value;
}
```

- **Selector**: Targets specific HTML elements
- **Property**: The style attribute to modify
- **Value**: The setting for that property

---

## 🎯 CSS Selectors

### Element Selector
Targets all elements of a specific type.

```css
p {
    color: green;
}
```

### Class Selector
Targets elements with a specific class attribute.

```css
.highlight {
    background-color: yellow;
}
```

```html
<p class="highlight">This paragraph is highlighted.</p>
```

### ID Selector
Targets a unique element by its ID.

```css
#header {
    font-size: 24px;
    color: navy;
}
```

```html
<h1 id="header">Main Header</h1>
```

---

## 💬 Comments in CSS

```css
/* This is a single-line comment */

/*
This is a
multi-line comment
*/
```

---

## 🎨 Basic CSS Properties

| Property | Description | Example |
|----------|-------------|---------|
| `color` | Text color | `color: red;` |
| `background-color` | Background color | `background-color: lightblue;` |
| `font-size` | Text size | `font-size: 16px;` |
| `text-align` | Text alignment | `text-align: center;` |

---

## 🛠️ **Task 1**

Create an HTML page with:
1. **Inline CSS** to change a heading color
2. **Internal CSS** to style a paragraph
3. **External CSS** to style a button

---

---

# Lecture 2: Box Model and Layout Basics

## 📦 The CSS Box Model

Every HTML element is a rectangular box consisting of four layers:

```
┌─────────────────────────────────┐
│           MARGIN                │
│  ┌───────────────────────────┐  │
│  │        BORDER             │  │
│  │  ┌─────────────────────┐  │  │
│  │  │      PADDING        │  │  │
│  │  │  ┌───────────────┐  │  │  │
│  │  │  │   CONTENT     │  │  │  │
│  │  │  └───────────────┘  │  │  │
│  │  └─────────────────────┘  │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

---

## 🔧 Box Model Properties

### Content Area
```css
div {
    width: 200px;
    height: 100px;
}
```

### Padding
Space inside the element, around the content.

```css
div {
    padding: 10px;           /* All sides */
    padding: 10px 20px;      /* Top/bottom, Left/right */
    padding: 5px 10px 15px 20px; /* Top, Right, Bottom, Left */
}
```

### Border
Surrounds the padding and content.

```css
div {
    border: 2px solid blue;
    border-width: 3px;
    border-style: dashed;
    border-color: red;
}
```

### Margin
Space outside the element.

```css
div {
    margin: 15px;
    margin-top: 10px;
    margin-bottom: 20px;
}
```

---

## 📏 Box Sizing Calculation

**Default (Content Box):**
```
Total Width = width + padding-left + padding-right + border-left + border-right
Total Height = height + padding-top + padding-bottom + border-top + border-bottom
```

**Border Box:**
```css
* {
    box-sizing: border-box; /* Width includes padding and border */
}
```

---

## 🎭 Display Property

### Block Elements
Take full available width, start on new line.

```css
div {
    display: block;
}
```

### Inline Elements
Take only necessary width, flow with text.

```css
span {
    display: inline;
}
```

### Inline-Block Elements
Combine inline flow with block properties.

```css
img {
    display: inline-block;
}
```

### Hide Elements
```css
.hidden {
    display: none;
}
```

---

## 📍 Positioning Basics

### Static (Default)
Normal document flow.

```css
div {
    position: static;
}
```

### Relative
Positioned relative to normal position.

```css
div {
    position: relative;
    top: 10px;
    left: 20px;
}
```

### Absolute
Positioned relative to nearest positioned ancestor.

```css
div {
    position: absolute;
    top: 50px;
    right: 30px;
}
```

### Fixed
Positioned relative to viewport.

```css
div {
    position: fixed;
    bottom: 0;
    right: 0;
}
```

---

## 🌊 Overflow Property

Controls content that exceeds element boundaries.

```css
div {
    overflow: visible;  /* Default - content spills out */
    overflow: hidden;   /* Content is clipped */
    overflow: scroll;   /* Always shows scrollbars */
    overflow: auto;     /* Scrollbars when needed */
}
```

---

## 🛠️ **Task 2**

1. Create a box with **padding**, **margin**, and a colored **border**
2. Use `position: relative` to shift an element
3. Experiment with the **overflow** property on a container with excess content

---

---

# Lecture 3: Styling Text and Fonts

## 🎨 Text Properties

### Color
```css
p {
    color: blue;
    color: #3498db;
    color: rgb(52, 152, 219);
    color: rgba(52, 152, 219, 0.8);
}
```

### Text Alignment
```css
h1 {
    text-align: left;     /* Default */
    text-align: center;
    text-align: right;
    text-align: justify;
}
```

### Text Decoration
```css
a {
    text-decoration: none;        /* Remove underline */
    text-decoration: underline;
    text-decoration: overline;
    text-decoration: line-through;
}
```

### Text Transform
```css
h2 {
    text-transform: uppercase;   /* ALL CAPS */
    text-transform: lowercase;   /* all lowercase */
    text-transform: capitalize;  /* First Letter Of Each Word */
    text-transform: none;        /* No change */
}
```

### Line Height
```css
p {
    line-height: 1.5;      /* 1.5 times font size */
    line-height: 24px;     /* Fixed height */
    line-height: 150%;     /* Percentage */
}
```

---

## 🔤 Font Properties

### Font Family
```css
body {
    font-family: Arial, sans-serif;
    font-family: "Times New Roman", serif;
    font-family: "Courier New", monospace;
    font-family: Georgia, "Times New Roman", serif; /* Fallbacks */
}
```

### Font Size
```css
h1 {
    font-size: 24px;       /* Pixels */
    font-size: 1.5em;      /* Relative to parent */
    font-size: 1.5rem;     /* Relative to root */
    font-size: 150%;       /* Percentage */
}
```

### Font Weight
```css
p {
    font-weight: normal;   /* 400 */
    font-weight: bold;     /* 700 */
    font-weight: lighter;
    font-weight: bolder;
    font-weight: 100;      /* Thin */
    font-weight: 900;      /* Black */
}
```

### Font Style
```css
em {
    font-style: normal;
    font-style: italic;
    font-style: oblique;
}
```

---

## ✨ Text Effects

### Text Shadow
```css
h1 {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    /* offset-x | offset-y | blur-radius | color */
    
    text-shadow: 1px 1px 2px black, 0 0 25px blue;
    /* Multiple shadows */
}
```

### Letter Spacing
```css
h2 {
    letter-spacing: 2px;
    letter-spacing: 0.1em;
}
```

### Word Spacing
```css
p {
    word-spacing: 5px;
    word-spacing: 0.2em;
}
```

---

## 🌐 Custom Fonts (Google Fonts)

### 1. Link in HTML
```html
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet">
```

### 2. Import in CSS
```css
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');
```

### 3. Use in CSS
```css
body {
    font-family: 'Roboto', sans-serif;
}
```

---

## 🛠️ **Task 3**

1. Style headings and paragraphs with different **font-family** and **font-size**
2. Add a **shadow effect** to a heading
3. Use **Google Fonts** to apply a custom font
4. Experiment with **text-transform** and **letter-spacing**

---

---

# Lecture 4: Backgrounds and Gradients

## 🎨 Background Color

```css
div {
    background-color: lightblue;
    background-color: #3498db;
    background-color: rgb(52, 152, 219);
    background-color: rgba(52, 152, 219, 0.7); /* With transparency */
}
```

---

## 🖼️ Background Images

### Basic Background Image
```css
div {
    background-image: url('images/background.jpg');
    background-image: url('https://example.com/image.jpg');
}
```

### Background Repeat
```css
div {
    background-repeat: repeat;      /* Default */
    background-repeat: no-repeat;
    background-repeat: repeat-x;    /* Horizontally only */
    background-repeat: repeat-y;    /* Vertically only */
}
```

### Background Position
```css
div {
    background-position: center;
    background-position: top right;
    background-position: 50% 25%;
    background-position: 100px 50px;
}
```

### Background Size
```css
div {
    background-size: auto;          /* Default */
    background-size: cover;         /* Covers entire container */
    background-size: contain;       /* Fits entirely within container */
    background-size: 100% 50%;      /* Custom dimensions */
}
```

### Background Attachment
```css
div {
    background-attachment: scroll;  /* Default - scrolls with content */
    background-attachment: fixed;   /* Fixed to viewport */
    background-attachment: local;   /* Scrolls with element content */
}
```

---

## 🌈 CSS Gradients

### Linear Gradients
```css
/* Basic linear gradient */
div {
    background: linear-gradient(red, yellow);
}

/* With direction */
div {
    background: linear-gradient(to right, red, yellow);
    background: linear-gradient(to bottom right, red, yellow);
    background: linear-gradient(45deg, red, yellow);
}

/* Multiple colors */
div {
    background: linear-gradient(to right, red, orange, yellow, green, blue);
}

/* Color stops */
div {
    background: linear-gradient(to right, red 0%, yellow 50%, blue 100%);
}
```

### Radial Gradients
```css
/* Basic radial gradient */
div {
    background: radial-gradient(red, yellow);
}

/* With shape and size */
div {
    background: radial-gradient(circle, red, yellow);
    background: radial-gradient(ellipse at center, red, yellow);
}

/* With position */
div {
    background: radial-gradient(circle at top left, red, yellow);
}
```

---

## 🔄 Multiple Backgrounds

```css
div {
    background: 
        url('foreground.png') no-repeat center,
        linear-gradient(45deg, blue, green),
        url('background.jpg') repeat;
}
```

---

## 📏 Background Shorthand

```css
div {
    background: color image repeat attachment position / size;
    
    /* Example */
    background: #fff url('bg.jpg') no-repeat fixed center / cover;
}
```

---

## 🛠️ **Task 4**

1. Create a box with a **background image** set to **cover** and **centered**
2. Add a **linear gradient** as the background for a header
3. Use **multiple backgrounds** to create a layered effect
4. Experiment with **radial gradients** and different color stops

---

---

# Lecture 5: Flexbox (Flexible Box Layout)

## 🚀 What is Flexbox?

**Flexbox** is a one-dimensional layout method for arranging items in rows or columns. It provides:
- Efficient space distribution
- Easy alignment control
- Flexible item sizing
- Dynamic layouts

---

## 🔧 Setting Up Flexbox

```css
.container {
    display: flex;
}
```

---

## 📐 Flex Axes

### Main Axis
The primary axis along which flex items are laid out.

### Cross Axis
The axis perpendicular to the main axis.

```
flex-direction: row (default)
┌─────────────────────────► Main Axis
│
│
│
▼
Cross Axis
```

---

## 🏗️ Flex Container Properties

### Flex Direction
```css
.container {
    flex-direction: row;            /* Default: left to right */
    flex-direction: row-reverse;    /* Right to left */
    flex-direction: column;         /* Top to bottom */
    flex-direction: column-reverse; /* Bottom to top */
}
```

### Justify Content (Main Axis)
```css
.container {
    justify-content: flex-start;    /* Default */
    justify-content: flex-end;
    justify-content: center;
    justify-content: space-between;
    justify-content: space-around;
    justify-content: space-evenly;
}
```

### Align Items (Cross Axis)
```css
.container {
    align-items: stretch;      /* Default */
    align-items: flex-start;
    align-items: flex-end;
    align-items: center;
    align-items: baseline;
}
```

### Flex Wrap
```css
.container {
    flex-wrap: nowrap;        /* Default */
    flex-wrap: wrap;
    flex-wrap: wrap-reverse;
}
```

### Align Content (Multi-line)
```css
.container {
    align-content: stretch;        /* Default */
    align-content: flex-start;
    align-content: flex-end;
    align-content: center;
    align-content: space-between;
    align-content: space-around;
}
```

---

## 🎯 Flex Item Properties

### Flex Grow, Shrink, and Basis
```css
.item {
    flex: 1;                  /* Shorthand: grow shrink basis */
    flex: 1 0 auto;          /* grow: 1, shrink: 0, basis: auto */
    
    flex-grow: 1;            /* How much to grow */
    flex-shrink: 0;          /* How much to shrink */
    flex-basis: 200px;       /* Initial size */
}
```

### Order
```css
.item {
    order: 0;               /* Default */
    order: 1;               /* Appears later */
    order: -1;              /* Appears earlier */
}
```

### Align Self
```css
.item {
    align-self: auto;       /* Default */
    align-self: flex-start;
    align-self: flex-end;
    align-self: center;
    align-self: baseline;
    align-self: stretch;
}
```

---

## 💡 Common Flexbox Patterns

### Centering Content
```css
.center {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

### Equal Width Columns
```css
.equal-columns .item {
    flex: 1;
}
```

### Sidebar Layout
```css
.container {
    display: flex;
}

.sidebar {
    flex: 0 0 200px; /* Fixed width sidebar */
}

.main-content {
    flex: 1; /* Takes remaining space */
}
```

---

## 📝 Complete Example

```html
<div class="container">
    <div class="item">Item 1</div>
    <div class="item">Item 2</div>
    <div class="item">Item 3</div>
</div>
```

```css
.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    padding: 20px;
    background-color: #f0f0f0;
}

.item {
    flex: 1;
    min-width: 150px;
    padding: 20px;
    background-color: lightblue;
    text-align: center;
    border-radius: 5px;
}
```

---

## 🛠️ **Task 5**

1. Create a flex container with **three items**, evenly spaced
2. Experiment with **flex-direction** and **justify-content**
3. Adjust individual items using **flex** and **order**
4. Create a **responsive navigation bar** using flexbox

---

---

# Lecture 6: Grid Layout

## 🎯 What is CSS Grid?

**CSS Grid Layout** is a two-dimensional layout system that allows you to create complex layouts with both rows and columns simultaneously.

### Grid vs Flexbox
- **Grid**: Two-dimensional (rows AND columns)
- **Flexbox**: One-dimensional (either rows OR columns)

---

## 🔧 Setting Up CSS Grid

```css
.container {
    display: grid;
}
```

---

## 🏗️ Grid Container Properties

### Defining Columns
```css
.container {
    grid-template-columns: 100px 200px 100px;          /* Fixed sizes */
    grid-template-columns: 1fr 2fr 1fr;                /* Fractional units */
    grid-template-columns: repeat(3, 1fr);             /* Repeat function */
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Responsive */
}
```

### Defining Rows
```css
.container {
    grid-template-rows: 50px auto 100px;
    grid-template-rows: repeat(3, 100px);
    grid-template-rows: minmax(100px, auto);
}
```

### Grid Gap
```css
.container {
    gap: 10px;                    /* Both row and column gap */
    row-gap: 15px;               /* Row gap only */
    column-gap: 20px;            /* Column gap only */
    gap: 15px 20px;              /* Row gap, column gap */
}
```

### Grid Template Areas
```css
.container {
    grid-template-areas: 
        "header header header"
        "sidebar content content"
        "footer footer footer";
}
```

---

## 🎯 Grid Item Properties

### Grid Column
```css
.item {
    grid-column: 1 / 3;          /* Start at line 1, end at line 3 */
    grid-column: 1 / -1;         /* Start at line 1, end at last line */
    grid-column: span 2;         /* Span 2 columns */
}
```

### Grid Row
```css
.item {
    grid-row: 1 / 3;             /* Start at line 1, end at line 3 */
    grid-row: span 2;            /* Span 2 rows */
}
```

### Grid Area (Shorthand)
```css
.item {
    grid-area: 2 / 1 / 4 / 3;    /* row-start / col-start / row-end / col-end */
}
```

### Using Named Areas
```css
.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.footer { grid-area: footer; }
```

---

## ⚡ Auto Placement

### Auto Rows
```css
.container {
    grid-auto-rows: 100px;       /* Default height for auto-generated rows */
    grid-auto-rows: minmax(100px, auto);
}
```

### Auto Columns
```css
.container {
    grid-auto-columns: 200px;    /* Default width for auto-generated columns */
}
```

### Auto Flow
```css
.container {
    grid-auto-flow: row;         /* Default - fill rows first */
    grid-auto-flow: column;      /* Fill columns first */
    grid-auto-flow: dense;       /* Fill gaps */
}
```

---

## 📱 Responsive Grid

### Using Auto-Fit
```css
.container {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
```

### Using Auto-Fill
```css
.container {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
```

### Media Queries
```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

@media (max-width: 768px) {
    .container {
        grid-template-columns: 1fr;
    }
}
```

---

## 📝 Complete Example: Website Layout

```html
<div class="container">
    <header class="header">Header</header>
    <aside class="sidebar">Sidebar</aside>
    <main class="content">Main Content</main>
    <footer class="footer">Footer</footer>
</div>
```

```css
.container {
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas: 
        "header header"
        "sidebar content"
        "footer footer";
    gap: 10px;
    min-height: 100vh;
}

.header {
    grid-area: header;
    background-color: #333;
    color: white;
    padding: 1rem;
}

.sidebar {
    grid-area: sidebar;
    background-color: #f0f0f0;
    padding: 1rem;
}

.content {
    grid-area: content;
    background-color: white;
    padding: 1rem;
}

.footer {
    grid-area: footer;
    background-color: #333;
    color: white;
    padding: 1rem;
    text-align: center;
}

/* Responsive */
@media (max-width: 768px) {
    .container {
        grid-template-columns: 1fr;
        grid-template-areas: 
            "header"
            "content"
            "sidebar"
            "footer";
    }
}
```

---

## 🛠️ **Task 6**

1. Create a grid with **three columns** and different content in each
2. Use **grid-template-areas** for layout management
3. Experiment with **grid-column** and **grid-row** to position items manually
4. Build a **responsive card layout** using auto-fit

---

---

# Lecture 7: Positioning and Z-Index

## 📍 CSS Positioning Types

### Static Positioning (Default)
Elements follow normal document flow.

```css
.element {
    position: static; /* Default value */
}
```

### Relative Positioning
Element positioned relative to its normal position.

```css
.element {
    position: relative;
    top: 20px;      /* Move 20px down from normal position */
    left: 30px;     /* Move 30px right from normal position */
}
```

### Absolute Positioning
Element positioned relative to nearest positioned ancestor.

```css
.parent {
    position: relative; /* Establishes positioning context */
}

.child {
    position: absolute;
    top: 50px;
    right: 20px;
}
```

### Fixed Positioning
Element positioned relative to the viewport.

```css
.element {
    position: fixed;
    top: 10px;
    right: 10px;
    /* Stays in place when scrolling */
}
```

### Sticky Positioning
Element toggles between relative and fixed based on scroll position.

```css
.element {
    position: sticky;
    top: 0; /* Becomes fixed when reaching top of viewport */
}
```

---

## 🏗️ Z-Index and Stacking Context

### Basic Z-Index
Controls stacking order of positioned elements.

```css
.element1 {
    position: absolute;
    z-index: 1;
}

.element2 {
    position: absolute;
    z-index: 10; /* Appears above element1 */
}
```

### Stacking Context Rules
1. Higher z-index values appear in front
2. Only works on positioned elements
3. Child elements stack within parent's context

---

## 🔄 CSS Transforms

### Translate (Move)
```css
.element {
    transform: translate(50px, 20px);    /* X, Y */
    transform: translateX(30px);         /* X only */
    transform: translateY(-20px);        /* Y only */
    transform: translate3d(10px, 20px, 5px); /* X, Y, Z */
}
```

### Rotate
```css
.element {
    transform: rotate(45deg);            /* 2D rotation */
    transform: rotateX(45deg);           /* Around X-axis */
    transform: rotateY(45deg);           /* Around Y-axis */
    transform: rotateZ(45deg);           /* Around Z-axis */
}
```

### Scale
```css
.element {
    transform: scale(1.5);               /* Uniform scaling */
    transform: scale(2, 0.5);            /* X, Y scaling */
    transform: scaleX(2);                /* X only */
    transform: scaleY(0.5);              /* Y only */
}
```

### Skew
```css
.element {
    transform: skew(20deg, 10deg);       /* X, Y skew */
    transform: skewX(30deg);             /* X only */
    transform: skewY(15deg);             /* Y only */
}
```

### Combining Transforms
```css
.element {
    transform: translate(30px, 20px) rotate(45deg) scale(1.2);
}
```

---

## 🎯 Transform Origin

Controls the point around which transformations occur.

```css
.element {
    transform-origin: center;            /* Default */
    transform-origin: top left;
    transform-origin: 50% 50%;
    transform-origin: 100px 50px;
}
```

---

## 📝 Practical Examples

### Overlay Modal
```css
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
}

.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    z-index: 1001;
}
```

### Sticky Header
```css
.header {
    position: sticky;
    top: 0;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    z-index: 100;
}
```

### Fixed Sidebar
```css
.sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 250px;
    height: 100vh;
    background-color: #f8f9fa;
    overflow-y: auto;
}

.main-content {
    margin-left: 250px; /* Account for fixed sidebar */
}
```

### Floating Action Button
```css
.fab {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: #007bff;
    border: none;
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    z-index: 1000;
}
```

---

## 🎨 Advanced Positioning Techniques

### Centering with Absolute Positioning
```css
.center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

### Full Screen Overlay
```css
.fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index:
}

<!-- -------------------------------------------CSS Lecture 8: Transitions, Animations, and Responsive Design -------------------------------->
# Complete CSS Advanced Concepts - Interview Notes

## 🎨 CSS Transitions & Animations

### CSS Transitions
Smooth property changes over time when state changes occur.

```css
/* Basic Transition Syntax */
.element {
    transition: property duration timing-function delay;
}

/* Multiple Properties */
.element {
    transition: width 0.3s ease, height 0.5s linear 0.1s, background-color 0.2s;
}

/* All Properties */
.element {
    transition: all 0.3s ease-in-out;
}
```

**Practical Examples:**
```css
/* Smooth Button Hover */
.btn {
    background-color: #3498db;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateY(0);
}

.btn:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.4);
}

/* Card Hover Effect */
.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}
```

**Timing Functions:**
```css
/* Built-in Functions */
.linear { transition-timing-function: linear; }
.ease { transition-timing-function: ease; }
.ease-in { transition-timing-function: ease-in; }
.ease-out { transition-timing-function: ease-out; }
.ease-in-out { transition-timing-function: ease-in-out; }

/* Custom Cubic Bezier */
.custom-ease { transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55); }
```

### CSS Animations
More complex animations with keyframes and multiple states.

```css
/* Basic Animation Syntax */
@keyframes animation-name {
    0% { /* Initial state */ }
    50% { /* Mid state */ }
    100% { /* Final state */ }
}

.element {
    animation: animation-name duration timing-function delay iteration-count direction fill-mode;
}
```

**Advanced Animation Examples:**
```css
/* Loading Spinner */
@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

/* Pulse Animation */
@keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.1); opacity: 0.7; }
    100% { transform: scale(1); opacity: 1; }
}

.pulse-btn {
    animation: pulse 2s ease-in-out infinite;
}

/* Complex Multi-Stage Animation */
@keyframes slideInBounce {
    0% {
        transform: translateX(-100px);
        opacity: 0;
    }
    60% {
        transform: translateX(10px);
        opacity: 0.8;
    }
    80% {
        transform: translateX(-5px);
        opacity: 0.9;
    }
    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

.slide-in {
    animation: slideInBounce 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

**Animation Properties:**
```css
.element {
    animation-name: bounce;
    animation-duration: 2s;
    animation-timing-function: ease-in-out;
    animation-delay: 0.5s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-fill-mode: forwards;
    animation-play-state: paused; /* or running */
}
```

## 📱 Responsive Design & Media Queries

### Media Query Syntax & Best Practices
```css
/* Basic Media Query */
@media (condition) {
    /* CSS rules */
}

/* Multiple Conditions */
@media (min-width: 768px) and (max-width: 1024px) {
    /* Tablet styles */
}

/* Media Type and Feature */
@media screen and (min-width: 768px) {
    /* Screen devices with min-width */
}
```

### Common Breakpoints
```css
/* Mobile First Approach (Recommended) */
/* Extra Small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) { }

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) { }

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) { }

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) { }

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) { }
```

### Advanced Media Query Features
```css
/* Orientation */
@media (orientation: portrait) {
    .container { flex-direction: column; }
}

@media (orientation: landscape) {
    .container { flex-direction: row; }
}

/* High DPI/Retina Displays */
@media (-webkit-min-device-pixel-ratio: 2),
       (min-resolution: 192dpi) {
    .logo { background-image: url('logo@2x.png'); }
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
    body { background: #121212; color: #ffffff; }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
    * { animation-duration: 0.01ms !important; }
}

/* Hover Capability */
@media (hover: hover) {
    .btn:hover { background-color: #2980b9; }
}
```

### Responsive Typography
```css
/* Fluid Typography */
.heading {
    font-size: clamp(1.5rem, 4vw, 3rem);
}

/* Responsive Font Scaling */
html {
    font-size: 16px;
}

@media (max-width: 768px) {
    html { font-size: 14px; }
}

@media (min-width: 1200px) {
    html { font-size: 18px; }
}
```

### Responsive Layout Examples
```css
/* Responsive Grid */
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}

/* Responsive Flexbox */
.flex-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.flex-item {
    flex: 1 1 300px; /* grow shrink basis */
}

@media (max-width: 768px) {
    .flex-item {
        flex: 1 1 100%;
    }
}
```

## 🎯 Advanced Selectors

### Attribute Selectors
```css
/* Exact match */
input[type="email"] { border-color: blue; }

/* Contains word */
[class~="btn"] { padding: 10px; }

/* Starts with */
a[href^="https"] { color: green; }
a[href^="mailto"] { color: red; }

/* Ends with */
a[href$=".pdf"] { background: url('pdf-icon.png') no-repeat; }

/* Contains substring */
a[href*="youtube"] { color: red; }

/* Language attribute */
p[lang|="en"] { font-family: 'English-font'; }

/* Case-insensitive matching */
input[type="EMAIL" i] { border: 2px solid blue; }
```

### Structural Pseudo-Classes
```css
/* Position-based */
:first-child { font-weight: bold; }
:last-child { margin-bottom: 0; }
:only-child { text-align: center; }

/* nth-child variations */
:nth-child(odd) { background: #f9f9f9; }
:nth-child(even) { background: white; }
:nth-child(3n) { color: red; } /* Every 3rd */
:nth-child(3n+1) { color: blue; } /* 1st, 4th, 7th... */
:nth-child(-n+3) { font-size: 18px; } /* First 3 elements */

/* Type-based selectors */
:first-of-type { margin-top: 0; }
:last-of-type { margin-bottom: 0; }
:nth-of-type(2n) { color: green; }

/* Empty and not selectors */
:empty { display: none; }
:not(.excluded) { opacity: 1; }
:not(p, div) { border: 1px solid #ccc; }
```

### Interactive Pseudo-Classes
```css
/* Link states */
a:link { color: blue; }
a:visited { color: purple; }
a:hover { color: red; }
a:active { color: orange; }

/* Form states */
input:focus { outline: 2px solid blue; }
input:valid { border-color: green; }
input:invalid { border-color: red; }
input:required { border-left: 3px solid orange; }
input:optional { border-left: 3px solid gray; }
input:checked + label { font-weight: bold; }
input:disabled { opacity: 0.5; }

/* UI states */
:target { background-color: yellow; }
:enabled { cursor: pointer; }
:read-only { background-color: #f5f5f5; }
```

## ✨ Pseudo-Elements

### Content Generation
```css
/* Basic content insertion */
.quote::before {
    content: """;
    font-size: 2em;
    color: #666;
    vertical-align: top;
}

.quote::after {
    content: """;
    font-size: 2em;
    color: #666;
}

/* Dynamic content from attributes */
a[href]::after {
    content: " (" attr(href) ")";
    font-size: 0.8em;
    color: #666;
}

/* Counter content */
.chapter::before {
    content: "Chapter " counter(chapter) ": ";
    counter-increment: chapter;
}
```

### Advanced Pseudo-Element Techniques
```css
/* Tooltip using pseudo-elements */
.tooltip {
    position: relative;
}

.tooltip::before {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: #333;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
}

.tooltip:hover::before {
    opacity: 1;
}

/* Decorative elements */
.section-title::after {
    content: '';
    display: block;
    width: 50px;
    height: 3px;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    margin: 10px auto;
}

/* Image overlay */
.image-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 0.3s;
}

.image-container:hover::before {
    opacity: 1;
}
```

### Text Effects with Pseudo-Elements
```css
/* Drop cap */
.article p:first-of-type::first-letter {
    float: left;
    font-size: 4em;
    line-height: 0.8;
    margin: 0.1em 0.1em 0 0;
    font-weight: bold;
    color: #c69c6d;
}

/* Highlight first line */
.intro::first-line {
    font-weight: bold;
    font-size: 1.1em;
    color: #2c3e50;
}

/* Selection styling */
::selection {
    background: #3498db;
    color: white;
}

::-moz-selection {
    background: #3498db;
    color: white;
}
```

## 🔧 Advanced CSS Techniques

### Custom Properties (CSS Variables)
```css
:root {
    --primary-color: #3498db;
    --secondary-color: #2ecc71;
    --font-size-base: 16px;
    --spacing-unit: 8px;
    --border-radius: 4px;
}

.button {
    background-color: var(--primary-color);
    font-size: var(--font-size-base);
    padding: calc(var(--spacing-unit) * 2);
    border-radius: var(--border-radius);
}

/* Dynamic theming */
[data-theme="dark"] {
    --primary-color: #2980b9;
    --text-color: #ecf0f1;
    --bg-color: #2c3e50;
}
```

### Modern Layout Techniques
```css
/* Container Queries (Future) */
@container (min-width: 400px) {
    .card { display: flex; }
}

/* Aspect Ratio */
.video-wrapper {
    aspect-ratio: 16 / 9;
}

/* Logical Properties */
.element {
    margin-inline: auto; /* margin-left and margin-right */
    padding-block: 20px; /* padding-top and padding-bottom */
    border-inline-start: 3px solid blue; /* border-left in LTR */
}

/* Modern Centering */
.center {
    display: grid;
    place-items: center;
}

/* Intrinsic Web Design */
.responsive-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr));
}
```

## 🎨 Practical Examples & Patterns

### Card Component with Hover Effects
```css
.card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
}

.card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1);
    transform: scaleX(0);
    transition: transform 0.3s ease;
}

.card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
}

.card:hover::before {
    transform: scaleX(1);
}
```

### Navigation with Active States
```css
.nav {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
}

.nav li {
    position: relative;
}

.nav a {
    display: block;
    padding: 12px 20px;
    color: #666;
    text-decoration: none;
    transition: color 0.3s ease;
}

.nav a::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: #3498db;
    transition: all 0.3s ease;
    transform: translateX(-50%);
}

.nav a:hover,
.nav a.active {
    color: #3498db;
}

.nav a:hover::after,
.nav a.active::after {
    width: 80%;
}
```

### Form Styling with Focus States
```css
.form-group {
    position: relative;
    margin-bottom: 24px;
}

.form-input {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 16px;
    transition: all 0.3s ease;
    background: transparent;
}

.form-input:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 4px rgba(52, 152, 219, 0.1);
}

.form-label {
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translateY(-50%);
    color: #666;
    transition: all 0.3s ease;
    pointer-events: none;
    background: white;
    padding: 0 4px;
}

.form-input:focus + .form-label,
.form-input:not(:placeholder-shown) + .form-label {
    top: 0;
    font-size: 12px;
    color: #3498db;
}

.form-input:invalid {
    border-color: #e74c3c;
}

.form-input:valid {
    border-color: #27ae60;
}
```

## 📚 Interview Questions & Answers

### Q: What's the difference between :nth-child() and :nth-of-type()?
**A:** `:nth-child()` counts all sibling elements, while `:nth-of-type()` counts only elements of the same type.

```css
/* nth-child counts all siblings */
div p:nth-child(2) { } /* 2nd child element that is a p */

/* nth-of-type counts only p elements */
div p:nth-of-type(2) { } /* 2nd p element */
```

### Q: Explain the difference between transitions and animations.
**A:**
- **Transitions**: Triggered by state changes (hover, focus), simple A-to-B changes
- **Animations**: Run automatically, support multiple keyframes, more control over timing

### Q: How do you optimize CSS for performance?
**A:**
1. Minimize repaints and reflows
2. Use efficient selectors (avoid complex nested selectors)
3. Leverage hardware acceleration with `transform` and `opacity`
4. Use `will-change` property sparingly
5. Minimize CSS file size and use compression

### Q: What are the best practices for responsive design?
**A:**
1. Mobile-first approach
2. Use relative units (rem, em, %)
3. Flexible layouts with Flexbox/Grid
4. Optimize images for different screen sizes
5. Test on real devices
6. Consider touch interactions

## 🎯 Best Practices & Tips

1. **Use meaningful class names** (BEM methodology)
2. **Organize CSS with logical structure** (variables, base, components, utilities)
3. **Leverage CSS custom properties** for theming and maintainability
4. **Use modern layout methods** (Grid, Flexbox)
5. **Optimize for accessibility** (focus states, color contrast)
6. **Consider performance** (hardware acceleration, efficient selectors)
7. **Test across browsers** and devices
8. **Use CSS preprocessors** (Sass, Less) for complex projects
9. **Implement consistent spacing systems**
10. **Document complex CSS** with comments

-------------------------------------- CSS Lecture 10: Advanced Layout Techniques – Flexbox, Grid, and CSS Variables --------------------------------
# CSS Layout and Animation Guide

## Table of Contents
1. [CSS Flexbox](#css-flexbox)
2. [CSS Grid Layout](#css-grid-layout)
3. [CSS Variables](#css-variables)
4. [Responsive Layouts](#responsive-layouts)
5. [CSS Transitions](#css-transitions)
6. [CSS Animations](#css-animations)
7. [CSS Transforms](#css-transforms)
8. [Combining Effects](#combining-effects)
9. [Performance Tips](#performance-tips)
10. [Practice Tasks](#practice-tasks)

---

## CSS Flexbox

Flexbox is a **one-dimensional layout model** that helps distribute space along a row or column, making it perfect for creating flexible and responsive layouts.

### Flex Container Properties

#### `display: flex`
Turns the container into a flex container.

```css
.container {
    display: flex;
}
```

#### `flex-direction`
Defines the direction of flex items.

```css
.container {
    flex-direction: row; /* row | column | row-reverse | column-reverse */
}
```

#### `justify-content`
Aligns items horizontally along the main axis.

```css
.container {
    justify-content: center; 
    /* Options: flex-start | flex-end | center | space-between | space-around | space-evenly */
}
```

#### `align-items`
Aligns items vertically along the cross axis.

```css
.container {
    align-items: center; 
    /* Options: flex-start | flex-end | center | stretch | baseline */
}
```

#### `flex-wrap`
Allows items to wrap onto the next line.

```css
.container {
    flex-wrap: wrap; /* nowrap | wrap | wrap-reverse */
}
```

### Flex Item Properties

#### `flex-grow`
Defines how an item grows relative to others.

```css
.item {
    flex-grow: 1; /* Item will take up remaining space */
}
```

#### `flex-shrink`
Defines how an item shrinks relative to others.

```css
.item {
    flex-shrink: 1; /* Item will shrink to fit container */
}
```

#### `flex-basis`
Defines the initial size of an item before growing or shrinking.

```css
.item {
    flex-basis: 200px; /* Item starts with 200px width */
}
```

#### `align-self`
Allows individual flex items to override the container's `align-items`.

```css
.item {
    align-self: flex-start;
}
```

### Complete Flexbox Example

```html
<div class="flex-container">
    <div class="flex-item">Item 1</div>
    <div class="flex-item">Item 2</div>
    <div class="flex-item">Item 3</div>
</div>
```

```css
.flex-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 200px;
    padding: 20px;
    background-color: #f0f0f0;
}

.flex-item {
    flex: 1;
    padding: 20px;
    background-color: #3498db;
    color: white;
    text-align: center;
    margin: 0 10px;
}
```

---

## CSS Grid Layout

CSS Grid is a **two-dimensional layout system** that allows you to arrange items in rows and columns simultaneously.

### Grid Container Properties

#### `display: grid`
Turns the container into a grid.

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* Creates three equal-width columns */
}
```

#### `grid-template-rows`
Defines the height of each row.

```css
.container {
    grid-template-rows: 100px 200px auto;
}
```

#### `grid-gap` (or `gap`)
Sets the space between rows and columns.

```css
.container {
    gap: 20px; /* Modern syntax */
    /* grid-gap: 20px; Legacy syntax */
}
```

#### `grid-template-areas`
Allows naming specific grid areas for easier layout control.

```css
.container {
    grid-template-areas:
        "header header header"
        "main main sidebar"
        "footer footer footer";
}
```

### Grid Item Properties

#### `grid-column`
Defines the horizontal placement of a grid item.

```css
.item {
    grid-column: 2 / 4; /* Item spans from column 2 to 4 */
    /* Alternative syntax: */
    grid-column-start: 2;
    grid-column-end: 4;
}
```

#### `grid-row`
Defines the vertical placement of a grid item.

```css
.item {
    grid-row: 1 / 3; /* Item spans from row 1 to 3 */
}
```

### Complete Grid Example

```html
<div class="grid-container">
    <header class="header">Header</header>
    <main class="main">Main Content</main>
    <aside class="sidebar">Sidebar</aside>
    <footer class="footer">Footer</footer>
</div>
```

```css
.grid-container {
    display: grid;
    grid-template-areas:
        "header header header"
        "main main sidebar"
        "footer footer footer";
    grid-template-rows: auto 1fr auto;
    gap: 20px;
    min-height: 100vh;
}

.header { grid-area: header; background-color: #3498db; }
.main { grid-area: main; background-color: #ecf0f1; }
.sidebar { grid-area: sidebar; background-color: #95a5a6; }
.footer { grid-area: footer; background-color: #34495e; }
```

---

## CSS Variables

CSS Variables (Custom Properties) are reusable values that can be set and accessed anywhere in your CSS, making maintenance and theming much easier.

### Basic Syntax

```css
:root {
    --primary-color: #3498db;
    --secondary-color: #2ecc71;
    --font-size-large: 24px;
    --spacing-unit: 16px;
}

.button {
    background-color: var(--primary-color);
    color: var(--secondary-color);
    font-size: var(--font-size-large);
    padding: var(--spacing-unit);
}
```

### Theming with CSS Variables

```css
:root {
    --background-color: #ffffff;
    --text-color: #333333;
    --primary-color: #3498db;
    --shadow: 0 2px 4px rgba(0,0,0,0.1);
}

body {
    background-color: var(--background-color);
    color: var(--text-color);
    transition: background-color 0.3s ease, color 0.3s ease;
}

/* Dark theme */
.dark-theme {
    --background-color: #2c3e50;
    --text-color: #ecf0f1;
    --primary-color: #5dade2;
    --shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.card {
    background-color: var(--background-color);
    color: var(--text-color);
    box-shadow: var(--shadow);
    padding: var(--spacing-unit);
}
```

### JavaScript Theme Toggle

```javascript
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}
```

---

## Responsive Layouts

Combine Flexbox and Grid with media queries to create layouts that adapt to various screen sizes.

### Responsive Flexbox Example

```css
.flex-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;
}

.flex-item {
    flex: 1 1 calc(33.333% - 20px); /* 3 columns on larger screens */
    min-width: 250px;
}

@media (max-width: 768px) {
    .flex-item {
        flex: 1 1 calc(50% - 20px); /* 2 columns on tablets */
    }
}

@media (max-width: 480px) {
    .flex-item {
        flex: 1 1 100%; /* 1 column on mobile */
    }
}
```

### Responsive Grid Example

```css
.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}

@media (max-width: 768px) {
    .grid-container {
        grid-template-columns: 1fr; /* Single column on mobile */
    }
}
```

---

## CSS Transitions

CSS transitions allow you to change property values smoothly over a given duration, creating elegant hover effects and state changes.

### Syntax

```css
element {
    transition: property duration timing-function delay;
}
```

- **property**: The CSS property to transition (e.g., `background-color`, `transform`, `opacity`)
- **duration**: How long the transition lasts (e.g., `0.5s`, `200ms`)
- **timing-function**: Speed curve (`ease`, `linear`, `ease-in`, `ease-out`, `cubic-bezier()`)
- **delay**: Delay before the transition starts (e.g., `0.2s`)

### Transition Examples

#### Simple Button Transition

```css
.button {
    background-color: #3498db;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.button:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}
```

#### Multiple Property Transitions

```css
.card {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: 
        transform 0.3s ease,
        box-shadow 0.3s ease,
        background-color 0.3s ease;
}

.card:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    background-color: #f8f9fa;
}
```

---

## CSS Animations

CSS animations allow you to define keyframes for complex, multi-step animations that can loop and have precise control over timing.

### Animation Syntax

```css
element {
    animation: name duration timing-function delay iteration-count direction fill-mode;
}

@keyframes animation-name {
    0% { /* initial styles */ }
    50% { /* middle styles */ }
    100% { /* final styles */ }
}
```

### Animation Properties

- **name**: The name of the keyframes animation
- **duration**: How long the animation lasts
- **timing-function**: Speed curve of the animation
- **delay**: Delay before the animation starts
- **iteration-count**: Number of times to repeat (`infinite` for continuous loop)
- **direction**: Animation direction (`normal`, `reverse`, `alternate`, `alternate-reverse`)
- **fill-mode**: What happens when animation isn't playing (`forwards`, `backwards`, `both`)

### Animation Examples

#### Bouncing Animation

```css
@keyframes bounce {
    0%, 100% {
        transform: translateY(0);
        animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
        transform: translateY(-25px);
        animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
}

.bouncing-element {
    animation: bounce 1s infinite;
}
```

#### Rotation Animation

```css
@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.spinning-element {
    animation: rotate 2s linear infinite;
}
```

#### Fade In Animation

```css
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in-element {
    animation: fadeIn 0.6s ease-out forwards;
}
```

---

## CSS Transforms

CSS transforms allow you to apply various transformations without affecting the document flow.

### Transform Functions

#### `translate()`
Moves an element along the X and Y axes.

```css
.element {
    transform: translate(50px, 100px); /* Move right 50px, down 100px */
    transform: translateX(50px); /* Move only horizontally */
    transform: translateY(100px); /* Move only vertically */
}
```

#### `rotate()`
Rotates an element by a specified angle.

```css
.element {
    transform: rotate(45deg); /* Rotate 45 degrees clockwise */
    transform: rotate(-90deg); /* Rotate 90 degrees counter-clockwise */
}
```

#### `scale()`
Resizes an element.

```css
.element {
    transform: scale(1.5); /* Scale to 150% of original size */
    transform: scale(2, 0.5); /* Scale width to 200%, height to 50% */
    transform: scaleX(1.5); /* Scale only width */
    transform: scaleY(0.8); /* Scale only height */
}
```

#### `skew()`
Skews an element along the X and Y axes.

```css
.element {
    transform: skew(20deg, 10deg); /* Skew X by 20deg, Y by 10deg */
    transform: skewX(20deg); /* Skew only horizontally */
    transform: skewY(10deg); /* Skew only vertically */
}
```

### Combining Transforms

```css
.element {
    transform: translate(50px, 100px) rotate(45deg) scale(1.2);
}
```

### Transform Origin

Control the point around which transformations occur.

```css
.element {
    transform-origin: center; /* Default */
    transform-origin: top left;
    transform-origin: 50% 50%;
    transform-origin: 20px 30px;
}
```

---

## Combining Effects

Create sophisticated interactions by combining transitions, animations, and transforms.

### Interactive Card Example

```html
<div class="interactive-card">
    <div class="card-content">
        <h3>Interactive Card</h3>
        <p>Hover to see the magic!</p>
    </div>
</div>
```

```css
.interactive-card {
    width: 300px;
    height: 200px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 15px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
}

.interactive-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
}

.interactive-card:hover {
    transform: translateY(-10px) rotateX(10deg);
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}

.interactive-card:hover::before {
    transform: translateX(100%);
}

.card-content {
    padding: 30px;
    color: white;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
```

### Animated Loading Spinner

```css
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

.loading-spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

.loading-text {
    animation: pulse 1.5s ease-in-out infinite;
    margin-top: 20px;
    text-align: center;
}
```

---

## Performance Tips

### Optimize Animations for Better Performance

1. **Use `transform` and `opacity` properties** - These can be animated efficiently by the GPU.

```css
/* Good - GPU accelerated */
.element {
    transform: translateX(100px);
    opacity: 0.5;
}

/* Avoid - Causes layout recalculation */
.element {
    left: 100px;
    width: 200px;
}
```

2. **Use `will-change` property** - Tells the browser which properties will change.

```css
.element {
    will-change: transform, opacity;
}

/* Remove after animation completes */
.element.animation-complete {
    will-change: auto;
}
```

3. **Use `transform3d()` to trigger hardware acceleration**.

```css
.element {
    transform: translate3d(50px, 100px, 0); /* Forces 3D context */
}
```

4. **Prefer CSS animations over JavaScript** for simple animations.

5. **Use `animation-fill-mode`** to control element state before and after animation.

```css
.element {
    animation: slideIn 0.5s ease-out forwards; /* Keeps final state */
}
```

---

## Practice Tasks

### Task 1: Responsive Grid Layout
Create a responsive grid layout with three columns that switches to one column on smaller screens.

```css
.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    padding: 20px;
}

@media (max-width: 768px) {
    .grid-container {
        grid-template-columns: 1fr;
    }
}
```

### Task 2: Flexbox Navigation
Use Flexbox to create a navigation bar with evenly spaced links.

```css
.navbar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 1rem;
    background-color: var(--primary-color);
}

.nav-link {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    transition: background-color 0.3s ease;
}

.nav-link:hover {
    background-color: rgba(255,255,255,0.1);
    border-radius: 4px;
}
```

### Task 3: Theme Toggle System
Define CSS variables for light and dark themes with a class toggle.

```css
:root {
    --bg-color: #ffffff;
    --text-color: #333333;
    --accent-color: #3498db;
}

.dark-theme {
    --bg-color: #2c3e50;
    --text-color: #ecf0f1;
    --accent-color: #5dade2;
}

body {
    background-color: var(--bg-color);
    color: var(--text-color);
    transition: all 0.3s ease;
}
```

### Task 4: Infinite Rotation Animation
Create an element that rotates infinitely.

```css
@keyframes infiniteRotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.rotating-element {
    animation: infiniteRotate 3s linear infinite;
}
```

### Task 5: Hover Bounce Effect
Create a bouncing effect on a button when hovered.

```css
@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    25% { transform: translateY(-10px); }
    50% { transform: translateY(-5px); }
    75% { transform: translateY(-7px); }
}

.bounce-button {
    transition: all 0.3s ease;
}

.bounce-button:hover {
    animation: bounce 0.6s ease;
}
```

### Task 6: Scale Transformation
Create a transformation that enlarges a box when hovered with smooth transition.

```css
.scale-box {
    width: 200px;
    height: 200px;
    background-color: #3498db;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.scale-box:hover {
    transform: scale(1.1);
}
```

---

## Resources and References

- [MDN CSS Flexbox Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout)
- [MDN CSS Grid Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [CSS Tricks - A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [CSS Tricks - A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Can I Use - Browser Compatibility](https://caniuse.com/)

---

*Last updated: [Current Date]*