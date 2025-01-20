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


router.post('', async (req, res) => {
    const person = await prisma.person.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            doc: req.body.doc,
            puesto: req.body.puesto
        }
    })
    res.status(201).send(person)
})


router.delete('/:id', async (req, res) => {
    const person = await prisma.person.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })

    if (person === null){
        res.sendStatus(404)
        return
    }

    await prisma.person.delete({
        where: {
            id:parseInt(req.params.id)
        }
    })
    res.send(person)
})

router.put('/:id', async (req, res) => {
    let person = await prisma.person.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })
    if (person === null) {
        res.sendStatus(404)
        return
    }

    person = await prisma.person.update({
        where: {
            id: person.id,
        },
        data: {
            name: req.body.name,
            email: req.body.email,
            doc: req.body.doc,
            puesto: req.body.puesto

        }
    })
    res.send(person)
})


/*es para exportar el router de este archivo para que este disponible en app.js*/
module.exports = router;