function iniciar_sesion() {
    event.preventDefault()
    
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const mensajeError = document.getElementById('mensaje-error')
    const mensajeExito = document.getElementById('mensaje-exito')


    if (!email || !password) { 
        mensaje.style.display = 'block'
        return
    }

    let body = {
        email: email,
        password: password
    }

    fetch('http://localhost:3000/api/v1/auth/login',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response=> {
        console.log(response.status)
        if(response.status === 200){
            //alert('Inicio de sesion exitoso')
            mensajeExito.style.display = 'block'
            setTimeout(function(){
                window.location.href = "projects.html"
             }, 2000)
        } else {
            mensajeError.style.display = 'block'
        }
    })

}    
