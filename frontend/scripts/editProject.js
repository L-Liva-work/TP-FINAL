cargarDatos = function() {
const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('id');
	console.log(projectId);

	if (isNaN(projectId)) {
		alert("ID invalido");
		window.location.href = 'projects.html';
		return;
	}

	fetch('http://localhost:3000/api/v1/projects/' + projectId)
	.then(response => {
		if (!response.ok) throw new Error("Error al obtener los datos")
		return response.json()
	})
	.then(project => {
		document.getElementById('actualizar-name').value = project.name
		document.getElementById('actualizar-description').value = project.descripcion
		document.getElementById('actualizar-endDate').value = project.enddate.split('T')[0]
	})}

updateProject = function() {
	event.preventDefault(); 

	const urlParams = new URLSearchParams(window.location.search);
	const projectId = urlParams.get('id');
	console.log(projectId)
	let endDate = document.getElementById('actualizar-endDate').value;
	if (!endDate) {
    endDate = undefined;
  } else {
    endDate = new Date(endDate);
  }

	const new_body = {
		name: document.getElementById('actualizar-name').value,
		description: document.getElementById('actualizar-description').value,
		endDate: endDate,
	}
	console.log(new_body)

	fetch('http://localhost:3000/api/v1/projects/' + projectId, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(new_body)
	})
	.then(response => {
		if(!response.ok) {
			return response.json()
				.then(error => { 
			throw new Error(error.message) }) 
		} else {
		return response.json()}
		})
		.then(data => {
		console.log('Proyecto actualizado con exito:', data);
		alert('Proyecto actualizado con exito');
		window.location.href = 'projects'
	})
	.catch(error =>{
		console.error('Error al actualizar el proyecto:', error)
		alert('Error al actualizar el proyecto: '+ error.message);
	})
		}
	
cargarDatos();
