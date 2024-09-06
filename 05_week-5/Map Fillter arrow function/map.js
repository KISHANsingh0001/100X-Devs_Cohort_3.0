// multiplay all value in the array by 2
let arr = [1,2,3,4,5];
// let newArr = [];
// for(let i = 0 ; i<arr.length ; i++){
//     newArr.push(arr[i]*2);
// }
// console.log(newArr);

function transform(i){
    return i*2;
}
let newArr = arr.map(transform);
console.log(newArr);

