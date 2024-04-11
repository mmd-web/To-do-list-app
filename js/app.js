let $ = document;

let inputAddTodo = $.getElementById ("name_todo");
let ulBoxAddNewTodo = $.getElementById ("item_addtodo");
let ulBoxDownItem = $.getElementById ("item_down");


function addNewTodo (saveValueInp) {

    let liItem = $.createElement ("li");
    let spanItem = $.createElement ("span");
    let boxIcon = $.createElement ("div");
    let iconItemDelet = $.createElement ("i");
        iconItemDelet.className = "gg-close-r";
    let iconItemDown = $.createElement ("i");
        iconItemDown.className = "gg-check-r";

    boxIcon.id = "svg_box";
    boxIcon.className = "flex_row";
    boxIcon.append (iconItemDown , iconItemDelet);
    // console.log(boxIcon);
    spanItem.innerHTML = saveValueInp;

    liItem.append (spanItem , boxIcon);
    ulBoxAddNewTodo.append (liItem);

iconItemDelet.addEventListener ("click" , () => {
    iconItemDelet.parentElement.parentElement.remove();
});

iconItemDown.addEventListener ("click" , () => {
    let saveDownTodo = iconItemDown.parentElement.parentElement;
    let saveItem = ulBoxDownItem.appendChild (saveDownTodo);
    saveItem.lastChild.remove();
});

}



inputAddTodo.addEventListener ("keydown" , (event) => {
    let saveValueInp = inputAddTodo.value;

    if (event.key === "Enter") {
        // console.log("hello world");
        if (inputAddTodo.value) {
            // alert ("true");
            inputAddTodo.value = '';
            addNewTodo(saveValueInp);
        }else {
            // alert ("false")
        }
    }

})