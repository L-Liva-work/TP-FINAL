function clear() {
  event.preventDefault();

  const name = document.getElementById('project-name');
  const description = document.getElementById('project-description');
  const endDate = document.getElementById('project-endDate');

  name.innerText = "";
  description.innerText = "";
  endDate.innerText = "";
}

function createProject() {
  event.preventDefault();

  const name = document.getElementById('project-name').value;
  const description = document.getElementById('project-description').value;
  let endDate = document.getElementById('project-endDate').value;
  if (!endDate) {
    endDate = undefined;
  } else {
    endDate = new Date(endDate);
  }
  let body = {
    name: name,
    description: description,
    endDate: endDate,
  }

  fetch("http://localhost:3000/api/v1/projects", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(response => {
    if (response.status === 201) {
      alert('Proyecto creado con exito');
    } else {
      alert('Error al crear Proyecto');
    }
  });

  clear();
}
