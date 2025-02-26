var productos_model = {}
const mongoose = require("mongoose")
var Schema = mongoose.Schema

// Estructura de como va a estar la colección. (los datos que captura)
var productosSchema = new Schema ({
    nombre:String,
    codigo:String
})

//Modelado
const myModel = mongoose.model("productos",productosSchema)

productos_model.validarCodigo = function(post, callback){
    myModel.find({codigo:post.codigo})
        .then((respuesta) => {  
        //Si se pone un console.log(respueta) se puede evidenciar el error en la consola, si llega a salir error  
        return callback (respuesta)
    }).catch((error)=>{
        console.log(error)
    })
}

productos_model.guardar = function(post, callback){
    const instancia = new myModel    
    instancia.nombre = post.nombre
    instancia.codigo = post.codigo

    //Se guardan los datos
    instancia.save()
    .then((respuesta) => {
        //Si se pone un console.log(respueta) se puede evidenciar el error en la consola, si llega a salir error
        return callback ({state:true})
    }).catch((error) => {
        console.log(error)
        return callback ({state:true})
    })

}

productos_model.actualizar = function(post, callback){
    myModel.findOneAndUpdate({_id:post._id},{nombre:post.nombre})
    .then((respuesta) =>{
        return callback ({state:true})
    }).catch((error) => {
        console.log(error)
        return callback ({state:false})
    })
}

productos_model.eliminar = function(post, callback){
    myModel.findByIdAndDelete({_id:post._id})
    .then((respuesta) =>{
        return callback ({state:true})
    }).catch((error) => {
        console.log(error)
        return callback ({state:false})
    })
}

productos_model.listar = function(post, callback){
    myModel.find({},{})
    .then((respuesta) =>{
        return callback (respuesta)
    }).catch((error) => {
        console.log(error)
        return callback ([])
    })
}

productos_model.listar_id = function(post, callback){
    myModel.find({_id:post._id},{})
    .then((respuesta) =>{
        return callback (respuesta)
    }).catch((error) => {
        console.log(error)
        return callback ([])
    })
}



module.exports.productos_model = productos_model