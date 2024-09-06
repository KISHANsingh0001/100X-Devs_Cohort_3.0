const express = require("express");
const app = express();

let requestCount = 0;
let errorCount = 0;
function countRequest(req ,res , next){
    requestCount++;
    next();
}

app.use(countRequest);
app.get("/user" ,function(req , res){
   res.status(200).json({
    name : 'johne',
   });
});

app.post("/user" ,function(req , res){
   res.status(200).json({
    msg : 'Created Dummy user',
   });
});

app.get("/requestCount" ,function(req , res){
   res.status(200).json({
    requestCount
   });
});

// err handling middleware
app.use(function(err , req , res ,next){
   res.status(400).json({
      msg : "Error"
   })
   errorCount++;
})
app.listen(3001);