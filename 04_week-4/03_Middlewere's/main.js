const express = require('express');

const app = express();

// funtion that reutn a bool if the age of the person is more than 14
// function isOldEnough(age){
//     if(age>=14){
//         return true;
//     }
//     else{
//         return false;
//     }
// }

function isOldEnoughMiddleware(req , res , next){
    const age = Number(req.query.age);
    if(age>=14){ 
        next();
    }
    else{
        res.status(411).json({
            msg:"Sorry you are not of age yet",
        })
    }
}
 app.use(isOldEnoughMiddleware); // we can also do this (orders matters here) middlewear must be above 
                                // to the routes 

app.get("/ride1" , function(req , res){
        res.json({
            msg : "you have successfully riden the ride 1"
        })
})

app.get("/ride2" , function(req , res){
        res.json({
            msg : "you have successfully riden the ride 2"
        })
})
app.listen(3000);