const toDoInput = document.querySelector("#work");
const btnAdd = document.querySelector("#todobtn");
const ulTodo = document.querySelector(".list").querySelector("ul");
const filterOption = document.querySelector(".myselect")



// add events
btnAdd.addEventListener("click",addTodo);
window.addEventListener("keydown",keyHandler);
ulTodo.addEventListener("click", trashCheckTodo);
filterOption.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos);



function addTodo(){
    if(toDoInput.value === ""){
        alert("Enter Text");
    } else {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("divtodo");
    const li = document.createElement("li");
    li.innerText= toDoInput.value ;
    li.classList.add("li-todo");
    todoDiv.appendChild(li);
    const check = document.createElement("i");
    const trash = document.createElement("i");
    check.classList.add("fas");
    check.classList.add("fa-check");
    check.classList.add("checked");
    todoDiv.appendChild(check);
    trash.classList.add("fas");
    trash.classList.add("fa-trash");
    trash.classList.add("delete");
    todoDiv.appendChild(trash);
    ulTodo.appendChild(todoDiv);
    saveLocalTodo(toDoInput.value);
    toDoInput.value="";
    }
};

function keyHandler(event){
    if(event.key === "Enter"){
        addTodo();
    }
}

// btn trash & check
function trashCheckTodo(event){
    // console.log(event.target.className);
    const item = event.target;
    if(item.className ===  "fas fa-check checked"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        todo.childNodes[0].classList.toggle("tick");
    } else if(item.className === "fas fa-trash delete"){
        const todo = item.parentElement;
        removeLocalTodo(todo);
        todo.remove();
    }
};


// filter completed & uncompleted & all
function filterTodo(event){
    const todos = ulTodo.childNodes;
    const target = event.target.value;
    todos.forEach(item => {
        switch(target){
            case "all":
                item.style.display = "flex";
                break;
            case "completed":
                if(item.classList.contains("completed")){
                    item.style.display = "flex";
                } else {
                    item.style.display = "none";
                };
                break;
            case "uncompleted":
                if(item.classList.contains("completed")){
                    item.style.display = "none";
                } else {
                    item.style.display = "flex";
                };
                break;
        };
    });
    
};



// save and remove local storage
function saveLocalTodo (todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    };
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
};

function removeLocalTodo(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    };
    const todoIndex = todo.innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));
};


// set todo at local storage
function getTodos(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    };
    todos.forEach(item=>{
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("divtodo");
    const li = document.createElement("li");
    li.innerText= item ;
    li.classList.add("li-todo");
    todoDiv.appendChild(li);
    const check = document.createElement("i");
    const trash = document.createElement("i");
    check.classList.add("fas");
    check.classList.add("fa-check");
    check.classList.add("checked");
    todoDiv.appendChild(check);
    trash.classList.add("fas");
    trash.classList.add("fa-trash");
    trash.classList.add("delete");
    todoDiv.appendChild(trash);
    ulTodo.appendChild(todoDiv);
    })
}
