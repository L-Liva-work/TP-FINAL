function clear() {
  event.preventDefault();

  const name = document.getElementById('task-name');
  const priority = document.getElementById('task-priority');
  const description = document.getElementById('task-description');
  const endDate = document.getElementById('task-endDate');

  name.innerText = "";
  priority.innerText = "";
  description.innerText = "";
  endDate.innerText = "";
}

function createTask() {
  event.preventDefault();

  const name = document.getElementById('task-name').value;
  let priority = document.getElementById('task-priority').value;
  if (priority != "mid" && priority != "high") {
    priority = "low";
  }
  const description = document.getElementById('task-description').value;
  let endDate = document.getElementById('task-endDate').value;
  if (!endDate) {
    endDate = undefined;
  } else {
    endDate = new Date(endDate);
  }
  let body = {
    name: name,
    priority: priority,
    description: description,
    endDate: endDate
  }

  fetch("http://localhost:3000/api/v1/tasks", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(response => {
    if (response.status === 201) {
      alert('Tarea creada con exito');
    } else {
      alert('Error al crear Tarea');
    }
  });

  clear();
}
