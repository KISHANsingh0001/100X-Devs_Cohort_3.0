// Import express module 
// let express = require('express');
// Create a new Router instance for user routes
// let router = express.Router();


// Import Router from express module
const { Router } = require("express");
const { userModel, purchaseModel, courseModel } = require("../db");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { userMiddleware } = require("../middleware/user");
// Create a new Router instance for user routes
const userRouter = Router();

// Define the user routes for signup 
userRouter.post("/signup", async function (req, res) {
    const requireBody = z.object({
        email: z.string().min(3).max(50),

        password: z.string().min(4).max(20)
            .refine(function (password) {
                return /[A-Z]/.test(password);
            }, {
                message: "Password Must have atleast one uppercase latter"
            }).refine(function (password) {
                return /[a-z]/.test(password);
            }, {
                message: "password must have atleast one lowercase latter"
            }).refine(function (password) {
                return /[!@#$%^&*(),.?":{}|<>]/.test(password);
            }, {
                message: "password Must have atleast one spacial latter"
            }),

        firstName: z.string().min(3).max(24),

        lastName: z.string().min(3).max(20)
    })
    const parseDataWithSucsses = requireBody.safeParse(req.body);

    if (!parseDataWithSucsses.success) {
        return res.status(401).json({
            msg: "Ivalid formate ",
            error: parseDataWithSucsses.error
        })
    }
    const { email, password, firstName, lastName } = parseDataWithSucsses.data;

    const hasedPassword = await bcrypt.hash(password, 5);
    // TODO : hash the password 
    try {
        await userModel.create({
            email,
            password: hasedPassword,
            firstName,
            lastName
        })
        res.json({
            message: "User Signup Sucssesfuly",
        });
    } catch (e) {
        res.json({
            msg: "you are alrady signed up",
        });
    }
});

// Define the user routes for signin 
userRouter.post("/signin", async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    // Find the user with the given email
    const user = await userModel.findOne({
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

    if (passwordMatch) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_USER_PASSWORD);

        res.status(200).json({
            msg: "You are signed in ",
            token
        })
    }
    else {
        res.status(403).json({
            msg: "Invalid Credentials"
        })
    }

});

// Define the user routes for purchases made by the user
userRouter.get("/purchases", userMiddleware, async function (req, res) {
    const userId = req.userId;

    try {
        // Find all purchases made by the user
        const purchases = await purchaseModel.find({ userId });

        if (purchases.length === 0) {
            return res.status(204).json({
                msg: "You have not purchased any courses yet."
            });
        }

        // Initialize an empty array to store the course details
        const purchasedCourses = [];

        // Use a for...of loop to iterate over each purchase
        for (const purchase of purchases) {
            // Find the course corresponding to the purchase's courseId
            const course = await courseModel.findById(purchase.courseId);

            // If the course exists, add it to the purchasedCourses array
            if (course) {
                purchasedCourses.push(course);
            }
        }

        // Return the purchased courses
        return res.status(200).json({
            msg: "Your purchases are:",
            purchasedCourses
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server is down!",
            error: error.message // Include the error message for better debugging
        });
    }
});

// Export the userRouter so that it can be used in other files
module.exports = {
    userRouter: userRouter,
};


/*
function createUserRoutes() {
    app.post("/user/signup", function (req, res) {
        res.json({
            message: "Signup endpoint!",
        });
    });

    app.post("/user/signin", function (req, res) {
        res.json({
            message: "Signin endpoint!",
        });
    });

    app.get("/user/purchases", function (req, res) {
        res.json({
            message: "Purchases endpoint!",
        });
    });
}

module.exports = {
    createUserRoutes: createUserRoutes,
};
*/