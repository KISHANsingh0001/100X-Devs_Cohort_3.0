
function setTieOutPromisefied(duration) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, duration);
    })
}

let duration = 5000;

function callback() {
    console.log(duration + " miliSeconds is passed");

}
setTieOutPromisefied(duration).then(callback);