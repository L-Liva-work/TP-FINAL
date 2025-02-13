fetch('http://localhost:3000/api/v1/projects')
.then(response => response.json)
.then(projects => {
	const projectsData = document.getElementById('main-content')

	projects.forEach(project => {
		const card = document.createElement("div");
		card.classList = ("card");
		const cardContent = document.createElement("div");
		cardContent.classList = ("card-content");
		const content = document.createElement("div");
		content.classList = ("content");
		content.innerHTML=`
		Proyecto: $(project.name)
		</br>
		Descripcion: $(project.descripcion)
		`;

		cardContent.appendChild(content);
		card.appendChild(cardContent);
		projectsData.appendChild(card);
	});
});
