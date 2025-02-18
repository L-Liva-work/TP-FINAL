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
		view.textContent = ("View");
		view.href = 'viewProject?id=' + project.id;
		const edit = document.createElement("a");
		edit.classList = ("card-footer-item is-size-6");
		edit.textContent = ("Edit");
		const del = document.createElement("a");
		del.classList = ("card-footer-item is-size-6");
		del.textContent = ("Delete");
		
		
		cardFooter.appendChild(view);
		cardFooter.appendChild(edit);
		cardFooter.appendChild(del);
		content.appendChild(cardFooter);
		cardContent.appendChild(content);
		card.appendChild(cardContent);
		projectsData.appendChild(card);
	});
});
