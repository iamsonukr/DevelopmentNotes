
-------------------------------HTML Lecture 1: Basics of HTML-----------------------------
1. Introduction
HTML (HyperText Markup Language) is the standard language for creating web pages.
Structure: HTML documents are made of elements enclosed in tags (<tag>).

2. Basic Structure
<!DOCTYPE html>
<html>
<head>
    <title>Page Title</title>
</head>
<body>
    <h1>Welcome to HTML</h1>
    <p>This is a paragraph.</p>
</body>
</html>

3. Key Components
<!DOCTYPE html>: Declares the document type.
<html>: Root element.
<head>: Metadata about the document (e.g., title, styles).
<body>: Main content visible on the page.

4. Basic Tags
Headings: <h1> to <h6> (largest to smallest).
Paragraph: <p>.
Line Break: <br>.
Horizontal Line: <hr>.

5. Attributes
Provide additional information about elements.
Syntax: <tag attribute="value">.
Example: <p style="color: red;">This is red text.</p>.

6. Comments
Syntax: <!-- This is a comment -->.
Task:
Create a simple HTML document with a heading, a paragraph, and a horizontal line.


---------------------------------------- HTML Lecture 2: Essential Elements ---------------------------------


1. Text Formatting Tags
Bold: <b>Text</b> or <strong>Text</strong> (semantic emphasis).
Italic: <i>Text</i> or <em>Text</em> (semantic emphasis).
Underline: <u>Text</u>.
Superscript: <sup>Text</sup>.
Subscript: <sub>Text</sub>.

2. Links
Create hyperlinks using <a> tag.
Syntax: <a href="URL">Link Text</a>.
Example:
<a href="https://www.google.com" target="_blank">Visit Google</a>
target="_blank": Opens the link in a new tab.

3. Images
Add images using <img> tag.
Syntax: <img src="URL" alt="Description" />.
Example:
<img src="image.jpg" alt="Sample Image" width="300" height="200" />

4. Lists
Ordered List:
<ol>
    <li>Item 1</li>
    <li>Item 2</li>
</ol>
Unordered List:
<ul>
    <li>Item A</li>
    <li>Item B</li>
</ul>

5. Tables
Structure:
<table border="1">
    <tr>
        <th>Header 1</th>
        <th>Header 2</th>
    </tr>
    <tr>
        <td>Data 1</td>
        <td>Data 2</td>
    </tr>
</table>
Task:
Create an HTML file with:
A link to an external website.
An image with alternate text.
An unordered list of 3 items.
A table with 2 rows and 2 columns.



--------------------------------------HTML Lecture 3: Forms and Multimedia---------------------------

1. HTML Forms
Used to collect user input.

Basic Syntax:

<form action="submit-url" method="post">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" />
    
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" />
    
    <input type="submit" value="Submit" />
</form>
Common Input Types:

Text: <input type="text" />
Password: <input type="password" />
Email: <input type="email" />
Radio Buttons: <input type="radio" name="group" value="Option" />
Checkbox: <input type="checkbox" name="option" />
Button: <input type="submit" /> or <button>Click Me</button>.

2. Dropdowns and Textareas
Dropdown Menu:
<select name="options">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
</select>

Textarea:
<textarea name="message" rows="4" cols="50"></textarea>

3. Audio
Embed audio in your webpage.

<audio controls>
    <source src="audio.mp3" type="audio/mpeg">
</audio>

4. Video
Embed video content.

<video controls width="500">
    <source src="video.mp4" type="video/mp4">
    Your browser does not support the video element.
</video>

5. Iframe
Embed external content.

<iframe src="https://www.example.com" width="600" height="400"></iframe>
Task:
Create a form with the following:

Text input for name and email.
Radio buttons for gender selection.
A dropdown for country selection.
A submit button.
Additionally, add an audio file and an embedded YouTube video.



--------------------------------HTML Lecture 4: Semantic Elements and HTML5 Features--------------------------
1. Semantic Elements
Semantic elements provide meaningful structure to your HTML code.

Common Semantic Tags:

<header>: Defines the header of a document or section.
<nav>: Contains navigation links.
<main>: Represents the main content of the document.
<section>: Defines a section within the content.
<article>: Represents an independent piece of content (e.g., blog post).
<aside>: Sidebar content related to the main content.
<footer>: Defines the footer of a document or section.
Example:

<header>
    <h1>Website Title</h1>
    <nav>
        <a href="#home">Home</a>
        <a href="#about">About</a>
    </nav>
</header>
<main>
    <section>
        <h2>About Us</h2>
        <p>Welcome to our website!</p>
    </section>
    <aside>
        <h3>Related Links</h3>
        <ul>
            <li><a href="#">Blog</a></li>
        </ul>
    </aside>
</main>
<footer>
    <p>&copy; 2024 Your Company</p>
</footer>

2. HTML5 Features
Canvas: Used to draw graphics via JavaScript.
<canvas id="myCanvas" width="400" height="200" style="border:1px solid #000;">
</canvas>
SVG (Scalable Vector Graphics): Used to define vector graphics.
<svg width="100" height="100">
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg>

3. Media Queries (Responsive Design)
Define styles based on screen size.
Example:
<style>
    body {
        font-size: 16px;
    }
    @media (max-width: 600px) {
        body {
            font-size: 12px;
        }
    }
</style>

4. HTML5 Input Types
Date Picker: <input type="date" />
Color Picker: <input type="color" />
Range Slider: <input type="range" min="0" max="100" />
Task:
Create a webpage using:

Semantic elements (<header>, <main>, <footer>).
A <canvas> element.
A <section> displaying a responsive layout using media queries.


--------------------------HTML Lecture 5: Advanced Concepts and Best Practices---------------------------

1. Meta Tags
Meta tags provide metadata about the HTML document and are placed in the <head>.

Examples:
Character set: <meta charset="UTF-8">
Viewport settings (for responsive design):
<meta name="viewport" content="width=device-width, initial-scale=1.0">
Description: <meta name="description" content="Learn HTML quickly.">
Keywords: <meta name="keywords" content="HTML, Web Development">

2. Accessibility
Ensure websites are usable by everyone, including people with disabilities.
Best Practices:
Use alt attributes for images.
Provide labels for form inputs:
<label for="username">Username:</label>
<input type="text" id="username" name="username" />
Use ARIA roles (role="navigation", role="button") for screen readers.

3. Data Attributes
Custom attributes for embedding additional data in HTML elements.
Syntax: data-*.
Example:
<div data-user-id="12345">User Name</div>

4. HTML Entities
Special characters that cannot be directly written in HTML.

Examples:
&nbsp; → Non-breaking space.
&lt; → <
&gt; → >
&amp; → &

5. Best Practices for Clean HTML
Use semantic tags: Improves readability and SEO.
Indent code: Makes it easier to maintain.
Avoid inline styles: Use external CSS for styling.
Validate HTML: Check for errors using W3C Validator.

6. HTML with CSS and JavaScript
Link external stylesheets:
<link rel="stylesheet" href="styles.css" />
Include external JavaScript:
<script src="script.js"></script>
Task:
Create an HTML page with:

Proper meta tags for responsiveness.
A form with labeled inputs and accessible attributes.
Custom data attributes for elements.
Use an external CSS and JavaScript file.





