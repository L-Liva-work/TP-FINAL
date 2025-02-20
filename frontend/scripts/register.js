const regex_nombre = /^[a-zA-Z\s]{1,30}$/ 
const regex_email =  /^[a-zA-z0-9_.]+@[a-zA-Z0-9]+\.[a-zA-Z0-9_.+-]+$/
const regex_password = /^.{4,12}$/
const regex_doc = /^[0-9]{1,8}$/
const regex_telefono = /^[0-9\s]{1,12}$/
const regex_puesto = /^[a-zA-z0-9\s]+$/      
      
const nombre = document.getElementById('nombre')
const email = document.getElementById('email')
const password = document.getElementById('password')
const doc = document.getElementById('documento')
const telefono = document.getElementById('telefono')
const puesto = document.getElementById('puesto')

nombre.addEventListener('keyup', () => validar_campo(nombre, regex_nombre, 'error-nombre'))
email.addEventListener('keyup', () => validar_campo(email, regex_email, 'error-email'))
password.addEventListener('keyup' , () =>validar_campo(password,regex_password, 'error-password') )
doc.addEventListener('keyup', () => validar_campo(doc, regex_doc, 'error-documento'))
telefono.addEventListener('keyup', () => validar_campo(telefono, regex_telefono, 'error-telefono'))
puesto.addEventListener('keyup', () => validar_campo(puesto, regex_puesto, 'error-puesto'))


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
    if (!regex_password.test(password.value)){
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

function create_person() {
    event.preventDefault()
    const nombre = document.getElementById('nombre').value 
    const email = document.getElementById('email').value 
    const password = document.getElementById('password').value
    const doc = document.getElementById('documento').value 
    const puesto = document.getElementById('puesto').value
    const telefono = document.getElementById('telefono').value

    const mensaje = document.getElementById('mensaje-error') 

    if (!validar_formulario()) {
      alert('Complete de forma correcta y completa el formulario')
      return
    }

      let body =  {
          email: email,
          nombre: nombre,
          password: password,
          doc: parseInt(doc),
          puesto: puesto,
          telefono: parseInt(telefono)
      }

      fetch('http://localhost:3000/api/v1/persons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
        })
        .then(response =>{
          console.log(response.status)
          console.log('lo que estoy recibiendo es: '+response.json)
          if (response.status === 201) {
              alert('Registro exitoso')  
              window.location.href = "login.html"

              limpiar_formulario()
                
          } else {
            //esto es por si ya existe un usuario con ese email
            mensaje.style.display = 'block'
            setTimeout(function(){
              window.location.reload()
           }, 5000)
          }
        })

}
