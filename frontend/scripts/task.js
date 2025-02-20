const urlParams = new URLSearchParams(window.location.search);
const taskId = urlParams.get("id");

var projectId;
const title = document.getElementById("task-title");
title.innerText = `Tarea ${taskId}`;

const taskName = document.getElementById("task-name");
const taskPriority = document.getElementById("task-priority");
const taskAssigne = document.getElementById("task-users");
const taskDescription = document.getElementById("task-description");
const taskProgress = document.getElementById("task-progress");
const taskProgressTitle = document.getElementById("task-progress-title");
const taskStartDate = document.getElementById("task-startDate");
const taskEndDate = document.getElementById("task-endDate");

const editButton = document.getElementById("edit-button");
const deleteButton = document.getElementById("delete-button");

fetch(`http://localhost:3000/api/v1/tasks/${taskId}`)
.then(response => response.json())
.then(task => {
  taskName.innerText = task.name; 
  taskDescription.innerText = task.description;
  projectId = task.project_id;
  taskStartDate.innerText = new Intl.DateTimeFormat("es-AR", { dateStyle: "full" }).format(new Date(task.startDate));;
  taskEndDate.innerText = new Intl.DateTimeFormat("es-AR", { dateStyle: "full" }).format(new Date(task.endDate));

  //priority
  let taskPriorityColor;
  let taskPriorityText;
  switch (task.priority) {
    case "LOW":
      taskPriorityText = "BAJA";
      taskPriorityColor = "is-info";
      break;
    case "MEDIUM":
      taskPriorityText = "MEDIA";
      taskPriorityColor = "is-warning";
      break;
    case "HIGH":
      taskPriorityText = "ALTA";
      taskPriorityColor = "is-danger is-light";
      break;
    case "HIGHEST":
      taskPriorityText = "URGENTE";
      taskPriorityColor = "is-danger";
      break;
    default:
      taskPriorityText = "NINGUNA";
      taskPriorityColor = "is-link is-light";
      break;
  }
  taskPriority.innerHTML = `<div class="notification has-text-centered ${taskPriorityColor} p-1"><stong>${taskPriorityText}</strong></div>`;

  //assigne
  taskAssigne.innerText = task.assigne;

  //progress
  taskProgressTitle.innerText = `Progreso ${task.progress}%`;

  let taskProgressColor = "";
  if (task.progress < 15) {
    taskProgressColor = "is-info";
  } else if (task.progress < 45) {
    taskProgressColor = "is-success";
  } else if (task.progress < 69) {
    taskProgressColor = "is-warning";
  } else if (task.progress < 99) {
    taskProgressColor = "is-link";
  } else {
    taskProgressColor = "is-primary";
  }
  taskProgress.innerHTML = `<div class="block"><progress class="progress ${taskProgressColor}" value="${task.progress}" max="100"></progress></div>`;

  // Edit button
  let editIconSpan = document.createElement("span");
  let editIcon = document.createElement("i");

  editButton.href = `editTask?id=${taskId}`;
  editButton.classList.add("button", "is-info", "is-outlined", "is-fullwidth");
  editIconSpan.classList.add("icon");
  editIcon.classList.add("fas", "fa-edit");

  editIconSpan.appendChild(editIcon);
  editButton.appendChild(editIconSpan);
  
  // Delete
  let deleteIconSpan = document.createElement("span");
  let deleteIcon = document.createElement("i");

  deleteButton.addEventListener("click", () => {
    openModal(taskId);
  });

  deleteButton.classList.add("button", "is-danger", "is-outlined", "delete-button", "is-fullwidth");
  deleteIconSpan.classList.add("icon");
  deleteIcon.classList.add("fas", "fa-trash");

  deleteIconSpan.appendChild(deleteIcon);
  deleteButton.appendChild(deleteIconSpan);
});

const modal = document.getElementById("delete-modal");
const modalBackground = document.getElementById("delete-modal-background");
const modalCancelButton = document.getElementById("delete-modal-cancel");
const buttonInModal = document.getElementById("delete-modal-button");

modalBackground.addEventListener("click", () => {
  buttonInModal.id = "delete-modal-button";
  buttonInModal.removeEventListener("click", deleteTask);
  modal.classList.remove("is-active");
});

modalCancelButton.addEventListener("click", () => {
  buttonInModal.id = "delete-modal-button";
  buttonInModal.removeEventListener("click", deleteTask);
  modal.classList.remove("is-active");
});

function openModal(id) {
  modal.classList.add("is-active");
  buttonInModal.id = id;
  buttonInModal.addEventListener("click", deleteTask);
}

function deleteTask() {
  id = buttonInModal.id;
  fetch(`http://localhost:3000/api/v1/tasks/${id}`, {
    method: "DELETE"
  })
  .then(response => response.json())
  .then(response => {
    console.log(response);
  });
  buttonInModal.id = "delete-modal-button";
  buttonInModal.removeEventListener("click", deleteTask);
  modal.classList.remove("is-active");
  window.location.href = `tasks?id=${projectId}`;
}