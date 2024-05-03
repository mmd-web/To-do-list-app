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

// todo Down
function btnDown (todoId) {
    let getValueOfLocalStorage = JSON.parse(localStorage.getItem("todos"));
    todoList = getValueOfLocalStorage;
    todoList.forEach((todos) => {
        if (todos.id === todoId) {
            todos.status = !todos.status;
        }
    });
    // todoList.forEach((todos) => {
    //     if (todos.id === todoId && todos.status) {
            
    //     }
    // })
    setDataToLocalStorage(todoList);
    addNewBoxForTodo(todoList);
};

// todo Delet
function btnDelet (todoId) {
    let getValueOfLocalStorage = JSON.parse(localStorage.getItem("todos"));
    todoList = getValueOfLocalStorage;
    let checkOfIdTodo = todoList.findIndex((todos) => {
        return todos.id === todoId;
    });
    todoList.splice(checkOfIdTodo , 1);
    setDataToLocalStorage(todoList);
    addNewBoxForTodo(todoList);
};

// todo تابع ساخت باکس
function addNewBoxForTodo (todoList) {
    let getValueOfLocalStorage = JSON.parse(localStorage.getItem("todos"));
        todoList = getValueOfLocalStorage;

    ulBoxAddNewTodo.innerHTML = "";
    ulBoxDownItem.innerHTML = "";
        
    todoList.forEach((todo) => {

        let liElem = $.createElement ("li");
        let spanElem = $.createElement ("span");
        let boxIconElem = $.createElement ("div");
        let iconElemDelet = $.createElement ("i");
            iconElemDelet.className = "gg-close-r";
            iconElemDelet.addEventListener ("click" , () => {
                btnDelet(todo.id);
            });
        let iconElemDown = $.createElement ("i");
            iconElemDown.className = "gg-check-r";
            iconElemDown.addEventListener ("click" , () => {
                btnDown(todo.id);
            });
    
        boxIconElem.id = "svg_box";
        boxIconElem.className = "flex_row";
        boxIconElem.append (iconElemDown , iconElemDelet);
        // console.log(boxIcon);
        spanElem.innerHTML = todo.content;

        if (todo.status) {
            iconElemDown.remove();
            liElem.append (spanElem , boxIconElem);
            ulBoxDownItem.append (liElem);
        }else {
            liElem.append (spanElem , boxIconElem);
            ulBoxAddNewTodo.append (liElem);
        }
    });

    inputAddTodo.value = "";
};

// todo تابع ای که فقط زمان لود اجرا میشه و برای ما اطلاعات لوکال رو میگیره و آرایمون رو آپدیت میکنه و به ازای هر آیتم باکس میسازه
function getDataOfLocalStorage () {
    let getValueOfLocalStorage = JSON.parse(localStorage.getItem("todos"));
    if (getValueOfLocalStorage) {
        dataBaseLocal = getValueOfLocalStorage;
        addNewBoxForTodo(dataBaseLocal);
    }else {
        dataBaseLocal = [];
    }
};

window.addEventListener ("load" , getDataOfLocalStorage);


inputAddTodo.addEventListener ("keyup" , (event) => {
    if (event.key === "Enter") {
        addNewTodo();
    };
});