fetch('http://localhost:3000/api/v1/tasks')
.then(response => response.json())
.then(tasks => {
  const tasksData = document.getElementById('tasks-data')
  
  tasks.forEach(task => {
    let tr = document.createElement('tr')
    tr.id = 'task-' + task.id
    let id = document.createElement('th')
    id.textContent = task.id
    let name = document.createElement('td')
    name.textContent = task.name
    let priority = document.createElement('td')
    priority.textContent = task.priority
    let description = document.createElement('td')
    description.textContent = task.description
    let startDate = document.createElement('td')
    startDate.textContent = task.startDate.split('T')[0]
    let endDate = document.createElement('td')
    endDate.textContent = task.endDate.split('T')[0]

    tr.appendChild(id)
    tr.appendChild(name)
    tr.appendChild(priority)
    tr.appendChild(description)
    tr.appendChild(startDate)
    tr.appendChild(endDate)
    tasksData.appendChild(tr)
  });
});