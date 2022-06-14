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

// Test Data
let todolist2 = [];
let todolist1 = [];

// function: inner HTML for table
function listFill(array, element) {
  let result = "";
  array.forEach((item, i) => {
    result += `
      <tr>
          <th onclick='selectItem(${i})' class="${
      item.select === true ? "selected" : ""
    }">${item.text}</th>
      </tr>
      `;
  });
  userInput.value = "";
  element.innerHTML = result;
}

// function: updateUI()
function updateUI() {
  listFill(todolist1, list1);
  if (todolist1.length === 0)
    return (list1.innerHTML = "<h3>There is no item in the list!</h3>");
}

function addToDo(e) {
  e.preventDefault();
  let userInputVal = userInput.value;
  if (!userInputVal)
    return (
      (blankError.innerHTML = "Please Enter Your To Do Task!"),
      setTimeout(() => blankError.remove(), 3000)
    );
  const task = {
    text: userInputVal,
    select: false,
  };
  todolist1.push(task);
  updateUI();
}

function selectItem(i) {
  todolist1[i].select = !todolist1[i].select;
  updateUI();
}

function oneRight() {
  todolist1.forEach(function (item, index) {
    if (item.select) {
      todolist2 = todolist1.filter((item) => item.select);
      // delete from list1
    }
  });

  listFill(todolist2, list2);
  updateUI();
}

function oneLeft() {
  todolist2.forEach(function (item, index) {
    if (item.select) {
      todolist1 = todolist2.filter((item) => item.select);
      // delete from list2
    }
  });

  listFill(todolist1, list1);
  updateUI();
}

function allRight() {
  todolist1.forEach(function (item, index) {
    todolist2 = todolist1.filter((item) => item);
    // delete from list1
  });

  listFill(todolist2, list2);
  updateUI();
}

function allLeft() {
  todolist2.forEach(function (item, index) {
    todolist1 = todolist2.filter((item) => item);
    // delete from list2
  });

  listFill(todolist1, list1);
  updateUI();
}

function remove() {
  todolist1.forEach(function (item) {
    if (item.select) {
      todolist1.splice(item, 1);
    }
  });

  updateUI();
}

function arrayRemove(arr, value) {
  return arr.filter(function (ele) {
    return ele != value;
  });
}
// --------------------------- EVENTS --------------------------- //
// button events
addButton.onclick = addToDo;
allRightBtn.onclick = allRight;
oneRightBtn.onclick = oneRight;
deleteBtn.onclick = remove;
allLeftBtn.onclick = allLeft;
oneLeftBtn.onclick = oneLeft;

// add on enter key event
userInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") addToDo;
});

updateUI();
