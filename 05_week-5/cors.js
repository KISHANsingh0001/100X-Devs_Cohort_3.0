const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();


app.use(bodyParser.json()); // this is the external middleware 
app.use(cors());

app.post("/sum" , function(req , res){
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);
    // console.log(req.body);

    res.json({
        ans : a + b
    })
    
})
app.listen(3000)