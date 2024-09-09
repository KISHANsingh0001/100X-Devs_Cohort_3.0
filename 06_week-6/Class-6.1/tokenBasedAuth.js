const express = require("express");

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

const users = [];

// Function to generate a random token of 32 characters
function generateToken() {
    const options = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
    for (let i = 0; i < 32; i++) {
        token += options.charAt(Math.floor(Math.random() * options.length));
    }
    return token;
}

// Route to handle user signup
app.post("/signup", function(req, res) {
    const { username, password } = req.body;

    // Check if the user already exists
    let userExists = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            userExists = true;
            break;
        }
    }

    if (userExists) {
        // Respond with an error if the user already exists
        return res.status(400).json({
            msg: "User already exists"
        });
    }

    // Add new user to the array
    users.push({
        username: username,
        password: password
    });

    // Respond with a success message
    res.status(201).json({
        message: "You are signed up"
    });
});

// Route to handle user sign-in
app.post("/signin", function(req, res) {
    const { username, password } = req.body;

    // Find the user with matching username and password
    let foundUser = null;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            foundUser = users[i];
            break;
        }
    }

    if (foundUser) {
        // Generate a token and assign it to the user
        const token = generateToken();
        foundUser.token = token;
        res.status(200).json({
            message: "You have signed in successfully!",
            token: token
        });
    } else {
        // Respond with an error User not found
        res.status(401).json({
            message: "Invalid username or password!"
        });
    }
});

// Route to retrieve user details based on the token
app.get("/me", function(req, res) {
    // Retrieve the token from the Authorization header
    const token = req.headers.authorization;

    // Find the user with the matching token
    let foundUser = null;
    for (let i = 0; i < users.length; i++) {
        if (users[i].token === token) {
            foundUser = users[i];
            break;
        }
    }

    if (foundUser) {
        // Respond with user details
        res.json({
            username: foundUser.username,
            password: foundUser.password
        });
    } else {
        // Respond with an error if the token is invalid
        res.status(401).json({
            msg: "Token is invalid"
        });
    }
});

// Start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});