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

module.exports = router