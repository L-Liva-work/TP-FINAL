const urlParam = new URLSearchParams(window.location.search)
const personId = urlParam.get('id')

document.getElementById('title').textContent += personId

fetch('http://localhost:3000/api/v1/persons/' + personId)
.then((response) => response.json())
.then((data) => {
    //console.log('Los datos de esta perosona son: ')
    //console.log(data)
    
        let table = document.getElementById('data-person')
        let tr = document.createElement('tr')
        
        let nombre = document.createElement('td')
        nombre.textContent = data.nombre
  
        let email = document.createElement('td')
        email.textContent = data.email
  
        let doc = document.createElement('td')
        doc.textContent = data.doc
  
        let telefono = document.createElement('td')
        telefono.textContent = data.telefono
  
        let puesto = document.createElement('td')
        puesto.textContent = data.puesto 
         
        tr.appendChild(nombre)
        tr.appendChild(email)
        tr.appendChild(doc)
        tr.appendChild(telefono)
        tr.appendChild(puesto)
      
        table.appendChild(tr)


    fetch(`http://localhost:3000/api/v1/persons/${personId}/projects`)
    .then((response) => response.json())
    .then((data) => {

        //console.log('Los proyectos de esta persona son: ')
        //console.log(data)
    
        let table = document.getElementById('data-project')
        data.forEach(data => {
            let tr = document.createElement('tr')
        
            let nombre = document.createElement('td')
            nombre.textContent = data.name
  
            let fecha = document.createElement('td')
            fecha.textContent = data.date
  
            let descripcion = document.createElement('td')
            descripcion.textContent = data.descripcion
  
            tr.appendChild(nombre)
            tr.appendChild(fecha)
            tr.appendChild(descripcion)
      
            table.appendChild(tr)
        })

    })


})

