const { PrismaClient } = require('@prisma/client')
const express = require('express')
const router = express.Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  const tasks = await prisma.tasks.findMany()
  res.json(tasks)
})

router.get('/:id', async (req, res) => {
  const task = await prisma.tasks.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })

  if (task === null) {
    res.status(404)
  }

  res.json(task)
})

router.post('/', async (req, res) => {
  if (!req.body.name) {
    res.status(400).send('El campo nombre no puede estar vacio!')
    return
  }

  const task = await prisma.tasks.create({
    data: {
      name: req.body.name,
      priority: req.body.priority,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate
    }
  })

  res.status(201).json(task)
})

router.delete('/:id', async (req, res) => {
  const task = await prisma.tasks.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })

  if (task === null) {
    res.status(404)
  } 
  else {
    await prisma.task.delete({
      where: {
        id: parseInt(req.params.id)
      }
    })
  
    res.json(task)
  }
})

router.put('/:id', async (req, res) => {
  let task = await prisma.tasks.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })

  if (task === null) {
    res.status(404)
  } 
  else {
    task = await prisma.tasks.update({
      where: {
        id: task.id
      },
      data: {
        name: req.body.name,
        priority: req.body.priority,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate
      }
    })

    res.json(task)
  }
})

module.exports = router