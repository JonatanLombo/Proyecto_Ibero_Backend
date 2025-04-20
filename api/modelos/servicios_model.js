var servicios_model = {}
const mongoose = require("mongoose")
var Schema = mongoose.Schema

// Estructura de como va a estar la colección. (los datos que captura)
var serviciosSchema = new Schema ({
    nombre:String,
    codigo:String
})

//Modelado
const myModel = mongoose.model("servicios",serviciosSchema)


servicios_model.guardar = function(post, callback){
    const instancia = new myModel    
    instancia.text_1 = post.text_1

    //Se guardan los datos
    instancia.save()
    .then((respuesta) => {
        return callback ({state:true})
    }).catch((error) => {
        console.log(error)
        return callback ({state:true})
    })

}

servicios_model.actualizar = function(post, responder){
    myModel.findOneAndUpdate({},{
            text_1:post.text_1,  
    }).then((respuesta)=> {
        return responder ({state:true})
    }).catch((error)=> {
        console.log(error)
        return responder ({state:false})
    })
}

servicios_model.listar = function(post, callback){
    myModel.find({},{})
    .then((respuesta) =>{
        return callback (respuesta)
    }).catch((error) => {
        console.log(error)
        return callback ([])
    })
}

module.exports.servicios_model = servicios_model