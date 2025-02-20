const urlParams = new URLSearchParams(window.location.search);
const taskId = urlParams.get("id");

var projectId;

const taskName = document.getElementById("task-name");
const taskPriority = document.getElementById("task-priority");
const taskAssigne = document.getElementById("task-users");
const taskDescription = document.getElementById("task-description");
const taskProgress = document.getElementById("task-progress");
const taskStartDate = document.getElementById("task-startDate");
const taskEndDate = document.getElementById("task-endDate");

const submitButton = document.getElementById("edit-submit");
const clearButton = document.getElementById("edit-clear");

window.onload = function() {
  loadtask();
}

function loadtask() {
  fetch(`http://localhost:3000/api/v1/tasks/${taskId}`)
  .then(response => response.json())
  .then(task => {
    projectId = task.project_id;
  }).then(data => {
    loadUsers(projectId);
  }).then(() => {
    loadSavedData();
  })
}

function loadUsers(projectId) {
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
        taskAssigne.appendChild(option);
      });
    });
  });
}

function loadSavedData() {
  fetch(`http://localhost:3000/api/v1/tasks/${taskId}`)
  .then(response => response.json())
  .then(task => {
    taskName.value = task.name;
  
    const taskPriorityOptions = document.querySelectorAll("#task-priority > option");
    taskPriorityOptions.forEach(option => {
      if (option.value === task.priority) {
        option.defaultSelected = true;
        return;
      }
    });

    setTimeout(() => {
      const taskAssigneOptions = document.querySelectorAll("#task-users > option");
      taskAssigneOptions.forEach(option => {
        if (option.value === task.assigne) {
          option.defaultSelected = true;
          return;
        }
      });
    }, 300)

    taskDescription.value = task.description;
    taskProgress.value = task.progress;
    taskStartDate.value = new Date(task.startDate).toISOString().substring(0,10);
    taskEndDate.value = new Date(task.endDate).toISOString().substring(0,10);
  
    submitButton.addEventListener("click", submitForm);
  });
}


function submitForm() {
  let esValido = true;

  if (!taskStartDate.value) {
    esValido = false;
    taskStartDate.classList.add(("is-danger"));
  } else if (!taskEndDate.value) {
    esValido = false;
    taskEndDate.classList.add(("is-danger"));
  } else if (!taskName.value) {
    esValido = false;
    taskName.classList.add(("is-danger"));
  } else if ( isNaN(taskProgress.value) ) {
    esValido = false;
    taskProgress.classList.add(("is-danger"));
  } else if (taskProgress.value > 100 || taskProgress < 0) {
    esValido = false;
    taskProgress.classList.add(("is-danger"));
  }

  if (esValido) {
    fetch(`http://localhost:3000/api/v1/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        name: taskName.value,
        priority: taskPriority.value,
        assigne: taskAssigne.value,
        description: taskDescription.value,
        progress: parseInt(taskProgress.value),
        startDate: new Date(taskStartDate.value),
        endDate: new Date(taskEndDate.value)
      })})
    .then(response => {
        console.log(response);
        window.location.href = `tasks?id=${projectId}`;
    });
  }
}

clearButton.addEventListener("click", () => {
  taskName.value = "";
  taskPriority.value = "NONE";
  taskPriority.defaultSelected = true;
  taskAssigne.value = "No Asignado";
  taskAssigne.defaultSelected = true;
  taskDescription.value = "";
  taskProgress.value = 0;
  taskStartDate.value = new Date("");
  taskEndDate.value = new Date("");
});