const express = require('express')
const cors = require('cors');
const persons = require('./routes/persons')
const tasks = require('./routes/tasks')
const app = express()
const port = 3000

app.use(express.json())
app.use(cors());

app.get('/', (req, res) => {
  res.send('Organizador de tareas')
})

app.use('/api/v1/persons', persons)
app.use('/api/v1/tasks', tasks)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})