//Create a middleware function that logs each incoming request’s HTTP method, URL, and timestamp to the console
const { log } = require("console");
const express = require("express");

const app = express();

function middleware(req , res ,next){
    console.log("Method is " + req.method);
    console.log("Host is " + req.hostname);
    console.log("Route is " + req.url);
    console.log(new Date);
    next();
}
app.use(middleware);
app.get("/" , function(req , res){
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans : a + b,
    })
})
app.listen(3000);