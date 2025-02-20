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
<<<<<<< HEAD:backend/src/routes/projects.js
    const  nombre = req.body;

    if (!nombre)  {
        return res.status(400).json({ error: 'El campo nombre es requerido' });
=======
    const { name , creadorId } = req.body;

    if (!name || !creadorId ) {
        return res.status(400).json({ error: 'Los campos nombre y creador son requeridos' });
>>>>>>> dev:backend/src/routes/proyecto.js
    }

    const project = await prisma.projects.create({
        data: {
<<<<<<< HEAD:backend/src/routes/projects.js
            name: req.body.name,
            descripcion: req.body.description,
          	enddate: req.body.endDate,
=======
            descripcion: req.body.descripcion,
            name: req.body.name,
          	date: req.body.date,
            creadorId: req.body.creadorId
>>>>>>> dev:backend/src/routes/proyecto.js
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
		console.log(req.params.id);
		console.log(req.body);
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
					id: parseInt(req.params.id)
				},
					data: {
							name: req.body.name,
							descripcion: req.body.description,
							enddate: req.body.endDate,
					}
    })
			console.log(project);
    res.send(project)
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el proyecto' });
    }
    
})


/*es para exportar el router de este archivo para que este disponible en app.js*/
module.exports = router;
