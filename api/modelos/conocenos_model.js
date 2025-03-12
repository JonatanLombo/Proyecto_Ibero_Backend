var conocenos_model = {}
const mongoose = require("mongoose")
var Schema = mongoose.Schema

// Estructura de como va a estar la colección. (los datos que captura)
var conocenosSchema = new Schema ({
    text_1:String,
    text_2:String
})

//Modelado
const myModel = mongoose.model("conocenos",conocenosSchema)


conocenos_model.guardar = function(post, callback){
    const instancia = new myModel    
    instancia.text_1 = post.text_1
    instancia.text_2 = post.text_2

    //Se guardan los datos
    instancia.save()
    .then((respuesta) => {
        return callback ({state:true})
    }).catch((error) => {
        console.log(error)
        return callback ({state:true})
    })

}

conocenos_model.actualizar = function(post, responder){
    myModel.findOneAndUpdate({},{
            text_1:post.text_1,
            text_2:post.text_2      
    }).then((respuesta)=> {
        return responder ({state:true})
    }).catch((error)=> {
        console.log(error)
        return responder ({state:false})
    })
}

conocenos_model.listar = function(post, callback){
    myModel.find({},{})
    .then((respuesta) =>{
        return callback (respuesta)
    }).catch((error) => {
        console.log(error)
        return callback ([])
    })
}


module.exports.conocenos_model = conocenos_model