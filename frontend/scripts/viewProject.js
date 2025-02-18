const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('id');


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

