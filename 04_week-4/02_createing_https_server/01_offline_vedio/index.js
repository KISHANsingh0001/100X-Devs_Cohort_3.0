const express = require("express")

const app = express();
app.use(express.json());

var users = [{
  name: "Kishan",
  kidneys: [{
    healthy: false,
  }]
}]
// console.log(users[0]);

app.get("/", function (req, res) {
  // write logic 
  const kishanKid = users[0].kidneys;
  console.log(kishanKid);
  const numberOfKid = kishanKid.length;
  let numberofHelthyKid = 0;
  for (let i = 0; i < numberOfKid; i++) {
    if (kishanKid[i].healthy) {
      numberofHelthyKid += 1;
    }
  }
  const numberOfUnheltyKid = numberOfKid - numberofHelthyKid;
  res.json({
    numberOfKid,
    numberofHelthyKid,
    numberOfUnheltyKid
  })
})
app.post("/", function (req, res) {
  const isHealthy = req.body.isHealthy;
  users[0].kidneys.push({
    healthy: isHealthy
  })
  res.json({
    msg: "Done!"
  })
})
// make all unHealthy kidneys to Healthy kidness 
function isHealthyKidCheker(){
   let flag = true;
   for(let i = 0 ; i<users[0].kidneys[i].length ; i++){
      if(users[0].kidneys[i].healthy === false){
        flag = false;
      }
   }
   return flag;

}
app.put("/" , function(req , res){
  if(isHealthyKidCheker()){
      res.status(411).json({
        msg : "We have no unHealthy kidneys are present to be Healthy"
      })
  }
  else{
    for(let i = 0 ;i<users[0].kidneys.length ; i++){
      users[0].kidneys[i].healthy = true;
    }
    res.json({});
  }
})

function check(){
  let check = false;
  for(let i = 0 ; i<users[0].kidneys.length ; i++){
    if(!users[0].kidneys[i].healthy){
      check =  true;
    }
  }
  return check;
}

app.delete("/" , function(req , res){
  if(check()){
    let newKidneys = [];
    // only if atleast one unhealthy kidney is there do this , else reuturn 411
    
    for(let i = 0 ; i<users[0].kidneys.length ; i++){
      if(users[0].kidneys[i].healthy){
         newKidneys.push({
          healthy:true
         })
      }
    }
    users[0].kidneys = newKidneys;
    res.json({});
  }
  else{
    res.status(411).json({
      msg : "No bed kidneys is present"
    })
  }
})
app.listen(3000);