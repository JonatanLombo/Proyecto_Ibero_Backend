var usuarios_model = {}
const mongoose = require("mongoose")
var Schema = mongoose.Schema

// Estructura de como va a estar la colección. (los datos que captura)
var usuariosSchema = new Schema ({
    email:String,
    nombre:String,
    apellido:String,
    password:String,
    estado:String,
    codigo:String,
    perfil:String
})

//Modelado
const myModel = mongoose.model("usuarios",usuariosSchema)


usuarios_model.registrar = function(post, responder){
  
    //Se asocian los datos
    const instancia = new myModel    
    instancia.email = post.email
    instancia.nombre = post.nombre
    instancia.apellido = post.apellido
    instancia.password = post.password
    instancia.estado = post.estado
    instancia.codigo = post.codigo
    instancia.perfil = "Cliente"

    //Se guardan los datos
    instancia.save()
    .then((respuesta) => {
        //Si se pone un console.log(respueta) se puede evidenciar el error en la consola, si llega a salir error
        return responder ({state:true})
    }).catch((error) => {
        console.log(error)
        return responder ({state:true})
    })
}
 
usuarios_model.ver_posicion_email = function(post, responder){
    myModel.findOne({email:post.email})
        .then((respuesta) => {  
        //Si se pone un console.log(respueta) se puede evidenciar el error en la consola, si llega a salir error  
        return responder (respuesta)
    }).catch((error)=>{
        console.log(error)
    })
}

usuarios_model.actualizar = function(post, responder){
    myModel.updateOne({email:post.email},{
        nombre:post.nombre,
        apellido:post.apellido,
        perfil:post.perfil,
        estado:post.estado
    }).then((respuesta)=> {
        //Si se pone un console.log(respueta) se puede evidenciar el error en la consola, si llega a salir error
        return responder ({state:true})
    }).catch((error)=> {
        console.log(error)
        return responder ({state:false})
    })
}

usuarios_model.eliminar = function(post, responder){
    myModel.deleteOne({email:post.email})
    .then((respuesta)=> {
        //Si se pone un console.log(respueta) se puede evidenciar el error en la consola, si llega a salir error
        return responder ({state:true})
    }).catch((error)=> {
        console.log(error)
        return responder ({state:false})
    })
}

usuarios_model.listar = function(post, responder){
    myModel.find({},{password:0,codigo:0,})
    .then((respuesta)=> {
        //Si se pone un console.log(respueta) se puede evidenciar el error en la consola, si llega a salir error
        return responder (respuesta)
    }).catch((error)=> {
        console.log(error)
        return responder ({})
    })
}

usuarios_model.login = function(post, responder){
    myModel.find({email:post.email, password:post.password},{_id:1,nombre:1,apellido:1,estado:1,perfil:1})
    .then((respuesta)=> {
        //Si se pone un console.log(respueta) se puede evidenciar el error en la consola, si llega a salir error
        return responder(respuesta)
    }).catch((error)=> {
        console.log(error)
        return responder({})
    })
}

usuarios_model.listar_id = function(post, responder){
    myModel.find({email:post.email},{password:0, codigo:0,})
    .then((respuesta)=> {
        //Si se pone un console.log(respueta) se puede evidenciar el error en la consola, si llega a salir error
        return responder (respuesta)
    }).catch((error)=> {
        console.log(error)
        return responder ({})
    })
}

usuarios_model.activar = function(post, responder){
    myModel.updateOne({email:post.email, codigo:post.codigo},{
        estado:"Activo"
    }).then((respuesta)=> {
        return responder (respuesta)
        //Si se pone un console.log(respueta) se puede evidenciar el error en la consola, si llega a salir error
      
    }).catch((error)=> {
        console.log(error)
        return responder ({state:false})
    })
}

module.exports.usuarios_model = usuarios_model
        