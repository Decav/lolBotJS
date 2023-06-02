const { model, Schema } = require("mongoose")

// Esquema de dieta para guardar los objetos en la bd
const metaSchema = new Schema({
	patch: String,
	champions: Array,
})

// Al traer los objetos de la bd se añade id y se elimina _id y __v de sus propiedades
metaSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id
		delete returnedObject._id
		delete returnedObject.__v
	},
})

// Se crea el modelo con el esquema definido
const Meta = new model("Meta", metaSchema)

module.exports = Meta
