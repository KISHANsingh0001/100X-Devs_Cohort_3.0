// I/O heavy operations
// I/O (Input/Output) heavy operations refer to tasks in a computer 
// program that involve a lot of data transfer between the program and external systems or 
// devices. These operations usually require waiting for data to be read from or written to 
// sources like disks, networks, databases, or other external devices, which can be time-consuming 
// compared to in-memory computations.

// Examples of I/O Heavy Operations:
// Reading a file
// Starting a clock
// HTTP Requests

// We’re going to introduce imports/requires next. 
// A require statement lets you import code/functions export from another file/module.

const fs = require("fs");

const contents = fs.readFileSync("a.txt", "utf-8");
console.log(contents);


const fs = require("fs");

const contents1 = fs.readFileSync("a.txt", "utf-8");
console.log(contents1);

const contents2 = fs.readFileSync("b.txt", "utf-8");
console.log(contents2);