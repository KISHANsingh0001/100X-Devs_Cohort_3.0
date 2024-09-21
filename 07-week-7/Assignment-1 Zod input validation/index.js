/**
 * Assignment #1 - Add validations to ensure email and password are correct format using Zod. 
 * Check the password has minimum 1 Uppercase character, 1 Special Character, 1 number and 
 * lowercase character.
 */
// Import the express, mongoose, and jwt modules
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const mongoose = require("mongoose");
const { z } = require("zod");
const { auth, JWT_SECRET } = require(__dirname + "/auth")

// Import the UserModel and TodoModel from the db.js file
const { UserModel, TodoModel } = require(__dirname + "/db");

// Create an instance of the express module
const app = express();

// Parse the JSON data using the express.json() middleware
app.use(express.json());

// Connect to the MongoDB database using the mongoose.connect() method
mongoose.connect("mongodb+srv://kishansinghthakur27:GuQ4OM7AiKlAO5I8@cluster0.k0ymi.mongodb.net/todo-app-database");


// Create a POST route for the signup endpoint
app.post("/signup", async function (req, res) {
    // Input Validation using Zod
    const requireBody = z.object({
        // email is must be a string, min 3 characters, max 100 characters, and must be a valid email
        email: z.string().min(3).max(100).email(),
        // password is must be a string, min 3 characters, max 100 characters containes one Uppercase , one Lowercase, one spacial charactor 
        password: z.string().min(3).max(100).refine(function (password) {
            return /[A-Z]/.test(password)
        }, {
            message: "Password must have at least one uppercase letter"
        }).refine(function (password) {
            return /[a-z]/.test(password);
        }, {
            message: "Password must have at least one lowercase letter"
        }).refine(function (password) {
            return /\d/.test(password);
        }, {
            message: "Password must have at least one number"
        }).refine(function (password) {
            return /[!@#$%^&*(),.?":{}|<>]/.test(password);
        }, {
            message: "Password must have atleast one spacial charactor"
        }),
        name: z.string().min(3).max(100), // name is must be a string, min 3 characters, max 100 characters
    });

    // const paseData = requireBody.pase(req.body);
    // Parse the request body using the requireBody.safeParse() method to validate the data format
    const parseDataWithSuccess = requireBody.safeParse(req.body);

    // If the data format is incorrect, send an error message to the client
    if (!parseDataWithSuccess.success) {
        return res.status(400).json({
            message: "Incorrect data format",
            error: parseDataWithSuccess.error,
        });
    }
    // Get the email, password, and name from the request body
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;



    // Hash the password using the bcrypt.hash() method
    const hashedPassword = await bcrypt.hash(password, 5);
    // console.log(hashedPassword);

    try {
        // Create a new user using the UserModel.create() method
        await UserModel.create({
            email: email,
            password: hashedPassword,
            name: name,
        });
    } catch (error) {
        return res.status(400).json({
            message: "User already exists!",
        });
    }

    // Send a response to the client
    res.json({
        message: "You are signed up!",
    });
});

// Create a POST route for the signin endpoint
app.post("/signin", async function (req, res) {
    // Get the email and password from the request body
    const email = req.body.email;
    const password = req.body.password;

    // Find the user with the given email
    const user = await UserModel.findOne({
        email: email,
    });

    // If the user is not found, send an error message to the client
    if (!user) {
        return res.status(403).json({
            message: "Invalid Credentials!",
        });
    }

    // Compare the password with the hashed password using the bcrypt.compare() method
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If the user password matches
    if (passwordMatch) {
        // Create a JWT token using the jwt.sign() method
        const token = jwt.sign(
            {
                id: user._id.toString(),
            },
            JWT_SECRET
        );

        // Send the token to the client
        res.json({
            token: token,
            message: "You are signed in!",
        });
    } else {
        // If the user is not found, send an error message to the client
        res.status(403).json({
            message: "Invalid Credentials!",
        });
    }
});

// Create a POST route for the todo endpoint
app.post("/makeTodo", auth, async function (req, res) {
    // Get the userId from the request object
    const userId = req.userId;

    // Get the title, and done from the request body
    const title = req.body.title;
    const done = req.body.done;

    // Create a new todo using the TodoModel.create() method
    await TodoModel.create({
        userId,
        title,
        done,
    });

    // Send a response to the client
    res.json({
        message: "Todo created",
    });
});

// Create a GET route for the todo endpoint
app.get("/getTodo", auth, async function (req, res) {
    // Get the userId from the request object
    const userId = req.userId;

    // Find all the todos with the given userId
    const todos = await TodoModel.find({
        userId,
    });

    // Send the todos to the client
    res.json({
        todos,
    });
});
// Start the server on port 3000
app.listen(3000);