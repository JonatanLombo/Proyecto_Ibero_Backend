var servicios_model = require("../modelos/servicios_model.js").servicios_model
var servicios_controller = {}

servicios_controller.guardar = function(request, response){
    var post = {
        text_1:request.body.text_1,
    }
   
    if(post.text_1 == undefined || post.text_1 == null || post.text_1 == ""){
        response.json({state:false, mensaje:"El campo nuestro compromiso es obligatorio"})
        return false
    }

    if(post.text_1.length > 4000 ){
        response.json({mensaje:"La descripción no es valida. Intente una más corta", state:false})
        return false
    }

    servicios_model.listar(post, function(existe){
        if(existe.length == 0){
            servicios_model.guardar(post, function(callback){
                if(callback.state == true){
                    response.json({state:true, mensaje:"Elemento guardado correctamente"})
                }
                else{
                    response.json({state:false, mensaje:"Error al momento de guardar el elemento"})
                }
            })
        } else{
            servicios_model.actualizar(post, function(respuesta_2){
                if(respuesta_2.state == true){
                    response.json({state:true, mensaje:"Elemento actualizado correctamente"})
                }
                else{
                    response.json({state:false, mensaje:"Error al momento de actualizar el elemento"})
                }
            })

        }
    })
        
}


servicios_controller.listar =function(request, response){
    servicios_model.listar(null, function(respuesta){
        response.json(respuesta)
    })
}




module.exports.servicios_controller = servicios_controller