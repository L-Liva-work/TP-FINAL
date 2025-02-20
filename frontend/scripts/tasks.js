const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get("id");

console.log(projectId);
fetch(`http://localhost:3000/api/v1/tasks/project/${projectId}`)
.then(response => response.json())
.then(tasks => {
  const tasksData = document.getElementById("tasks-data");
  
  tasks.forEach(task => {

    let id = task.id;
    let taskRow = document.createElement("tr");
    taskRow.id = `task-${id}`;

    let taskNameField = document.createElement("td");
    taskNameField.textContent = task.name;

    let taskPriorityField = document.createElement("td");
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

    taskPriorityField.innerHTML = `<div class="notification has-text-centered ${taskPriorityColor} p-1"><stong>${taskPriorityText}</strong></div>`;

    let taskAssigneField = document.createElement("td");
    taskAssigneField.innerText = task.assigne;

    let taskDescriptionField = document.createElement("td");
    taskDescriptionField.textContent = task.description;
    taskDescriptionField.classList.add("task-description");

    let taskProgressField = document.createElement("td");

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
    taskProgressField.innerHTML = `<div class="block"><progress class="progress ${taskProgressColor}" value="${task.progress}" max="100"></progress></div>`;

    let taskStartDateField = document.createElement("td");
    let taskStartDateValue = new Date(task.startDate);
    taskStartDateField.textContent = new Intl.DateTimeFormat("es-AR", { dateStyle: "medium" }).format(taskStartDateValue);

    let taskEndDateField = document.createElement("td");
    let taskEndDateValue = new Date(task.endDate);
    taskEndDateField.textContent = new Intl.DateTimeFormat("es-AR", { dateStyle: "medium" }).format(taskEndDateValue);

    // Info button
    let infoButtonField = document.createElement("td");
    let infoButton = document.createElement("a");
    let infoIconSpan = document.createElement("span");
    let infoIcon = document.createElement("i");

    infoButton.href = `task?id=${id}`;
    infoButton.classList.add("button", "is-primary", "is-outlined");
    infoIconSpan.classList.add("icon");
    infoIcon.classList.add("fas", "fa-info-circle");

    infoIconSpan.appendChild(infoIcon);
    infoButton.appendChild(infoIconSpan);
    infoButtonField.appendChild(infoButton);

    // Edit button
    let editButtonField = document.createElement("td");
    let editButton = document.createElement("a");
    let editIconSpan = document.createElement("span");
    let editIcon = document.createElement("i");

    editButton.href = `editTask?id=${id}`;
    editButton.classList.add("button", "is-info", "is-outlined");
    editIconSpan.classList.add("icon");
    editIcon.classList.add("fas", "fa-edit");

    editIconSpan.appendChild(editIcon);
    editButton.appendChild(editIconSpan);
    editButtonField.appendChild(editButton);
    
    // Delete
    let deleteButtonField = document.createElement("td");
    let deleteButton = document.createElement("button");
    let deleteIconSpan = document.createElement("span");
    let deleteIcon = document.createElement("i");

    deleteButton.addEventListener("click", () => {
      openModal(id);
    });

    deleteButton.classList.add("button", "is-danger", "is-outlined", "delete-button");
    deleteIconSpan.classList.add("icon");
    deleteIcon.classList.add("fas", "fa-trash");

    deleteIconSpan.appendChild(deleteIcon);
    deleteButton.appendChild(deleteIconSpan);
    deleteButtonField.appendChild(deleteButton);

    // Append
    taskRow.appendChild(taskNameField);
    taskRow.appendChild(taskPriorityField);
    taskRow.appendChild(taskAssigneField);
    taskRow.appendChild(taskDescriptionField);
    taskRow.appendChild(taskProgressField);
    taskRow.appendChild(taskStartDateField);
    taskRow.appendChild(taskEndDateField);
    taskRow.appendChild(infoButtonField);
    taskRow.appendChild(editButtonField);
    taskRow.appendChild(deleteButtonField);
    tasksData.appendChild(taskRow);
  });
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
  const taskRow = document.getElementById(`task-${id}`);
  taskRow.remove();
  buttonInModal.id = "delete-modal-button";
  buttonInModal.removeEventListener("click", deleteTask);
  modal.classList.remove("is-active");
}

const createTasksButton = document.getElementById("createTasks");

createTasksButton.addEventListener("click", () => {
	window.location.href = `createTasks?id=${projectId}`;
});