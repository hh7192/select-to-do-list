const list1 = document.querySelector("#todo-list1");
const list2 = document.querySelector("#todo-list2");
const userInput = document.querySelector("#todo-item");
const addButton = document.querySelector("#add-button");
const blankError = document.querySelector("#error");
const allRightBtn = document.querySelector("#allRightBtn");
const oneRightBtn = document.querySelector("#oneRightBtn");
const deleteBtn = document.querySelector("#deleteBtn");
const allLeftBtn = document.querySelector("#allLeftBtn");
const oneLeftBtn = document.querySelector("#oneLeftBtn");

let todolist = [
  {
    taskLeft: "walk the dog",
    taskRight: "",
    select: false,
  },
  {
    taskLeft: "",
    taskRight: "wash the car",
    select: false,
  },
];

// function: inner HTML for table
function listFill(array) {
  let result1 = "";
  let result2 = "";
  array.forEach((item, i) => {
    if (item.taskLeft !== "") {
      result1 += `
            <tr>
                <th onclick='selectItem(${i})' class="${
        item.select === true ? "selected" : ""
      }">${item.taskLeft}</th>
            </tr>
            `;
    }
  });
  userInput.value = "";
  list1.innerHTML = result1;
  array.forEach((item, i) => {
    if (item.taskRight !== "") {
      result2 += `
            <tr>
                <th onclick='selectItem(${i})' class="${
        item.select === true ? "selected" : ""
      }">${item.taskRight}</th>
            </tr>
            `;
    }
  });
  userInput.value = "";
  list2.innerHTML = result2;
}

// function: updateUI()
function updateUI() {
  listFill(todolist);
  if (todolist.length === 0) {
    list1.innerHTML = "<h3>There is no item in the list!</h3>";
    list2.innerHTML = "<h3>There is no item in the list!</h3>";
  }
}

// function: select items for color change
function selectItem(i) {
  todolist[i].select = !todolist[i].select;
  updateUI();
}

// add items to left list
function addToDo(e) {
  e.preventDefault();
  let userInputVal = userInput.value;
  if (!userInputVal)
    return (
      (blankError.innerHTML = "Please Enter Your To Do Task!"),
      setTimeout(() => blankError.remove(), 3000)
    );
  const task = {
    taskLeft: userInputVal,
    taskRight: "",
    select: false,
  };
  todolist.push(task);
  updateUI();
}

// function: selected items to right
function moveSelectedRight() {
  todolist.forEach((item) => {
    if (item.select) {
      item.taskRight = item.taskLeft;
      item.taskLeft = "";
      item.select = false;
    }
  });
  updateUI();
}

// function: selected items to left
function moveSelectedLeft() {
  todolist.forEach((item) => {
    if (item.select) {
      item.taskLeft = item.taskRight;
      item.taskRight = "";
      item.select = false;
    }
  });
  updateUI();
}

// function: selected items to right
function moveAllRight() {
  todolist.forEach((item) => {
    item.taskRight = item.taskLeft;
    item.taskLeft = "";
    item.select = false;
  });
  updateUI();
}

// function: selected items to left
function moveAllLeft() {
  todolist.forEach((item) => {
    item.taskLeft = item.taskRight;
    item.taskRight = "";
    item.select = false;
  });
  updateUI();
}

// function: remove selected items on both sides
function removeSelected() {
  todolist.forEach((item) => {
    if (item.select) {
      item.taskLeft = "";
      item.taskRight = "";
      item.select = false;
    }
  });
  updateUI();
}

// --------------------------- EVENTS --------------------------- //
// button events
addButton.onclick = addToDo;
allRightBtn.onclick = moveAllRight;
oneRightBtn.onclick = moveSelectedRight;
deleteBtn.onclick = removeSelected;
allLeftBtn.onclick = moveAllLeft;
oneLeftBtn.onclick = moveSelectedLeft;

// add on enter key event
userInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") addToDo;
});

updateUI();
