var macetas_model = {}
const mongoose = require("mongoose")
var Schema = mongoose.Schema

// Estructura de como va a estar la colección. (los datos que captura)
var macetasSchema = new Schema ({
    nombre:String,
    codigo:String,
    imagen:String,
    precio:String,
    descripcion:String,
    beneficios:String
})

//Modelado
const myModel = mongoose.model("macetas",macetasSchema)

macetas_model.validarCodigo = function(post, callback){
    myModel.find({codigo:post.codigo})
        .then((respuesta) => {  
        //Si se pone un console.log(respueta) se puede evidenciar el error en la consola, si llega a salir error  
        return callback (respuesta)
    }).catch((error)=>{
        console.log(error)
    })
}

macetas_model.guardar = function(post, callback){
    const instancia = new myModel    
    instancia.nombre = post.nombre
    instancia.codigo = post.codigo
    instancia.imagen = post.imagen
    instancia.precio = post.precio
    instancia.descripcion = post.descripcion
    instancia.beneficios = post.beneficios

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

macetas_model.actualizar = function(post, callback){
    myModel.findOneAndUpdate({_id:post._id},
        {nombre:post.nombre,
         imagen:post.imagen,
         precio:post.precio,
         descripcion:post.descripcion,
         beneficios:post.beneficios
        })
    .then((respuesta) =>{
        return callback ({state:true})
    }).catch((error) => {
        console.log(error)
        return callback ({state:false})
    })
}

macetas_model.eliminar = function(post, callback){
    myModel.findByIdAndDelete({_id:post._id})
    .then((respuesta) =>{
        return callback ({state:true})
    }).catch((error) => {
        console.log(error)
        return callback ({state:false})
    })
}

macetas_model.listar = function(post, callback){
    myModel.find({},{})
    .then((respuesta) =>{
        return callback (respuesta)
    }).catch((error) => {
        console.log(error)
        return callback ([])
    })
}

macetas_model.listar_id = function(post, callback){
    myModel.find({_id:post._id},{})
    .then((respuesta) =>{
        return callback (respuesta)
    }).catch((error) => {
        console.log(error)
        return callback ([])
    })
}


macetas_model.myModel = myModel
module.exports.macetas_model = macetas_model