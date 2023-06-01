const {model, Schema} = require('mongoose')

// Esquema de dieta para guardar los objetos en la bd
const championSchema = new Schema({
    name: String,
    imageBuild: String
})

// Al traer los objetos de la bd se añade id y se elimina _id y __v de sus propiedades
championSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id
      delete returnedObject._id
      delete returnedObject.__v
    }
})

// Se crea el modelo con el esquema definido
const Champion = new model('Champion', championSchema)

module.exports = Champion