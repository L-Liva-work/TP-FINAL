const express = require('express')
const persons = require('./routes/persons')
const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Organizador de tareas')
})

app.use('/api/v1/persons', persons)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})