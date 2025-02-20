fetch('http://localhost:3000/api/v1/projects')
.then((response) => response.json())
.then((projects) => {
	const projectsData = document.getElementById("main-content")

	projects.forEach(project => {
		const card = document.createElement("div");
		card.classList = ("card");
		const cardContent = document.createElement("div");
		cardContent.classList = ("card-content");
		const content = document.createElement("div");
		content.classList = ("content title is-2 has-text-centered");
		content.textContent= project.name;
		const cardFooter = document.createElement("footer");
		cardFooter.classList = ("card-footer");
		const view = document.createElement("a");
		view.classList = ("card-footer-item is-size-6");
		view.textContent = ("Ver");
		view.href = 'viewProject?id=' + project.id;
		const edit = document.createElement("a");
		edit.classList = ("card-footer-item is-size-6");
		edit.textContent = ("Editar");
		edit.href = 'editProject?id=' + project.id;
		const del = document.createElement("a");
		del.classList = ("card-footer-item is-size-6");
		del.textContent = ("Borrar");
		del.onclick = function(){delProject(project.id)};
		
		
		cardFooter.appendChild(view);
		cardFooter.appendChild(edit);
		cardFooter.appendChild(del);
		content.appendChild(cardFooter);
		cardContent.appendChild(content);
		card.appendChild(cardContent);
		projectsData.appendChild(card);
	});
});


function delProject(projectId) {
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
