// Async await syntax

// The async and await syntax in JavaScript provides a way to write asynchronous code that looks and behaves like synchronous code, making it easier to read and maintain. 

// It builds on top of Promises and allows you to avoid chaining .then() and .catch() methods while still working with asynchronous operations.

// async/await is essentially syntactic sugar on top of Promises. 

// Assignment
// Write code that
// logs hi after 1 second
// logs hello 3 seconds after step 1
// logs hello there 5 seconds after step 2

function setTimeoutPromisified(ms) {
    return new Promise(function(resolve){
        setTimeout(resolve , ms);
    });
  }
  
  async function solve() {
      await setTimeoutPromisified(1000);
      console.log("hi");
      await setTimeoutPromisified(3000);
      console.log("hello");
      await setTimeoutPromisified(5000);
      console.log("hi there");
  }
  
  solve();