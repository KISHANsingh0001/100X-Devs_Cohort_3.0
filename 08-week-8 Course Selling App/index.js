
/**
Create a course selling app
    - Initialize a new Node.js project
    - Add Express, jsonwebtoken, mongoose to it as a dependency
    - Create index.js
    - Add route skeleton for user login, signup, purchase a course, sees all course, see the purchased course
    - Add routes for admin login, admin signup, create a course, delete a course, add course content.
    - Add middlewares for user and admin auth
    - Add a database (mongodb), use dotenv to store the database connection string
    - Define the schema for User, Admin, Course, Purchase
    - Complete the routes for user login, signup, purchase a course, see course
*/

// Import express, and mongoose modules
require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");

// Import the userRouter, courseRouter, adminRouter from the routes folder
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const exp = require("constants");

// Initialize express app
const app = express();
app.use(express.json());

// use the routes in the app object
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

/*
// create user routes and course routes using the functions
createUserRoutes();
createCourseRoutes();
*/

// Create a main function to connect to the database and start the server
async function main() {
    try {
        // Use environment variable for the connection string
       await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to the database");
        
        // Start the server on port 3000
        app.listen(3000, () => {
            console.log("Server is listening on port 3000");
        });
    } catch (error) {
        console.error("Failed to connect to the database:", error);
       
    }
}

// Call the main function
main();
