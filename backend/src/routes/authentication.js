const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')
const express = require('express')
const router = express.Router()
const prisma = new PrismaClient()

router.post('/login', async (req, res) => {
    const { email , password} = req.body;
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
       
    return res.status(201).json('Inicio de sesión exitoso');

})



module.exports = router;