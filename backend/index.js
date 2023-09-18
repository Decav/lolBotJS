require("./mongo")
require("dotenv").config()
const express = require("express")
const cors = require("cors")

// Importación de rutas de campeones y meta
const championRouter = require("./controllers/ChampionController")
const metaController = require("./controllers/MetaController")
const app = express()

app.use(cors())
app.use(express.json())

// Utilización de rutas
app.use("/champion", championRouter)
app.use("/meta", metaController)

app.listen(process.env.PORT, () => {
	console.log(`Servidor corriendo en el puerto: ${process.env.PORT}`)
})
