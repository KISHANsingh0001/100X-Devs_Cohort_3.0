// Q: Write code that
// logs hi after 1 second
// logs hello 3 seconds after step 1
// logs hello there 5 seconds after step 2

// Solution (has callback hell)

// Callback hell refers to a situation in JavaScript programming where multiple nested callbacks (functions passed as arguments to other functions) create code that is difficult to read, maintain, and debug. 

setTimeout(function(){
    console.log("hii");
     setTimeout(function(){
       console.log("hello");
        setTimeout(function(){
            console.log("hello there");
        },5000)
     },3000)
} , 1000)

// promisified solution  
function setTieOutPromisefied(duration){
    return new Promise(function(resolve){
        setTimeout(resolve , duration);
    })
}


setTimeoutPromisified(1000)
  .then(function () {
    console.log("hi");
    return setTimeoutPromisified(3000);
  })
  .then(function () {
    console.log("hello");
    return setTimeoutPromisified(5000);
  })
  .then(function () {
    console.log("hello there");
  });