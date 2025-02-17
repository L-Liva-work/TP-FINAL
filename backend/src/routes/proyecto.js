const { PrismaClient } = require('@prisma/client')
const express = require('express')

const router = express.Router()

const prisma = new PrismaClient()

router.get('/', async (req, res) => {
    try {
        const proyectos = await prisma.proyecto.findMany()
    res.json(proyectos)
    } catch (error) {
        res.status(500).json({error: 'Error al obtener los proyectos'})   
    }
})

router.get('/:id' , async (req, res) => {    
    const id = parseInt(req.params.id)
    if (isNaN(id)){
        res.status(400).send('ID invalido')
        return
    }

    const proyectos = await prisma.proyecto.findUnique({
        where: {
            id
        }
    })

    if (!proyectos){
        res.status(404).send(`Proyecto con ID ${id} no encontrada`)
        return
    }

    res.json(proyectos)
    
})


router.post('', async (req, res) => {
    const { name , creadorId } = req.body;

    if (!name || !creadorId ) {
        return res.status(400).json({ error: 'Los campos nombre y creador son requeridos' });
    }

    const proyecto = await prisma.proyecto.create({
        data: {
            descripcion: req.body.descripcion,
            name: req.body.name,
          	date: req.body.date,
            creadorId: req.body.creadorId
        }
    })
    res.status(201).send(proyecto)
})


router.delete('/:id', async (req, res) => {
    const proyecto = await prisma.proyecto.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })

    if (proyecto === null){
        res.status(404).send('Proyecto no encontrado')
        return
    }

    await prisma.proyecto.delete({
        where: {
            id:parseInt(req.params.id)
        }
    })
    res.send(proyecto)
})

router.put('/:id', async (req, res) => {
    let proyecto = await prisma.proyecto.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })
    if (proyecto === null) {
        res.status(404).send('Proyecto no encontrado')
        return
    }

    try {
        proyecto = await prisma.proyecto.update({
        where: {
            id: proyecto.id,
        },
					data: {
							descripcion: req.body.descripcion,
							name: req.body.nombre,
							date: req.body.date,
							creador: req.body.creador
					}
    })
    res.send(proyecto)
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el proyecto' });
    }
    
})


/*es para exportar el router de este archivo para que este disponible en app.js*/
module.exports = router;
