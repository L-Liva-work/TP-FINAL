const urlParam = new URLSearchParams(window.location.search)
const personId = urlParam.get('id')

document.getElementById('title').textContent += personId

fetch('http://localhost:3000/api/v1/persons/' + personId)
.then((response) => response.json())
.then((data) => {
    console.log(data)
    /*
    const content_article = document.getElementById('content-article')
    //nombre
    const nombre =  document.createElement('h2')
    nombre.classList = 'panel-heading'
    nombre.textContent = data.nombre
    console.log(data.nombre)
    console.log(nombre)
    //email
    
    const div_email = document.createElement('div')
    div_email.classList = 'panel-block'
    const email = document.createElement('h3')
    email.classList = 'has-text-black'
    email.textContent = data.email
    console.log(data.email)
    //doc
    const div_doc = document.createElement('div')
    div_doc.classList = 'panel-block'
    const doc = document.createElement('h3')
    doc.classList = 'has-text-black'
    doc.textContent = data.doc
    console.log(data.doc)
    //telefono
    const div_telefono = document.createElement('div')
    div_telefono.classList = 'panel-block'
    const telefono = document.createElement('h3')
    telefono.classList = 'has-text-black'
    telefono.textContent = data.telefono
    console.log(data.telefono)
    //puesto
    const div_puesto = document.createElement('div')
    div_puesto.classList = 'panel-block'
    const puesto = document.createElement('h3')
    puesto.classList = 'has-text-black'
    puesto.textContent = data.puesto
    console.log(data.puesto)

    content_article.appendChild(nombre)
    div_email.appendChild(email)
    content_article.appendChild(div_email)
    

    div_email.appendChild(doc)
    content_article.appendChild(div_doc)
    div_email.appendChild(telefono)
    content_article.appendChild(div_telefono)
    div_email.appendChild(puesto)
    content_article.appendChild(div_puesto)
 */
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
        console.log(data)
    
        let table = document.getElementById('data-proyect')
        let tr = document.createElement('tr')
        
        let nombre = document.createElement('td')
        nombre.textContent = data.nombre
  
        let fecha = document.createElement('td')
        fecha.textContent = data.fecha
  
        let descripcion = document.createElement('td')
        descripcion.textContent = data.descripcion
  
        tr.appendChild(nombre)
        tr.appendChild(fecha)
        tr.appendChild(descripcion)
      
        table.appendChild(tr)

})


})

