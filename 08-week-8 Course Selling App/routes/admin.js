// Import express module 
// let express = require('express');
// Create a new Router instance for admin routes
// let router = express.Router();


// Import Router from express module
const { Router } = require("express");
const { z, optional } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

// Create a new Router instance for admin routes
const adminRouter = Router();

// Import adminModel from db.js
const { adminModel, courseModel } = require("../db");
const { adminMiddleware } = require("../middleware/admin");



// Define the admin routes for signup 
adminRouter.post("/signup", async function (req, res) {

    // TODO : adding Zod validation
    const requireData = z.object({
        email: z.string().min(3).max(50).email(),
        password: z.string().min(3).max(50).refine(function (password) {
            return /[A-Z]/.test(password);
        }, {
            message: "Password must have atleast one uppercass latter"
        }).refine(function (password) {
            return /[a-z]/.test(password);
        }, {
            message: "Password must have atleast one lowercase latter"
        }).refine(function (password) {
            return /[!@#$%^&*(),.?":{}|<>]/.test(password);
        }, {
            message: "Password must have atleast one spacial charactor"
        }),
        firstName: z.string().min(3).max(20),
        lastName: z.string().min(3).max(10)
    });
    // Parse the request body using the requireBody.safeParse() method to validate the data format
    const parseDataWithSucsses = requireData.safeParse(req.body);

    if (!parseDataWithSucsses.success) {
        return res.status(403).json({
            msg: "Incorrect data formate",
            error: parseDataWithSucsses.error
        })
    }
    // Get the email, password, and name from the request body
    const { email, password, firstName, lastName } = parseDataWithSucsses.data;

    // TODO : hash the password using bcrypt 
    const hasedPassword = await bcrypt.hash(password, 4);

    try {
        await adminModel.create({
            email: email,
            password: hasedPassword,
            firstName,
            lastName
        })
        res.json({
            message: "Admin SignUp is Done",
        });
    } catch (e) {
        res.json({
            msg: "you are alrady Signed up",
        })
    }
});

// Define the admin routes for signin 
adminRouter.post("/signin", async function (req, res) {
    const { email, password } = req.body;

    const admin = await adminModel.findOne({ email });

    if (!admin) {
        return res.status(403).json({
            msg: "(admin) You are not signed in"
        });
    }

    // Compare the password with the hashed password using the bcrypt.compare() method
    const matchPassword = await bcrypt.compare(password, admin.password);

    if (matchPassword) {
        // Create a JWT token using the jwt.sign() method
        const token = jwt.sign({ id: admin._id }, process.env.JWT_ADMIN_PASSWORD);

        res.status(200).json({
            token: token,
            message: "Admin Signin sucessfuly",
        });

    }
    else {
        res.status(403).json({
            msg: "Invalid Credentials"
        })
    }

});

// Define the admin routes for creating a course 
adminRouter.post("/course", adminMiddleware, async function (req, res) {
    const adminId = req.adminId; // This is the object id of admin collection

    // Define validation schema using Zod
    const requireData = z.object({
        title: z.string().min(4).max(50),
        description: z.string().min(10).max(500),
        imageUrl: z.string(),  // Assuming imageUrl is a URL, you can adjust if not
        price: z.number().positive() // Ensure price is a positive number
    });

    // Validate request body using safeParse
    const parseDataWithSuccess = requireData.safeParse(req.body);

    // If validation fails, return an error response
    if (!parseDataWithSuccess.success) {
        return res.status(400).json({
            msg: "Invalid format",
            error: parseDataWithSuccess.error.errors  // Sending the Zod validation errors
        });
    }

    // Destructure the valid data
    const { title, description, imageUrl, price } = parseDataWithSuccess.data;

    try {
        // Create a new course in the database
        const course = await courseModel.create({
            title: title,
            description: description,
            imageUrl: imageUrl,
            price: price,
            creatorId: adminId
        });

        // Return a success response
        res.json({
            message: `Course "${title}" is successfully created!`,
            courseId: course._id  // Return the newly created course ID
        });
    } catch (e) {
        // Return an error response if something goes wrong
        res.status(500).json({
            msg: "Failed to create course",
            error: e.message  // Send the error message for debugging
        });
    }
});


// Define the admin routes for updating a course
adminRouter.put("/update", adminMiddleware, async function (req, res) {
    const adminId = req.adminId;  // The ID of the logged-in admin

    // Define a Zod schema where all fields are optional
    const requireData = z.object({
        title: z.string().min(4).max(50).optional(),  // Optional
        description: z.string().min(10).max(120).optional(),  // Optional
        imageUrl: z.string().optional(),  // Optional
        price: z.number().optional()  // Optional
    });

    // Validate the request body
    const parseDataWithSuccess = requireData.safeParse(req.body);

    // If validation fails, return an error response
    if (!parseDataWithSuccess.success) {
        return res.status(400).json({
            msg: "Invalid format",
            error: parseDataWithSuccess.error.errors  // Validation errors
        });
    }

    // Extract the fields that are present
    const { title, description, imageUrl, price } = parseDataWithSuccess.data;

    // Ensure courseId is provided
    const { courseId } = req.body;
    if (!courseId) {
        return res.status(400).json({
            msg: "Course ID is required"
        });
    }

    // Create an object to hold the updated fields
    const updatedFields = {};
    if (title) updatedFields.title = title;
    if (description) updatedFields.description = description;
    if (imageUrl) updatedFields.imageUrl = imageUrl;
    if (price) updatedFields.price = price;

    // Ensure at least one field is being updated
    if (Object.keys(updatedFields).length === 0) {
        return res.status(400).json({
            msg: "At least one field must be updated"
        });
    }

    try {
        // Update the course
        const update = await courseModel.updateOne(
            { _id: courseId, creatorId: adminId },  // Match by courseId and creatorId
            updatedFields  // Only update the fields provided
        );

        // Check if any course was updated
        if (update.matchedCount === 0) {
            return res.status(404).json({
                msg: "Course not found or you're not the creator"
            });
        }

        res.json({
            message: "Course updated successfully",
            courseId: courseId
        });
    } catch (error) {
        res.status(500).json({
            msg: "Failed to update the course",
            error: error.message
        });
    }
});

// Define the admin routes for getting all courses
adminRouter.get("course/bulk", adminMiddleware, async function (req, res) {
    const adminId = req.adminId;


    const courses = await courseModel.find({
        creatorId: adminId,
    });
    if(courses){
        res.status(200).json({
            message: "Your Courses is : ",
            courses
        });
    }
    else{
        res.status(403).json({
            msg : "You have not created any course yet"
        });
    }
});

// Export the adminRouter so that it can be used in other files
module.exports = {
    adminRouter: adminRouter,
};