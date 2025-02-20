const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')

const projects = require('./routes/projects')
const persons = require('./routes/persons')
const tasks = require('./routes/tasks')
const project = require('./routes/proyecto')

const authentication = require('./routes/authentication')
const verifyToken = require('./middlewares/verifyToken')

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Organizador de tareas')
})

app.use('/api/v1/projects', projects)
app.use('/api/v1/persons',verifyToken, persons)
app.use('/api/v1/tasks', tasks)

app.use('/api/v1/auth', authentication )

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
