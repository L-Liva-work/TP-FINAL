const urlParams = new URLSearchParams(window.location.search)
const projectId = urlParams.get('id')

console.log(projectId)

const personId = document.getElementById("personid").value;


addPersonProject = function() {
	fetch('http://localhost:3000/api/v1/projects/' + projectId, {
		method: 'POST',
		headers: {
			'Content-Type' : 'application/json'
		},
		body: JSON.stringify({
			person_id:  personId
		})
	})

}
