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
    dataBaseLocal = getValueOfLocalStorage;
    dataBaseLocal.forEach((todos) => {
        if (todos.id === todoId) {
            todos.status = !todos.status;
        }
    });
    setDataToLocalStorage(dataBaseLocal);
    addNewBoxForTodo(dataBaseLocal);
    if (ulBoxAddNewTodo.childNodes.length <= 0) {
        textAddTodo.innerHTML = "No todo has add";
    }else {
        textAddTodo.innerHTML = "The tasks you added";
    }
};

// todo Delet
function btnDelet (todoId) {
    let getValueOfLocalStorage = JSON.parse(localStorage.getItem("todos"));
    dataBaseLocal = getValueOfLocalStorage;
    let checkOfIdTodo = dataBaseLocal.findIndex((todos) => {
        return todos.id === todoId;
    });
    dataBaseLocal.splice(checkOfIdTodo , 1);
    setDataToLocalStorage(dataBaseLocal);
    addNewBoxForTodo(dataBaseLocal);
    if (ulBoxDownItem.childNodes.length <= 0) {
        textTodoDown.innerHTML = "No work has been completed yet";
    }else {
        textTodoDown.innerHTML = "The tasks you completed";
    }
};

// todo تابع ساخت باکس
function addNewBoxForTodo (todoList) {
    let liElem , spanElem , boxIconElem , iconElemDelet;
    ulBoxAddNewTodo.innerHTML = "";
    ulBoxDownItem.innerHTML = "";
        
    todoList.forEach((todo) => {

        liElem = $.createElement ("li");
        spanElem = $.createElement ("span");
        boxIconElem = $.createElement ("div");
        iconElemDelet = $.createElement ("i");
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
            textTodoDown.innerHTML = "The tasks you completed";
        }else {
            liElem.append (spanElem , boxIconElem);
            ulBoxAddNewTodo.append (liElem);
            textAddTodo.innerHTML = "The tasks you added";
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