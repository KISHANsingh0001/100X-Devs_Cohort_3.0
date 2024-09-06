const express = require("express");
 
const app = express();
app.use(express.json());

const user = [{
    cars : [{
        healthy : true,
        name : "BMW"
    }]
}]

//----------------------------------------------------------------------------------------
app.get("/" , function(req , res){
    const userInfo = user[0].cars;
    // console.log(userInfo);
    const numberOfcars = user[0].cars.length;
    let numberOfHealthyCars = 0;
    for(let i = 0 ; i<numberOfcars ; i++){
        if(user[0].cars[i].healthy){
            numberOfHealthyCars += 1;
        }
    }
    const numberOfUnheltyCars = numberOfcars - numberOfHealthyCars;
    // console.log(numberOfUnheltyCars);
    res.json({
        //userInfo
        numberOfcars,
        numberOfHealthyCars,
        numberOfUnheltyCars
    })
})

//----------------------------------------------------------------------------------------
app.post("/" , function(req , res){ // posting the cars with the status healthy or not and name Of car
    let isHealthyCar = req.body.isHealthyCar;
    let carName = req.body.carName;
    user[0].cars.push({
        healthy : isHealthyCar,
        name : carName
    })
    res.json({
        msg: "Done!"
    })
})
//----------------------------------------------------------------------------------------
function isHealthyCarCheaker(){
    for(let i = 0 ; i<user[0].cars.length ; i++){
       if(!user[0].cars[i].healthy){
         return false;
       }
    }
    return true;
 
 }
 app.put("/" , function(req , res){ // Makes all unhealthy cars healthy
    if(isHealthyCarCheaker()){
       res.status(411).json({
        msg: "No UnHealthy car is present!!!"
       })
    } else {
        for(let i = 0; i < user[0].cars.length; i++){
            user[0].cars[i].healthy = true;
        }
        res.json({
            msg: "Done!!"
        })
    }
});
//---------------------------------------------------------
function check(){
    let check = false;
    for(let i = 0 ; i<user[0].cars.length ; i++){
      if(!user[0].cars[i].healthy){
        check =  true;
      }
    }
    return check;
  }
app.delete("/" , function(req,res){// this Route Delete the all Unhealthy cars
  if(check()){
    // only if atleast one unhealthy kidney is there do this , else reuturn 411
    let newCars = [];
    for(let i = 0 ; i<user[0].cars.length ; i++){
        if(user[0].cars[i].healthy){
            newCars.push({
                healthy: true,
                name : user[0].cars[i].name
            })
        }
    }
    user[0].cars = newCars;
    res.json({
        msg:"Done! Deleting"
    })
  }
  else{
    res.status(411).json({
        msg : "No bed cars are present"
    })
  }
})
app.listen(3002);