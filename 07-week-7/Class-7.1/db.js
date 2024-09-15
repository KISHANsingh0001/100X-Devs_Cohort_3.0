// Import mongoose to interact with MongoDB
const mongoose = require("mongoose");

/*
const User = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
});
*/

// Use Schema and ObjectId from mongoose for creating models
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

// Define the User schema with fields for email, password, and name
const User = new Schema({
    email: { type: String, unique: true }, // Make email unique to avoid duplicate entries
    password: String,
    name: String,
});

// Define the Todo schema with fields for title, done, and userId
const Todo = new Schema({
    title: String,
    done: Boolean,
    userId: ObjectId,
});

// Create Mongoose models for users and todos collections using the User and Todo schemas

// The first argument "users" is the name of the collection in the MongoDB database that the model will be linked to.
const UserModel = mongoose.model("users", User);
// The second argument, User, is a schema that defines the structure of the documents in the users collection.
const TodoModel = mongoose.model("todos", Todo);

// Export the User and Todo models for use in other files
module.exports = {
    UserModel,
    TodoModel,
};

// mongoose.connect("mongodb+srv://kishansinghthakur27:GuQ4OM7AiKlAO5I8@cluster0.k0ymi.mongodb.net/todo-app-database");