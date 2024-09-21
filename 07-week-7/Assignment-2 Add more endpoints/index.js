/**
 * Assignment #2 - Add more endpoints (mark todo as done) for todo-app.
 *      - Optional: Add timestamp at which todo was created/the time it needs to be done
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
        password: z.string().min(3).max(100).refine(function (password){
            return /[A-Z]/.test(password)
        }, {
            message : "Password must have at least one uppercase letter"
        }).refine(function (password){
            return /[a-z]/.test(password);
        },{
            message : "Password must have at least one lowercase letter"
        }).refine(function (password){
            return /\d/.test(password);
        } , {
            message: "Password must have at least one number"
        }).refine(function (password){
            return /[!@#$%^&*(),.?":{}|<>]/.test(password);
        } , {
            message : "Password must have atleast one spacial charactor"
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

// Route for updating a todo's title and done status
app.put("/updateTodo/:id", auth, async function (req, res) {
    const userId = req.userId;

    // Get the todo's id from the request parameters
    const todoId = req.params.id;

    // Get the updated title and done status from the request body
    const { title, done } = req.body;

    // Find the todo by its id and the user's userId
    const todo = await TodoModel.findOne({ _id: todoId, userId });

    // If the todo doesn't exist, return a 404 error
    if (!todo) {
        return res.status(404).json({
            msg: "Todo not found",
        });
    }

    // Update the todo's title and/or done status (only if provided)
    todo.title = title || todo.title;
    todo.done = done !== undefined ? done : todo.done;

    // Save the updated todo in the database
    await todo.save();

    // Send a success message after updating the todo
    res.json({ message: "Todo updated" });
});


app.delete("/deleteTodo/:id" , auth , async function(req , res){
    // Get the userId from the authenticated request
    const userId = req.userId;

    // Get the todo's id from the request parameters
    const todoId = req.params.id;

    // Find the todo by its id and the user's userId
    const todo = await TodoModel.findOne({ _id: todoId, userId });

    // If the todo doesn't exist, return a 404 error
    if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
    }

    // Delete the todo from the database
    await TodoModel.deleteOne({ _id: todoId, userId });

    // Send a success message after deletion
    res.json({ message: "Todo deleted" });
});

// Start the server on port 3000
app.listen(3000);