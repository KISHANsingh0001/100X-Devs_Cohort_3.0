// promise class gives u a promise , that i will return u something in the future

// defining a promise is hard using a promise is easy
   
// function setTimeoutPromisified(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
//   }
  
//   function callback() {
//       console.log("3 seconds have passed");
//   }
  
//   setTimeoutPromisified(3000).then(callback)
  

// function waitFor3s(resolve){
//     console.log("Control reaches waitFor3s fun");
//     setTimeout(resolve , 3000);
// }
// function setTimeoutPromisified() {
//         console.log("Control reaches setTimeoutPromisified function");
//         return new Promise(waitFor3s);
//       }
// function main(){
//     console.log("main is called");
    
// }
// setTimeoutPromisified().then(main);
 
// function random(resolve){
//    console.log("control reaches in the random function");
//    resolve();
// }
// let p = new Promise(random);

// function callback(){
//      console.log("control reaches in the callback function");
//      console.log("Promise succeded");
// }
// p.then(callback);
const fs = require('fs');

// function readFilePromised(filePath) {
//     return new Promise(function (resolve, reject) {
//         fs.readFile(filePath, 'utf-8', function (err, data) {
//             if (err) {
//                 reject("Error occurred: " + err.message);
//             } else {
//                 resolve(data);
//             }
//         });
//     });
// }

// function onDone(data) {
//     console.log(data);
// }

// function onError(err) {
//     console.log("Error is present: " + err);
// }

// readFilePromised("a.txt").then(onDone).catch(onError);







