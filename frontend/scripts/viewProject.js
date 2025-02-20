const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('id');
	
function delProject() {
		console.log(projectId)
		alert('Borrando proyecto id:' + projectId)
		fetch('http://localhost:3000/api/v1/projects/' + projectId, {
			method: 'DELETE'
		})
		.then(response => response.json())
		.then(response => {
			console.log(response)
			window.location.href='../pages/projects'
		})
	}


fetch('http://localhost:3000/api/v1/projects/' + projectId)
.then((response) => response.json())
.then((project) => {
	console.log(projectId);
	console.log(project);
	
	const projectData = document.getElementById("project-data");
	const projectName = document.getElementById("project-name-title");
	
	projectName.textContent = project.name;

	let tr = document.createElement('tr');
	tr.id = 'project' + project.id;
	let id = document.createElement('th');
	id.textContent = project.id;
	let startdate = document.createElement('td');
	startdate.textContent = project.startdate.split('T')[0];
	let enddate = document.createElement('td');
	enddate.textContent = project.enddate.split('T')[0];

	tr.appendChild(id);
	tr.appendChild(startdate);
	tr.appendChild(enddate);
	projectData.appendChild(tr);

	const projectDesc = document.getElementById("project-desc");
	projectDesc.textContent = project.descripcion;
});

redirect = function () {
	window.location.href= 'editProject?id=' + projectId;
}


const viewTasksButton = document.getElementById("viewTasks");

viewTasksButton.addEventListener("click", () => {
	window.location.href = `tasks?id=${projectId}`;
});

const createTasksButton = document.getElementById("createTasks");

createTasksButton.addEventListener("click", () => {
	window.location.href = `createTasks?id=${projectId}`;
});

addPersonProject = function() {
	window.location.href = 'addPersonProject?id=' + projectId;
}

cargarPersonas = function () {

	fetch(`http://localhost:3000/api/v1/projects/${projectId}/persons`)
	.then((response) => response.json())
	.then((person) => {
		console.log(person)
		console.log(typeof(person))
		const persons = person.person
		let table = document.getElementById("person-table");
	

		persons.forEach(data =>{
			console.log(data)
			let tr = document.createElement('tr');

			let id = document.createElement('td');
			id.textContent = data.person_id;


			let borrar = document.createElement('td')
			let button = document.createElement('button')
			button.classList= 'button is-danger is-ligt'

			let icono = document.createElement('i')
			icono.classList= 'fa-solid fa-trash-can'
			button.onclick = function(){deleterel(data.id)}
			button.appendChild(icono)
			
			tr.appendChild(id);
			borrar.appendChild(button);
			tr.appendChild(borrar);

			table.appendChild(tr)
		})
	})
}

cargarPersonas();

deleterel = function(id) {
	alert('Desasignando persona ' + id);
	fetch(`http://localhost:3000/api/v1/projects/${projectId}/persons`, {
		method : 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
		body : JSON.stringify({
			personId : id 
		})	
	})

}
