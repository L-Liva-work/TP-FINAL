const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')
const express = require('express')
const router = express.Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
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
    const { nombre, email , password} = req.body;

    if (!nombre || !email || !password) {
        return res.status(400).json({ error: 'Los campos nombre, email y contraseña son requeridos' });
    }

    const personFind = await prisma.person.findUnique({
        where: {
            email
        }
    })
    if (personFind){
        return res.status(400).json('Ya existe una persona registrada con ese correo')
    }
    const salt = await bcrypt.genSalt(5)
    const hashedPassword = await  bcrypt.hash(password, salt)


    const person = await prisma.person.create({
        data: {
            email: req.body.email,
            nombre: req.body.nombre,
            doc: req.body.doc,
            puesto: req.body.puesto,
            telefono: BigInt(req.body.telefono),
            password: hashedPassword
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

})

router.put('/:id', async (req, res) => {
    console.log('Datos recibidos en req.body:', req.body)
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
            doc: parseInt(req.body.doc),
            puesto: req.body.puesto,
            telefono: BigInt(req.body.telefono)

        }
    })
    const respuesta = JSON.parse( 
        JSON.stringify(person, (key, value) => typeof value === 'bigint' ? Number(value) : value)
    )
    res.status(201).json(respuesta)
    } catch (error) {
        console.error('Error al actualizar la persona:', error)
        res.status(500).json({ error: 'Error al actualizar el usuario' })
    }
    
})


//relacion con proyecto
router.get(`/:id/projects`, async (req, res) => {
    try {
        const personId = parseInt(req.params.id)
        console.log("Buscando persona con ID:", personId);
        const person = await prisma.person.findUnique({
            where: {
                id: parseInt(req.params.id)
            },
            include:{
                Proyectos: true
            }
        })
        console.log("Resultado de la búsqueda:", person)
        if(person === null){
            res.status(404).send('Persona no encontrada')
            return
        }
       
        res.json(person.Proyectos)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el/los proyectos' })
    }
})


/*es para exportar el router de este archivo para que este disponible en app.js*/
module.exports = router;