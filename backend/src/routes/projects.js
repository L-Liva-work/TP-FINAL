const { PrismaClient } = require('@prisma/client')
const express = require('express')

const router = express.Router()

const prisma = new PrismaClient()

router.get('/', async (req, res) => {
    try {
        const projects = await prisma.projects.findMany()
    res.json(projects)
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

    const project = await prisma.projects.findUnique({
        where: {
            id
        }
    })

    if (!project){
        res.status(404).send(`Proyecto con ID ${id} no encontrada`)
        return
    }

    res.json(project)
    
})


router.post('', async (req, res) => {
    const  nombre = req.body;

    if (!nombre)  {
        return res.status(400).json({ error: 'El campo nombre es requerido' });
    }

    const project = await prisma.projects.create({
        data: {
            name: req.body.name,
            descripcion: req.body.description,
          	enddate: req.body.endDate,
        }
    })
    res.status(201).send(project)
})


router.delete('/:id', async (req, res) => {
    const project = await prisma.projects.findUnique({
        where: {
            id: parseInt(req.params.id)
		}
    })

    if (project  === null){
        res.status(404).send('Proyecto no encontrado')
        return
    }

    await prisma.projects.delete({
        where: {
            id: parseInt(req.params.id)
        }
    })
    res.send(project)
})

router.put('/:id', async (req, res) => {
    let project = await prisma.projects.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })
    if (project === null) {
        res.status(404).send('Proyecto no encontrado')
        return
    }

    try {
        project = await prisma.projects.update({
        where: {
            id: project.id,
        },
					data: {
							descripcion: req.body.descripcion,
							name: req.body.nombre,
							date: req.body.date,
					}
    })
    res.send(project)
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el proyecto' });
    }
    
})


/*es para exportar el router de este archivo para que este disponible en app.js*/
module.exports = router;
