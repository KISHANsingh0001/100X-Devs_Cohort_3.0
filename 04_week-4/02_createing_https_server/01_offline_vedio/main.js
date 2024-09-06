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