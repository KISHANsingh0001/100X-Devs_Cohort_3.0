// Import express module 
// let express = require('express');
// Create a new Router instance for course routes
// let router = express.Router();


// Import Router from express module
const { Router } = require("express");

// Import courseModel from db.js
const { courseModel, purchaseModel } = require("../db");
const { userMiddleware } = require("../middleware/user");

// Create a new Router instance for course routes
const courseRouter = Router();

// Define the course routes for purchaseing a course
courseRouter.post("/purchase", userMiddleware, async function (req, res) {
    // you would expect the user to pay money to purchase a course
    const userId = req.userId; // Get userId from the authenticated request
    const { courseId } = req.body; // Get courseId from the request body

    // validate courseId
    if (!courseId) {
        res.status(400).json({
            msg: "Course Id is required"
        })
    }

    try {
        // check if the course exists in courses stock
        const course = courseModel.findById(courseId);
        if (!course) {
            return res.status(400).json({ msg: "Course not Avalible" });
        }

        // check if the user has already purchased the course
        const existingPurchase = purchaseModel.findOne({
            userId,
            courseId
        });
        if (existingPurchase) {
            res.status(400).json({
                msg: "You have already purchase this course"
            })
        }

        // Create a new purchase record
        await purchaseModel.create({
            userId,
            courseId
        });

        res.status(200).json({
            msg: `You have successfully bought the course`
        });
    } catch (e) {
        res.status(500).json({
            msg: "Failed to complete the purchase",
            error: error.message
        })
    }
});

// Define the course routes for getting all courses
courseRouter.get("/preview", async function (req, res) {
    const course = await courseModel.find({});
    res.json({
        msg: "Avalibal Courses List",
        course,
    });
});

// Export the courseRouter so that it can be used in other files
module.exports = {
    courseRouter: courseRouter,
};


/*
function createUserRoutes() {
    app.get("/course/preview", function (req, res) {
        // you would expect the user to pay money to purchase a course

        res.json({
            message: "Priview endpoint!",
        });
    });

    app.get("/courses", function (req, res) {
        res.json({
            message: "Pourses endpoint!",
        });
    });
}

module.exports = {
    createUserRoutes: createUserRoutes,
};
*/