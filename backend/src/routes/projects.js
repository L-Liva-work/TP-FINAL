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
		await prisma.relPersonProjects.deleteMany({
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

router.get('/:id/persons' , async (req, res) => {    
    const id = parseInt(req.params.id)
    if (isNaN(id)){
        res.status(400).send('ID invalido')
        return
    }

    const project = await prisma.projects.findUnique({
        where: {
            id: parseInt(req.params.id)
        }, 
        include: {
            person: true
        },
    })

    if (!project){
        res.status(404).send(`Proyecto con ID ${id} no encontrada`)
        return
    }

    res.json(project)
    
})    


//relacion con person

router.post('/:id/persons', async (req, res) => {
	const project = await prisma.projects.findUnique({
		where:{
			id : parseInt(req.params.id)
		}
	})

	if (project === null) {
			res.status(404).send('Proyecto no encontrado')
			return
	}
	console.log(parseInt(req.body.person_id))
	
	const person = await prisma.person.findUnique({
		where:{
			id : parseInt(req.body.person_id)
		}
	})


	if (person === null){
		res.status(404).send('Persona no encontrada')
		return
	}

	await prisma.relPersonProjects.create({
		data:{
			project_id : project.id,
			person_id : person.id
		}
	})

	res.sendStatus(201)
})

router.get('/:id/persons', async (req, res) =>{
	const projectId = parseInt(req.params.id)
	console.log("Buscando info de proyecto con ID:", projectId)
	const project = await prisma.projects.findMany({
		include: {
			person: {
				where:{
					project_id: projectId
				}
			}
		},
	})
	console.log("Resultados:", project)

	if(project === null){
		res.status(404).send("Proyecto no encontrado")
		return
	}

	res.json(project)
})

router.delete('/:id/persons', async (req, res) =>{
	const projectId = parseInt(req.params.id)

	await prisma.relPersonProjects.delete({
		where: {
			id : parseInt(req.body.personId),
			project_id : projectId
		
		}
	})
})
/*es para exportar el router de este archivo para que este disponible en app.js*/
module.exports = router;
