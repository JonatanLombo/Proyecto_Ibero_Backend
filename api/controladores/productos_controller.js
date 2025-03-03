
var productos_model = require("../modelos/productos_model.js").productos_model
var productos_controller = {}

productos_controller.guardar = function(request, response){
    var post = {
        codigo:request.body.codigo,
        nombre:request.body.nombre,
        imagen:request.body.imagen,
        precio:request.body.precio,
        descripcion:request.body.descripcion
    }
   
    if(post.codigo == undefined || post.codigo == null || post.codigo == ""){
        response.json({state:false, mensaje:"El campo código es obligatorio"})
        return false
    }

    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje:"El campo nombre es obligatorio"})
        return false
    }

    if(post.imagen == undefined || post.imagen == null || post.imagen == ""){
        response.json({state:false, mensaje:"El campo imagen es obligatorio"})
        return false
    }

    if(post.precio == undefined || post.precio == null || post.precio == ""){
        response.json({state:false, mensaje:"El campo precio es obligatorio"})
        return false
    }
    
    if(post.descripcion == undefined || post.descripcion == null || post.descripcion == ""){
        response.json({state:false, mensaje:"El campo descripción es obligatorio"})
        return false
    }

    if(post.nombre.length > 30){
        response.json({mensaje:"El nombre no es valido. Intente un nombre más corto", state:false})
        return false
    }

    productos_model.validarCodigo(post, function(respuesta){
    
        if(respuesta.length == 0){    
            productos_model.guardar(post, function(respuesta_2){
            if(respuesta_2.state = true){
                response.json({state:true, mensaje:"Elemento guardado correctamente"})
            }
            else{
                response.json({state:false, mensaje:"Error al momento de guardar el elemento"})
            }
        })
    }
        else{
            response.json({state:false, mensaje:"El código de este elemento ya existe"})
        }
    })
}

productos_controller.actualizar =function(request, response){
    var post = {
        _id:request.body._id,
        nombre:request.body.nombre,
        imagen:request.body.imagen,
        precio:request.body.precio,
        descripcion:request.body.descripcion
    }
   
    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje:"El campo _id es obligatorio"})
        return false
    }

    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje:"El campo nombre es obligatorio"})
        return false
    }

    if(post.nombre.length > 30){
        response.json({mensaje:"El nombre no es valido. Intente un nombre más corto", state:false})
        return false
    }

            productos_model.actualizar(post, function(respuesta_2){
            if(respuesta_2.state = true){
                response.json({state:true, mensaje:"Elemento actualizado correctamente"})
            }
            else{
                response.json({state:false, mensaje:"Error al momento de actualizar el elemento"})
            }
        })
}

productos_controller.eliminar =function(request, response){
    var post = {
        _id:request.body._id,
    }
   
    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje:"El campo _id es obligatorio"})
        return false
    }

            productos_model.eliminar(post, function(respuesta_2){
            if(respuesta_2.state = true){
                response.json({state:true, mensaje:"Elemento eliminado correctamente"})
            }
            else{
                response.json({state:false, mensaje:"Error al momento de eliminar el elemento"})
            }
        }) 
}

productos_controller.listar =function(request, response){
    productos_model.listar(null, function(respuesta){
        response.json(respuesta)
    })
}

productos_controller.listar_id =function(request, response){
    var post = {
        _id:request.body._id
    }
   
    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje:"El campo _id es obligatorio"})
        return false
    }

    productos_model.listar_id(post, function(respuesta){
        response.json(respuesta)
    })  
}




module.exports.productos_controller = productos_controller