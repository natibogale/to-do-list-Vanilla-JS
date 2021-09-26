const taskInput = document.querySelector(".tasks-input");
const taskButton = document.querySelector(".tasks-button");
const taskList = document.querySelector(".tasks-list");
const messageHolder = document.querySelector(".message-holder");
const filterOption = document.querySelector(".filter-tasks");

taskButton.addEventListener("click", addTask);
taskList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTask);
document.addEventListener('DOMContentLoaded', getLocalTasks);
function addTask(event) {
  event.preventDefault();
  if (taskInput.value != "") {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    const newTask = document.createElement("li");
    newTask.innerText = taskInput.value;
    newTask.classList.add("task-item");
    taskDiv.appendChild(newTask);

    saveToLocal(taskInput.value);

    const completedTaskBtn = document.createElement("button");
    completedTaskBtn.innerHTML = '<i class="fas fa-check"> </i>';
    completedTaskBtn.classList.add("completed-btn");
    taskDiv.appendChild(completedTaskBtn);

    const trashTaskBtn = document.createElement("button");
    trashTaskBtn.innerHTML = '<i class="fas fa-trash"> </i>';
    trashTaskBtn.classList.add("trash-btn");
    taskDiv.appendChild(trashTaskBtn);

    taskList.appendChild(taskDiv);

    const msg = document.querySelector(".message-text");
    try {
      msg.remove();
    } catch (TypeError) {}
  } else {
    const ifThereIsMessage = document.querySelector(".message-text");
    //console.log(ifThereIsMessage);
    if (ifThereIsMessage == null) {
      const messageText = document.createElement("p");
      messageText.classList.add("message-text");
      messageText.innerText = "*Please enter some task first*";
      messageHolder.appendChild(messageText);
    } else {
      taskInput.value = "";
    }
  }
  taskInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  //console.log(e.target);
  if (item.classList == "trash-btn") {
    const task = item.parentElement;
    task.classList.add("fall");
    //task.remove();
    removeFromLocal(task);
    task.addEventListener("transitionend", function () {
      task.remove();
    });
  }
  if (item.classList == "completed-btn") {
    const task = item.parentElement;
    task.classList.toggle("completed");
  }
}

function filterTask(e) {
  const tasks = taskList.childNodes;
  console.log(tasks);
  tasks.forEach(function (task) {
    switch (e.target.value) {
      case "all":
        task.style.display = "flex";
        break;
      case "completed":
        if (task.classList.contains("completed")) {
          task.style.display = "flex";
        } else {
          task.style.display = "none";
        }
        break;

      case "uncompleted":
        if(!task.classList.contains("completed"))
        {
          task.style.display = "flex";
        }
        else{
          task.style.display = "none";
        }
        break;
    }
  });
}


function saveToLocal(task){


let tasks;
if (localStorage.getItem("tasks") == null)
{
  tasks = [];
}
else{
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

tasks.push(task);
localStorage.setItem("tasks", JSON.stringify(tasks));
}



function getLocalTasks(task){


  let tasks;
  if (localStorage.getItem("tasks") == null)
  {
    tasks = [];
  }
  else{
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  
  tasks.forEach(function(task){

    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    const newTask = document.createElement("li");
    newTask.innerText = task;
    newTask.classList.add("task-item");
    taskDiv.appendChild(newTask);

    const completedTaskBtn = document.createElement("button");
    completedTaskBtn.innerHTML = '<i class="fas fa-check"> </i>';
    completedTaskBtn.classList.add("completed-btn");
    taskDiv.appendChild(completedTaskBtn);

    const trashTaskBtn = document.createElement("button");
    trashTaskBtn.innerHTML = '<i class="fas fa-trash"> </i>';
    trashTaskBtn.classList.add("trash-btn");
    taskDiv.appendChild(trashTaskBtn);

    taskList.appendChild(taskDiv);

  })

  }

  function removeFromLocal(task){

    let tasks;
if (localStorage.getItem("tasks") == null)
{
  tasks = [];
}
else{
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

// console.log(task.innerText);
// console.log(tasks.indexOf('254'));
tasks.splice(tasks.indexOf(task.innerText),1);
localStorage.setItem("tasks", JSON.stringify(tasks));
  }