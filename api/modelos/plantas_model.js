var plantas_model = {}
const mongoose = require("mongoose")
var Schema = mongoose.Schema

// Estructura de como va a estar la colección. (los datos que captura)
var plantasSchema = new Schema ({
    nombre:String,
    codigo:String,
    imagen:String,
    precio:String,
    descripcion:String,
    beneficios:String,
    recomendaciones:String
})

//Modelado
const myModel = mongoose.model("plantas",plantasSchema)

plantas_model.validarCodigo = function(post, callback){
    myModel.find({codigo:post.codigo})
        .then((respuesta) => {  
        //Si se pone un console.log(respueta) se puede evidenciar el error en la consola, si llega a salir error  
        return callback (respuesta)
    }).catch((error)=>{
        console.log(error)
    })
}

plantas_model.guardar = function(post, callback){
    const instancia = new myModel    
    instancia.nombre = post.nombre
    instancia.codigo = post.codigo
    instancia.imagen = post.imagen
    instancia.precio = post.precio
    instancia.descripcion = post.descripcion
    instancia.beneficios = post.beneficios
    instancia.recomendaciones = post.recomendaciones

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

plantas_model.actualizar = function(post, callback){
    myModel.findOneAndUpdate({_id:post._id},
        {nombre:post.nombre,
         imagen:post.imagen,
         precio:post.precio,
         descripcion:post.descripcion,
         beneficios:post.beneficios,
         recomendaciones:post.recomendaciones
        })
    .then((respuesta) =>{
        return callback ({state:true})
    }).catch((error) => {
        console.log(error)
        return callback ({state:false})
    })
}

plantas_model.eliminar = function(post, callback){
    myModel.findByIdAndDelete({_id:post._id})
    .then((respuesta) =>{
        return callback ({state:true})
    }).catch((error) => {
        console.log(error)
        return callback ({state:false})
    })
}

plantas_model.listar = function(post, callback){
    myModel.find({},{})
    .then((respuesta) =>{
        return callback (respuesta)
    }).catch((error) => {
        console.log(error)
        return callback ([])
    })
}

plantas_model.listar_id = function(post, callback){
    myModel.find({_id:post._id},{})
    .then((respuesta) =>{
        return callback (respuesta)
    }).catch((error) => {
        console.log(error)
        return callback ([])
    })
}



module.exports.plantas_model = plantas_model