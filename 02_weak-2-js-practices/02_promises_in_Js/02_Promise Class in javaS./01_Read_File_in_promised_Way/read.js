const fs = require('fs');

function readFilePromised(filePath) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filePath, 'utf-8', function (err, data) {
            if (err) {
                reject("Error occurred: " + err.message);
            } else {
                resolve(data);
            }
        });
    });
}

function onDone(data) {
    console.log(data);
}

function onError(err) {
    console.log("Error is present: " + err);
}

readFilePromised("a.txt").then(onDone).catch(onError);
