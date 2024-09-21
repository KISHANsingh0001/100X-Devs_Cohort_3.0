const express = require("express")
const app = express();

function sum( a , b){
    return  a+b;
}
// app.get("/sum" , function(req , res){
//     let a = Number(req.query.a);
//     let b = Number(req.query.b);
//     let ans = sum(a , b);
//     res.json({
//         ans,
//     })
    
// });
/**
 * create a route for the root URL
 * 
 * Query Parameters: It is a way to send data to the server as key-value pairs. It is appended to the URL after a question mark (?).
 * Example: http://localhost:3000/?n=5
 * Here n is the key and 5 is the value. n is query parameter and 5 is the value of n.
 * Use req.query to access the query parameters in the request object.
 * 
 * If you want to add multiple query parameters, you can separate them with an ampersand (&).
 * Example: http://localhost:3000/?a=5&b=10&c=15
 * Here a, b, and c are query parameters and 5, 10, and 15 are their respective values.
 */
app.get("/sum/:a/:b" , function(req , res){
    let a = Number(req.params.a);
    let b = Number(req.params.b);
    let ans = sum(a , b);
    res.json({
        ans,
    })
    
});
function multiplay( a , b){
    return  a*b;
}
app.get("/multiplay" , function(req , res){
    let a = req.query.a;
    let b = req.query.b;
    let ans = multiplay(a,b);
    res.json({
        ans,
    })
})


app.listen(3000);