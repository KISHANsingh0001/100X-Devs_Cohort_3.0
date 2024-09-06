// Find the even number in the given arr

let arr = [1,2,3,4,5,6];
// let newArr = [];
// for(let i = 0 ; i<arr.length ; i++){
//     if(arr[i] % 2 == 0){
//         newArr.push(arr[i]);
//     }
// }
// console.log(newArr);
function isEven(i){
    if(i % 2 == 0){
        return true;
    }
    else{
        return false;
    }
}
let newArr = arr.filter(isEven);
console.log(newArr);

