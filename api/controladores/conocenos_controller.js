
var conocenos_model = require("../modelos/conocenos_model.js").conocenos_model
var conocenos_controller = {}

conocenos_controller.guardar = function(request, response){
    var post = {
        text_1:request.body.text_1,
        text_2:request.body.text_2
    }
   
    if(post.text_1 == undefined || post.text_1 == null || post.text_1 == ""){
        response.json({state:false, mensaje:"El campo ¿Quiénes somos? es obligatorio"})
        return false
    }

    if(post.text_2 == undefined || post.text_2 == null || post.text_2 == ""){
        response.json({state:false, mensaje:"El campo consejos es obligatorio"})
        return false
    }

    if(post.text_1.length > 4000 || post.text_2.length > 4000 ){
        response.json({mensaje:"La descripción no es validoa. Intente una más corta", state:false})
        return false
    }

    conocenos_model.listar(post, function(existe){
        if(existe.length == 0){
            conocenos_model.guardar(post, function(callback){
                if(callback.state == true){
                    response.json({state:true, mensaje:"Elemento guardado correctamente"})
                }
                else{
                    response.json({state:false, mensaje:"Error al momento de guardar el elemento"})
                }
            })
        } else{
            conocenos_model.actualizar(post, function(respuesta_2){
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


conocenos_controller.listar =function(request, response){
    conocenos_model.listar(null, function(respuesta){
        response.json(respuesta)
    })
}



module.exports.conocenos_controller = conocenos_controller