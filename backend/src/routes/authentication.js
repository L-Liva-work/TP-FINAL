const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')
const express = require('express')
const router = express.Router()
const prisma = new PrismaClient()

router.post('/login', async (req, res) => {
    const { email , password } = req.body
    //console.log("Datos recibidos en el backend:", req.body)
    if (!email || !password) {
        return res.status(400).json( 'Los campos email y contraseña son requeridos');
    }
    const personFind = await prisma.person.findUnique({
        where: {
            email
        }
    })
    if (!personFind){
        return res.status(400).json('Email o contraseña incorrectos')
    }
    const passwordCorrect = await bcrypt.compare(password,personFind.password)
    if (!passwordCorrect) {
        return res.status(400).json('Email o contraseña incorrectos')
    }

    const token = jwt.sign({email: personFind.email}, "extra-secreto", {expiresIn: "1h"})
    //res.json({token})
    //res.status(201).json('Inicio de sesión exitoso'); // hasta aca todo bien
    console.log('Token generado: '+ token)
    res.json({
        mensaje: "Usuario logeado de forma correcta",
        persona:{
            id: personFind.id,
            token
        }
    })

})



module.exports = router;