
// function main(){
//     fetch("https://jsonplaceholder.typicode.com/posts/1")
//     .then(async response =>{
//         const json = await response.json();
//         console.log(json.title);
        
//     })
// }
// Sending the get request using fetch
async function get(){
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1")
    const json = await response.json();
    console.log(json.title);
    
}
get();
// sending the Post request using fetch
async function post() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1" , {
        method:"POST"
    })
}
post();