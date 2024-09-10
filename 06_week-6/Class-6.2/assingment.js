// Can you try creating a middleware called auth that verifies if a user is logged in and ends the request early if the user isn’t logged in?


// Import the express library
const express = require("express");

// Import the jsonwebtoken library
const jwt = require("jsonwebtoken");

// Create a secret key for the jwt token
const JWT_SECRATE = "Geforce12gt";

// Create an instance of express application
const app = express();

// Use the express.json() middleware to parse the request body
app.use(express.json());

// Create an array to store the users username and password
let users = [];

app.get("/" , function(req, res){
    res.sendFile(__dirname + "/public/index.html");
})

// Create a post request for the signup route
app.post("/signup" , function(req , res){
     // Get the username and password from the request body
    const username = req.body.username;
    const password = req.body.password;
    
     // Check if the user is already signed up or not
    let isPresent = false;
    for(let i = 0 ; i<users.length ; i++){
        if(users[i].username === username){
            isPresent = true;
            break;
        }
    }
    if(isPresent){
        return res.status(400).json({
            msg: "You are already signed up!"
        });
    }

    users.push({
        username : username,
        password : password,
    });

    res.status(201).json({
        msg : "You have sucsessfuly SignUp"
    })

})
app.post("/signin" , function(req , res){
    
    const username = req.body.username;
    const password = req.body.password;
    // Find the user with matching username and password
    
    let foundUser = null;
    for(let i = 0 ; i<users.length ; i++){
        if(users[i].username === username && users[i].password === password){
            foundUser = users[i];
        }
    }
    if(foundUser){
        const payload ={
            username : foundUser.username,
        }
        // Create a token using the jwt.sign() function
        const token = jwt.sign(payload , JWT_SECRATE);
        res.status(200).json({
            message: "You have signed in successfully!",
            token: token
        });
    }
    else{
        // Respond with an error User not found
        res.status(401).json({
            message: "Invalid username or password!"
        });
    }
    
})
// this part is the assingment part
//--------------------------------------------------------------------------------------------
function auth(req , res , next){
    const token = req.headers.token;
    const userDetails = jwt.verify(token , JWT_SECRATE);

    if(userDetails.username){
        req.username = userDetails.username;
        next();
    }
    else{
        res.json({
            msg : "You are not logged in"
        })
    }

}
//-----------------------------------------------------------------------------------------------
app.get("/me" , auth ,  function(req , res){
   
    const username = req.username;
    let foundUser = null;

    // Loop through the users array to find the user
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            foundUser = users[i];
            break;
        }
    }

    // Check if the user was found
    if (!foundUser) {
        return res.status(404).json({ msg: "User not found" });
    }

    // Send the user's username and password if found
    res.status(200).json({
        username: foundUser.username,
        password: foundUser.password
    });
     
});

app.listen(3000);