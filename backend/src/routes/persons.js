const { PrismaClient } = require('@prisma/client')
const express = require('express')

const router = express.Router()

const prisma = new PrismaClient()
/*
router.get('/', async (req, res) => {
    console.log('Datos:' , req.body)
    try {
        const persons = await prisma.person.findMany()
        const respuesta = JSON.parse( 
            JSON.stringify(persons, (key, value) => typeof value === 'bigint' ? Number(value) : value)
        )
        res.json(respuesta)
    } catch (error) {
        console.error(" Error en el backend:", error)
        res.status(500).json({error: 'Error al obtener los usuarios'})   
    }
})
*/
router.get('/', async (req, res) => {
    try {
        console.log(" Recibiendo solicitud GET en /api/v1/persons");
        const persons = await prisma.person.findMany();
        const respuesta = JSON.parse( 
            JSON.stringify(persons, (key, value) => 
                typeof value === 'bigint' ? Number(value) : value
            )
        );
        console.log(" Datos obtenidos correctamente:", persons)

        res.json(respuesta);
    } catch (error) {
        console.error(" Error en el backend:", error)
        res.status(500).json({ error: 'Error al obtener los usuarios', detalle: error.message })
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

    const respuesta = JSON.parse( 
        JSON.stringify(person, (key, value) => typeof value === 'bigint' ? Number(value) : value)
    )

    res.json(respuesta)
    
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
            puesto: req.body.puesto,
            telefono: BigInt(req.body.telefono)
        }
    })
    const respuesta = JSON.parse( 
        JSON.stringify(person, (key, value) => typeof value === 'bigint' ? Number(value) : value)
    )
    res.status(201).send(respuesta)
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
    const respuesta = JSON.parse( 
        JSON.stringify(person, (key, value) => typeof value === 'bigint' ? Number(value) : value)
    )
    res.status(201).send(respuesta)
    //res.send(person)
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
            puesto: req.body.puesto,
            telefono: BigInt(req.body.telefono)

        }
    })
    const respuesta = JSON.parse( 
        JSON.stringify(person, (key, value) => typeof value === 'bigint' ? Number(value) : value)
    )
    res.status(201).send(respuesta)
    //res.send(person)
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
    
})


/*relacion con proyecto
router.post('/:' + id +'/proyectos', async (req, res) => {
    const personId = parseInt(req.params.personId)
    const { name, date, descripcion } = req.body

    try {
        const proyecto = await prisma.proyecto.create({
            data: {
                name,
                date: new Date(date),
                descripcion,
                creadorId: personId, 
            },
        })

        res.status(201).json(proyecto)
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el proyecto' })
    }
})
*/

/*es para exportar el router de este archivo para que este disponible en app.js*/
module.exports = router;