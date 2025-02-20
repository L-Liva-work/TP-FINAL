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

addPersonProject = function() {
	window.location.href = 'addPersonProject?id=' + projectId;
}
