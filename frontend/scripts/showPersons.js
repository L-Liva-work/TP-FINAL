window.onload = function () {
    mostrar_personas()
  }
  
  
  mostrar_personas = function() {
    fetch('http://localhost:3000/api/v1/persons')
    .then(response => response.json())
    .then(persons => {
      console.log(persons)
  
      let table = document.getElementById('data-persons')
      table.innerHTML = ''
      persons.forEach(person => {
        let tr = document.createElement('tr')
  
        let id = document.createElement('th')
        const link = document.createElement('a')
        link.href = '/person?id=' + person.id
        link.textContent = person.id
        id.appendChild(link)

        let nombre = document.createElement('td')
        nombre.textContent = person.nombre
  
        let email = document.createElement('td')
        email.textContent = person.email
  
        let doc = document.createElement('td')
        doc.textContent = person.doc
  
        let telefono = document.createElement('td')
        telefono.textContent = person.telefono
  
        let puesto = document.createElement('td')
        puesto.textContent = person.puesto 
         
        let borrar = document.createElement('td')
        let button = document.createElement('button')
        button.className = 'button is-danger is-light'
  
        let icono = document.createElement('i')
        icono.className = 'fa-solid fa-trash-can'
        button.onclick = function(){eliminar_personas(person.id)}
        button.appendChild(icono)
        
        let editar = document.createElement('td')
        let link_editar = document.createElement('a')
        link_editar.href = 'editPerson.html?id=' + person.id

        let button_editar = document.createElement('button')
        button_editar.className = 'button is-info is-light'
  
        let icono_editar = document.createElement('i')
        icono_editar.className = 'fa-solid fa-pen-to-square'
  
        button_editar.appendChild(icono_editar)
        link_editar.appendChild(button_editar)
        editar.appendChild(link_editar)
        
        borrar.appendChild(button)
        tr.appendChild(id)
        tr.appendChild(nombre)
        tr.appendChild(email)
        tr.appendChild(doc)
        tr.appendChild(telefono)
        tr.appendChild(puesto)
        tr.appendChild(borrar)
        tr.appendChild(editar)
      
        table.appendChild(tr)
      });
  
    })
    .catch(error => console.error('Error en la solicitud:', error));
  
  }
  
  eliminar_personas = function (id) {
    alert('Borrando persona ' + id)
    fetch('http://localhost:3000/api/v1/persons/' + id, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(response => {
      console.log(response)
      mostrar_personas()
    })
    .catch(error => console.error('Error en la eliminación:', error));
  
  }