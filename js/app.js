let $ = document;

let inputAddTodo = $.getElementById ("name_todo");
let ulBoxAddNewTodo = $.getElementById ("item_addtodo");
let ulBoxDownItem = $.getElementById ("item_down");
let textAddTodo = $.getElementById ("text_add_todo");
let textTodoDown = $.getElementById ("text_todo_down");

let dataBaseLocal = [];

// todo تابع اضافه کردن تودو جدید
function addNewTodo () {
    let saveValueInput = inputAddTodo.value;
    
    let newObjItem = {
        id : dataBaseLocal.length+1,
        content : saveValueInput,
        status : false
    }
    
    dataBaseLocal.push(newObjItem);
    setDataToLocalStorage(dataBaseLocal);
    addNewBoxForTodo(dataBaseLocal);
}

// todo تابع ست کردن اطلاعات روی لوکال استورج
function setDataToLocalStorage (todos) {
    localStorage.setItem("todos" , JSON.stringify(todos));
};

// todo تابع ساخت باکس
function addNewBoxForTodo (todoList) {
    
};

inputAddTodo.addEventListener ("keyup" , (event) => {
    if (event.key === "Enter") {
        addNewTodo();
    };
});