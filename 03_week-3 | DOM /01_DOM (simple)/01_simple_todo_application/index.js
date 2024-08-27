let cnt = 1;

function deleteTodo(index){
  const ele = document.getElementById("todo-" + index);
  ele.parentNode.removeChild(ele);
}
function addTodo(){ // adding the todo function
    const inputEl = document.querySelector("input");
    const value = inputEl.value;

    const newDiv = document.createElement("div");
    newDiv.setAttribute("id" , "todo-" + cnt); // seting the id of new div
    
    newDiv.innerHTML = "<div>"+ value +'</div><button onclick ="deleteTodo(' + cnt + ')">delete</button>';
    cnt++;
    document.querySelector("body").appendChild(newDiv);
}