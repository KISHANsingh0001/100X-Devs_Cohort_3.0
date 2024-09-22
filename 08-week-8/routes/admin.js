// Import express module 
// let express = require('express');
// Create a new Router instance for admin routes
// let router = express.Router();


// Import Router from express module
const { Router } = require("express");

// Create a new Router instance for admin routes
const adminRouter = Router();

// Import adminModel from db.js
const { adminModel } = require("../db");

// Define the admin routes for signup 
adminRouter.post("/signup", function (req, res) {
    res.json({
        message: "Admin Signup endpoint",
    });
});

// Define the admin routes for signin 
adminRouter.post("/signin", function (req, res) {
    res.json({
        message: "Admin Signin endpoint",
    });
});

// Define the admin routes for creating a course 
adminRouter.post("/", function (req, res) {
    res.json({
        message: "Admin Course endpoint",
    });
});

// Define the admin routes for updating a course
adminRouter.put("/", function (req, res) {
    res.json({
        message: "Admin Updating course endpoint",
    });
});

// Define the admin routes for getting all courses
adminRouter.get("/bulk", function (req, res) {
    res.json({
        message: "Admin geting bulk  Courses endpoint",
    });
});

// Export the adminRouter so that it can be used in other files
module.exports = {
    adminRouter: adminRouter,
};