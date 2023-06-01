const metaRouter = require('express').Router()
const Meta = require('../models/Meta')

// Traer todos los datos de la bd
metaRouter.get('/', (request,response)=>{
    Meta.find({}).then(result => {
        response.json(result)
    }).catch(e => {
        console.log(e)
    })
})

// Buscar por id
metaRouter.get('/patch/:patch',(request,response) => {
    let {patch} = request.params
    Meta.find({patch: patch}).then(result => {
        response.json(result)
    }).catch(error => {
        console.log(error)
    })
})

// Crear un objeto en la bd
metaRouter.post('/', (request,response)=>{
    let {body} = request
    let {patch, champions} = body
    let meta = new Meta({
        patch, champions
    })
    console.log("Meta -> " + meta)
    meta.save().then(meta => {
        response.status(201).json(meta)
    }).catch(error =>{
        console.log(error)
    })
})

metaRouter.get('/patch/role/:patch/:role', (request,response)=>{
    let {patch, role} = request.params
    Meta.find({patch: patch}).then(result =>{
        switch (role) {
            case "TOP":
                championData = result[0].champions.find(championList => championList.role === ROLES.TOP);
                response.json(championData);
                break;
            case "JG":
                championData = result[0].champions.find(championList => championList.role ===ROLES.JG);
                response.json(championData);
                break;
            case "MID":
                championData = result[0].champions.find(championList => championList.role === ROLES.MID);
                response.json(championData);
                break;
            case "ADC":
                championData = result[0].champions.find(championList => championList.role === ROLES.ADC);
                response.json(championData);
                break;
            case "SUPP":
                championData = result[0].champions.find(championList => championList.role === ROLES.SUPP);
                response.json(championData);
                break;
            default:
                championData = null;
                response.json(result);
                break;
          }
    }).catch(e =>{
        console.log(e)
    })
})

const ROLES = {
    TOP: "TOP",
    JG: "JG",
    MID: "MID",
    ADC: "ADC",
    SUPP: "SUPP"
}


module.exports = metaRouter