const { z } = require("zod");

// Define the password schema
const passwordSchema = z
    .string().min(8, "Password must be at least 8 characters long") // Add length constraint if needed

    .refine(function (password) {return /[A-Z]/.test(password);},{message: "Password must have at least one uppercase letter"})

    .refine(function (password) {return /[a-z]/.test(password);},{message: "Password must have at least one lowercase letter",})

    .refine(function (password) {return /\d/.test(password);},{message: "Password must have at least one number",})

    .refine(function (password) {return /[!@#$%^&*(),.?":{}|<>]/.test(password);}, {message: "Password must have at least one special character",});

// Example usage
const result = passwordSchema.safeParse("Password123");
if (!result.success) {
    console.log(result.error.message); // Logs all validation errors
} else {
    console.log("Password is valid");
}