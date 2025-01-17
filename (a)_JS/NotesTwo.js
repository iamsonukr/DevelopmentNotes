function helloWorld(){
    console.log("HEllo world")
}

const hello2=()=>{
    console.log("Hello world")
}

hello2()

const addTwo=(a,b)=>{
    console.log(a+b)
}

addTwo(10,11)

function outerFunction() {
    let outerVariable = 'I am outside!';
    
    function innerFunction() {
      console.log(outerVariable); // innerFunction has access to outerVariable
    }
    
    return innerFunction;
  }
  
  const closureExample = outerFunction(); // outerFunction returns innerFunction
  closureExample(); // Logs: "I am outside!"


  // __________________________ Replace Delete ______________________
  const students={
    name:"Sonu Kumar",
    std:"red",
    power:10
}

const {power, ...newStudents } = students;
console.log(newStudents)


// ----------------------------------------------------------- express request types   ----------------------------------

// 1. req.body
// Purpose: Contains the data sent in the body of the HTTP request. Typically used in POST, PUT, and PATCH requests.
// Format: Depends on the Content-Type of the request. For JSON data, you need middleware like express.json() to parse it.

// javascript
// Copy code
// app.use(express.json()); // Middleware to parse JSON body

app.post('/submit', (req, res) => {
    console.log(req.body); // Access the body data
    res.send(`Received name: ${req.body.name}`);
});
// Request:
// bash
// Copy code
// POST /submit
// Content-Type: application/json

{ "name": "John Doe" }
Output: { name: 'John Doe' }

// 2. req.query
// Purpose: Contains the query string parameters in the URL. Commonly used in GET requests.
// Format: Key-value pairs in the query string.
// Example:

app.get('/search', (req, res) => {
    console.log(req.query); // Access query parameters
    res.send(`Searched for: ${req.query.keyword}`);
});
// Request:
// sql
// Copy code
// GET /search?keyword=JavaScript
// Output: { keyword: 'JavaScript' }

// 3. req.params
// Purpose: Contains route parameters, which are dynamic parts of the URL specified in the route definition.
// Format: Key-value pairs derived from the URL path.

// Example:
// javascript
// Copy code

app.get('/user/:id', (req, res) => {
    console.log(req.params); // Access route parameters
    res.send(`User ID: ${req.params.id}`);
});

Request:

// sql
// Copy code
// GET /user/123
// Output: { id: '123' }

// 4. req.headers
// Purpose: Contains information about the request, such as content type, authorization tokens, and custom headers.
// Format: Key-value pairs of headers sent with the request.

// Example:
// javascript
// Copy code

app.get('/info', (req, res) => {
    console.log(req.headers); // Access request headers
    res.send(`User-Agent: ${req.headers['user-agent']}`);
});

// Request:
// sql
// Copy code
// GET /info
// User-Agent: Mozilla/5.0
// Output: User-Agent: Mozilla/5.0


// Property     | Use Case                  | Accessed From         | Example Request
// ------------------------------------------------------------------------------------
// req.body     | Request body data         | POST/PUT/PATCH        | { "name": "John" } (JSON)
// req.query    | Query string parameters   | GET                   | /search?keyword=JavaScript
// req.params   | URL route parameters      | Any                   | /user/123 (Route: /user/:id)
// req.headers  | Request header information| Any                   | Authorization: Bearer token (in headers)


// ___________________________________ Session Based Authentication __________________________________

const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({
    secret: 'your-secret-key',  // Used to sign the session ID cookie
    resave: false,             // Prevents resaving unchanged sessions
    saveUninitialized: true,   // Saves new sessions that are unmodified
    cookie: { secure: false }  // Set to true if using HTTPS
}));

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'user' && password === 'pass') {
        req.session.user = { username }; // Store user info in the session
        res.send('Logged in!');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Protected route
app.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.send(`Welcome, ${req.session.user.username}`);
    } else {
        res.status(401).send('Please log in first');
    }
});

// Logout route
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Logout failed');
        }
        res.send('Logged out!');
    });
});

// Start the server
app.listen(3000, () => console.log('Server running on port 3000'));



// ___________________ Refresh token _______________

// Using a refresh token in JWT (JSON Web Token) authentication allows you to issue short-lived access tokens while providing a way to get a new access token without requiring the user to log in again. Here's how to implement and use refresh tokens:

const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

const ACCESS_TOKEN_SECRET = 'access-token-secret';
const REFRESH_TOKEN_SECRET = 'refresh-token-secret';

let refreshTokens = []; // Store refresh tokens (use a database in production)

// Login route
app.post('/login', (req, res) => {
    const { username } = req.body;

    // Validate user (for demo purposes, assume any username is valid)
    const user = { username };

    // Generate tokens
    const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign(user, REFRESH_TOKEN_SECRET);

    refreshTokens.push(refreshToken); // Save refresh token
    res.json({ accessToken, refreshToken });
});

// Token refresh route
app.post('/token', (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.sendStatus(401);
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        // Generate new access token
        const accessToken = jwt.sign({ username: user.username }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        res.json({ accessToken });
    });
});

// Logout route
app.post('/logout', (req, res) => {
    const { refreshToken } = req.body;
    refreshTokens = refreshTokens.filter(token => token !== refreshToken); // Remove token from store
    res.sendStatus(204);
});

// Protected route
app.get('/protected', authenticateToken, (req, res) => {
    res.send(`Hello, ${req.user.username}! This is protected.`);
});

// Middleware for authenticating access token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.listen(3000, () => console.log('Server running on port 3000'));


// How It Works
// Login:

// User logs in, and the server generates an accessToken (short-lived) and a refreshToken (long-lived).
// The refreshToken is stored server-side or in a database.
// Access Token Expiration:

// When the accessToken expires, the client sends the refreshToken to the /token endpoint to request a new accessToken.
// Verify Refresh Token:

// The server verifies the refreshToken and issues a new accessToken if valid.
// Logout:

// The server invalidates the refreshToken by removing it from the store.
