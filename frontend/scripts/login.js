function iniciar_sesion() {
    event.preventDefault()
    
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const mensaje = document.getElementById('mensaje-error')

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
            alert('Inicio de sesion exitoso')
            window.location.href = "index.html"
        } else {
            mensaje.style.display = 'block'
        }
    })

}    
