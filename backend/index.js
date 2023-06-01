require('./mongo')
const express = require('express')
const cors = require('cors')

// Importación de rutas de ejercicios y dietas
const championRouter = require('./controllers/ChampionController')
const metaController = require('./controllers/MetaController')
const app = express()

app.use(cors())
app.use(express.json())

// Utilización de rutas
app.use('/champion', championRouter)
app.use('/meta', metaController)

app.listen(3001, ()=>{
    console.log('Servidor corriendo en el puerto: 3001')
})