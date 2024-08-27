const fs = require('fs');

function writeFilePromised(filePath, data) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(filePath, data, 'utf-8', function (err) {
            if (err) {
                reject("Error occurred: " + err.message);
            } else {
                resolve("File written successfully");
            }
        });
    });
}

function onDone(message) {
    console.log(message);
}

function onError(err) {
    console.log("Error is present: " + err);
}

// Example usage:
writeFilePromised("output.txt", "Hello, World! vallla")
    .then(onDone)
    .catch(onError);
