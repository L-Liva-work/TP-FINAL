const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get("id");
loadUsers();

const taskName = document.getElementById('task-name');
const taskPriority = document.getElementById('task-priority');
let priority = taskPriority.value;

if (priority != "LOW" && priority != "MEDIUM" && priority != "HIGH" && priority != "HIGHEST") {
  taskPriority.value = "NONE";
}

const taskDescription = document.getElementById('task-description');

const taskEndDate = document.getElementById('task-endDate');
if (!taskEndDate.value) {
  taskEndDate.value = undefined;
}

const submitButton = document.getElementById("submit-button");
submitButton.onclick = function(){createTask()}
const personsList = document.getElementById("persons-list");
const taskAssigne = personsList.value;


function loadUsers() {
  fetch(`http://localhost:3000/api/v1/projects/${projectId}/persons/`)
  .then(response => response.json())
  .then(persons => {
    persons.forEach(person => {
      let option = document.createElement("option");
      let personId = person.person_id;
      
      fetch(`http://localhost:3000/api/v1/persons/${personId}`)
      .then(response => response.json())
      .then(data => {
        option.value = data.nombre;
        option.innerText = data.nombre;
        personsList.appendChild(option);
      });
    });
  });
}

function createTask() {
  if (!taskName.value) {
    taskName.classList.add(("is-danger"));
  } else {
    fetch("http://localhost:3000/api/v1/tasks", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: taskName.value,
        priority: taskPriority.value,
        assigne: taskAssigne.value, 
        description: taskDescription.value,
        endDate: new Date(taskEndDate.value),
        project_id: parseInt(projectId)
      })})
    .then(response => {
      console.log(response);
    });
  }
}

const clearButton = document.getElementById("clear-button");

clearButton.addEventListener("click", () => {
  taskName.value = "";
  taskPriority.value = "NONE";
  taskPriority.defaultSelected = true;
  taskAssigne.value = "No Asignado";
  taskAssigne.defaultSelected = true;
  taskDescription.value = "";
  taskEndDate.value = new Date("");
});
