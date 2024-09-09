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
        username : username,
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
app.get("/me" , function(req , res){
   // Retrieve the token from the Authorization header
   const token = req.headers.authorization;

   if(!token){
     res.json({
        msg : "User details are not found"
     })
   }
  
     // Verify the token using the jwt.verify() function
     const userDetails = jwt.verify(token, JWT_SECRATE);
     
     let foundUser = null;
     for(let i = 0 ; i<users.length ; i++){
        if(users[i].username === userDetails.username){
            foundUser = users[i];
        }
     }
     if(foundUser){
        res.status(200).json({
            username: foundUser.username,
            password: foundUser.password
        })
     }
     else{
        res.status(400).json({
            msg: "User not found"
        })
     }
  
});

app.listen(3000);