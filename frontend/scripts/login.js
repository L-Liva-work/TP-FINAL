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
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (data.persona && data.persona.token) {
            localStorage.setItem('token', data.persona.token)
            mensajeExito.style.display = 'block'
            setTimeout(function() {
                //window.location.href = "projects.html"
                console.log(data.persona.id)
                window.location.href= "person.html?id=" + data.persona.id
            }, 2000)
        } else {
            setTimeout(function () {
               mensajeError.style.display = 'block' 
            },1000)
            
            window.location.reload()
        }
    })

} 
