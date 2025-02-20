const { PrismaClient } = require('@prisma/client')
const express = require('express')
const router = express.Router()
const prisma = new PrismaClient()

router.get('/project/:id', async (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(400).send("Field id is not a number");
    return;
  }
  const tasks = await prisma.tasks.findMany({
    where: {
      project_id: parseInt(req.params.id)
    },
    include: {
      project: true
    },
  })
  res.json(tasks)
})

router.get('/', async (req, res) => {
  const tasks = await prisma.tasks.findMany()
  res.json(tasks)
})

router.get('/:id', async (req, res) => {
  
  if (isNaN(req.params.id)) {
    res.status(400).send("Field id is not a number");
    return;
  }

  const task = await prisma.tasks.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })

  if (task === null) {
    res.status(404)
    return
  }

  res.json(task)
})

router.post('/', async (req, res) => {
  if (!req.body.name) {
    res.status(400).send("Name must not be null");
    return;
  }

  if (req.body.priority != "LOW" && req.body.priority != "MEDIUM" && req.body.priority != "HIGH" && req.body.priority != "HIGHEST") {
    req.body.priority = "NONE";
  }

  const task = await prisma.tasks.create({
    data: {
      name: req.body.name,
      priority: req.body.priority,
      description: req.body.description,
      assigne: req.body.assigne,
      endDate: new Date(req.body.endDate),
      project_id: parseInt(req.body.project_id)
    }
  })

  res.status(201).json(task)
})

router.delete('/:id', async (req, res) => {
  
  if (isNaN(req.params.id)) {
    res.status(400).send("Field id is not a number");
    return;
  }

  const task = await prisma.tasks.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })

  if (task === null) {
    res.status(404)
    return
  } 
  await prisma.tasks.delete({
    where: {
      id: parseInt(req.params.id)
    }
  })
  
  res.json(task)
})

router.put('/:id', async (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(400).send("Field id is not a number");
    return;
  }
  
  let task = await prisma.tasks.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })

  if (task === null) {
    res.status(404)
    return
  }

  if (!req.body.name) {
    res.status(400).send("Name must not be null");
    return;
  }

  if (!req.body.startDate) {
    res.status(400).send("Invalid Date");
    return;
  }

  if (req.body.priority != "LOW" && req.body.priority != "MEDIUM" && req.body.priority != "HIGH" && req.body.priority != "HIGHEST") {
    req.body.priority = "NONE";
  }

  if (isNaN(req.body.progress) ) {
    res.status(400).send("Invalid data type on field 'tasks.progress'");
    return;
  } else if (req.body.progress > 100 || req.body.progress < 0) {
    res.status(400).send("Field 'tasks.progress' must be between 0 and 100");
    return;
  }

  task = await prisma.tasks.update({
    where: {
      id: task.id
    },
    data: {
      name: req.body.name,
      priority: req.body.priority,
      description: req.body.description,
      progress: parseInt(req.body.progress),
      assigne: req.body.assigne,
      startDate: new Date(req.body.startDate),
      endDate: new Date(req.body.endDate)
    }
  })
  
  res.status(200).json(task);
})

module.exports = router