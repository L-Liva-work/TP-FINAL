const { PrismaClient } = require('@prisma/client')
const express = require('express')

const router = express.Router()

const prisma = new PrismaClient()

router.get('/', async (req, res) => {
    try {
        const persons = await prisma.person.findMany()
    res.json(persons)
    } catch (error) {
        res.status(500).json({error: 'Error al obtener los usuarios'})   
    }
})

router.get('/:id' , async (req, res) => {    
    const id = parseInt(req.params.id)
    if (isNaN(id)){
        res.status(400).send('ID invalido')
        return
    }

    const person = await prisma.person.findUnique({
        where: {
            id
        }
    })

    if (!person){
        res.status(404).send(`Persona con ID ${id} no encontrada`)
        return
    }

    res.json(person)
    
})


router.post('', async (req, res) => {
    const { nombre, email } = req.body;

    if (!nombre || !email) {
        return res.status(400).json({ error: 'Los campos nombre y email son requeridos' });
    }

    const person = await prisma.person.create({
        data: {
            email: req.body.email,
            nombre: req.body.nombre,
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
        res.status(404).send('Persona no encontrada')
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
        res.status(404).send('Persona no encontrada')
        return
    }

    try {
        person = await prisma.person.update({
        where: {
            id: person.id,
        },
        data: {
            email: req.body.email,
            nombre: req.body.nombre,
            doc: req.body.doc,
            puesto: req.body.puesto

        }
    })
    res.send(person)
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
    
})


/*es para exportar el router de este archivo para que este disponible en app.js*/
module.exports = router;