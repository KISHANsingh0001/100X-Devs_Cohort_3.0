const axios = require("axios");

async function main(){
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts/1")
    // const json = await response.json();
    console.log(response.data.title);
    
}
main();

// sending the Post request using axios
// async function post() {
//     const response = await axios.post("https://jsonplaceholder.typicode.com/posts/1");
//     console.log(response.data.title)
// }
// post();
async function post() {
    const response = await axios.post("https://httpdump.app/dumps/cfc4dd99-64b1-4afc-9af0-225dafa7a16f" ,
       {
            username : "KishanSingh",
            Password : "1232133121"
       },
       {
        headers: {
            Authorization : "bearer 123",
        },
       },
    );
    console.log(response.data.title)
}
post();
