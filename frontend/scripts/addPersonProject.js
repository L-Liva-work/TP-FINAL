const urlParams = new URLSearchParams(window.location.search)
const projectId = urlParams.get('id')

console.log(projectId)


addPersonProject = function() {
	event.preventDefault();

	const personId = document.getElementById("personid").value;
	console.log(personId)

	fetch(`http://localhost:3000/api/v1/projects/${projectId}/persons`, {
		method: 'POST',
		headers: {
			'Content-Type' : 'application/json'
		},
		body: JSON.stringify({
			person_id:  personId
		})
	})

}
