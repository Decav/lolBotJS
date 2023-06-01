const mongoose = require('mongoose')
const pass = '12345'
const connectionString = `mongodb+srv://Diego:${pass}@cluster0.73eqr.mongodb.net/xiaoData`

mongoose.connect(connectionString)
    .then(() => {
        console.log('Conectado!')
    }).catch(error => {
        console.log(error)
    })