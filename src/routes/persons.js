const { PrismaClient } = require('@prisma/client')
const express = require('express')

const router = express.Router()

const prisma = new PrismaClient()

router.get('/', async (req, res) => {
    try {
        const persons = await prisma.person.findMany()
    res.json(persons)
    } catch (error) {
        res.status(500).jason({error: 'Error al obtener los usuarios'})   
    }
})

router.get('/:id' , async (req, res) => {
    const person = await prisma.person.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })

    if (person === null) {
        res.sendStatus(404)
        return
    }
    res.json(person)
})


/*es para exportar el router de este archivo para que este disponible en app.js*/
module.exports = router;