const regex_nombre = /^[a-zA-Z\s]{1,30}$/ 
const regex_email =  /^[a-zA-z0-9_.]+@[a-zA-Z0-9]+\.[a-zA-Z0-9_.+-]+$/
const regex_doc = /^[0-9]{8}$/
const regex_telefono = /^[0-9\s]{1,12}$/
const regex_puesto = /^[a-zA-z0-9\s]+$/  

document.addEventListener('DOMContentLoaded', function () {
  cargar_datos_persona()
  document.getElementById('form-editar').addEventListener('submit', (e) =>{
    if (!validar_formulario()) {
      e.preventDefault()
    } else{
      actualizar_persona(e)
    }
  })  

  const nombre = document.getElementById('actualizar-nombre')
  const email = document.getElementById('actualizar-email')
  const doc = document.getElementById('actualizar-documento')
  const telefono = document.getElementById('actualizar-telefono')
  const puesto = document.getElementById('actualizar-puesto')

  nombre.addEventListener('keyup', () => validar_campo(nombre, regex_nombre, 'error-nombre'))
  email.addEventListener('keyup', () => validar_campo(email, regex_email, 'error-email'))
  doc.addEventListener('keyup', () => validar_campo(doc, regex_doc, 'error-documento'))
  telefono.addEventListener('keyup', () => validar_campo(telefono, regex_telefono, 'error-telefono'))
  puesto.addEventListener('keyup', () => validar_campo(puesto, regex_puesto, 'error-puesto'))

})

function validar_campo(input, validacion_regex, id_error){
  const mensaje = document.getElementById(id_error)

  if (!validacion_regex.test(input.value)) {
    input.classList.add('is-danger')
    mensaje.style.display = 'block'

  } else {
    input.classList.remove('is-danger')
    mensaje.style.display = 'none'
  }
}

function validar_formulario() {
  es_valido = true

  if (!regex_nombre.test(nombre.value)){
    es_valido = false
  }
  if (!regex_email.test(email.value)){
    es_valido = false
  }
  if (!regex_doc.test(doc.value)){
    es_valido = false
  }
  if (!regex_telefono.test(telefono.value)){
    es_valido = false
  }
  if (!regex_puesto.test(puesto.value)){
    es_valido = false
  }
  return es_valido
}

cargar_datos_persona = function() { 
  const urlParams = new URLSearchParams(window.location.search)
  const persona_id = urlParams.get('id')

  if (!persona_id) {
    alert("No se encontró el ID de la persona.")
    window.location.href = 'persons.html'
    return
  }

  fetch('http://localhost:3000/api/v1/persons/' + persona_id)
    .then(response => {
        if (!response.ok) throw new Error("Error al obtener los datos")
        return response.json()
     })
    .then(person => { 
        document.getElementById('actualizar-nombre').value = person.nombre
        document.getElementById('actualizar-email').value = person.email
        document.getElementById('actualizar-documento').value = person.doc
        document.getElementById('actualizar-puesto').value = person.puesto
        document.getElementById('actualizar-telefono').value = person.telefono
      })
    .catch(error => console.error('Error al cargar a la persona:', error))
}

actualizar_persona = function(event){ 
  event.preventDefault()

  const url = new URLSearchParams(window.location.search)
  const persona_id = url.get('id')
  console.log("ID obtenido en actualizar_persona:", persona_id);

  const new_body = {
    email: document.getElementById('actualizar-email').value,
    nombre: document.getElementById('actualizar-nombre').value,
    doc: document.getElementById('actualizar-documento').value,
    puesto: document.getElementById('actualizar-puesto').value,
    telefono: document.getElementById('actualizar-telefono').value
  }

  fetch('http://localhost:3000/api/v1/persons/' + persona_id, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(new_body)
    
  })
  .then(response => {
    if (!response.ok) {
      return response.json()
      .then(error => { 
        throw new Error(error.message) 
      })
    } else{
        return response.json()
    }
  })
  .then(data => {
    console.log('Persona actualizada con exito:', data)
    alert('Persona actualizada con exito')
    window.location.href = 'persons.html'
  })
  .catch(error => {
    console.error('Error al actualizar persona:', error)
    alert('Error al actualizar persona: ' + error.message)
  })
}