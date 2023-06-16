const championRouter = require("express").Router()
const Champion = require("../models/Champion")

// Traer todos los datos de la bd
championRouter.get("/", (request, response) => {
	Champion.find({})
		.then((result) => {
			response.json(result)
		})
		.catch((e) => {
			console.log(e)
		})
})

// Buscar por id
championRouter.get("/:id", (request, response) => {
	let { id } = request.params
	Champion.findById(id)
		.then((result) => {
			response.json(result)
		})
		.catch((error) => {
			console.log(error)
		})
})

// Crear un objeto en la bd
championRouter.post("/", (request, response) => {
	let { body } = request
	let { name, imageBuild } = body
	let champion = new Champion({
		name,
		imageBuild,
	})

	champion
		.save()
		.then((champion) => {
			response.status(201).json(champion)
		})
		.catch((error) => {
			console.log(error)
		})
})

championRouter.put("/:id", (request, response) => {
	let { id } = request.params
	let { body } = request
	let { name, imageBuild } = body
	Champion.findByIdAndUpdate(id, {
		name,
		imageBuild,
	})
		.then((champion) => {
			response.status(202).json(champion)
		})
		.catch((error) => {
			console.log(error)
			response.status(400).end()
		})
})

championRouter.get("/name/:name", (request, response) => {
	let { name } = request.params
	Champion.find({ name: name })
		.then((result) => {
			response.json(result)
		})
		.catch((e) => {
			console.log(e)
		})
})

module.exports = championRouter
