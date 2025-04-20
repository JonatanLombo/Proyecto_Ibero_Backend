
var plantas_model = require("../modelos/plantas_model.js").plantas_model
var plantas_controller = {}

plantas_controller.guardar = function(request, response){
    var post = {
        codigo:request.body.codigo,
        nombre:request.body.nombre,
        imagen:request.body.imagen,
        precio:request.body.precio,
        descripcion:request.body.descripcion,
        beneficios:request.body.beneficios,
        recomendaciones:request.body.recomendaciones

    }
   
    if(post.codigo == undefined || post.codigo == null || post.codigo == ""){
        response.json({state:false, mensaje:"El campo código es obligatorio"})
        return false
    }

    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje:"El campo nombre es obligatorio"})
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

    if(post.beneficios == undefined || post.beneficios == null || post.beneficios == ""){
        response.json({state:false, mensaje:"El campo beneficios es obligatorio"})
        return false
    }

    if(post.recomendaciones == undefined || post.recomendaciones == null || post.recomendaciones == ""){
        response.json({state:false, mensaje:"El campo recomendaciones es obligatorio"})
        return false
    }

    if(post.nombre.length > 30){
        response.json({mensaje:"El nombre no es valido. Intente un nombre más corto", state:false})
        return false
    }

    if(post.descripcion.length > 2400){
        response.json({mensaje:"La descripción no es valido. Intente un texto más corto", state:false})
        return false
    }

    if(post.beneficios.length > 2400){
        response.json({mensaje:"Los beneficios no son validos. Intente un texto más corto", state:false})
        return false
    }

    if(post.recomendaciones.length > 2400){
        response.json({mensaje:"Las recomendaciones no son validas. Intente un texto más corto", state:false})
        return false
    }


    plantas_model.validarCodigo(post, function(respuesta){
    
        if(respuesta.length == 0){    
            plantas_model.guardar(post, function(respuesta_2){
            if(respuesta_2.state == true){
                response.json({state:true, mensaje:"Elemento guardado correctamente, recuerda actualizar la imagen de la planta"})
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

plantas_controller.actualizar =function(request, response){
    var post = {
        _id:request.body._id,
        nombre:request.body.nombre,
        imagen:request.body.imagen,
        precio:request.body.precio,
        descripcion:request.body.descripcion,
        recomendaciones:request.body.recomendaciones,
        beneficios:request.body.beneficios,
    }
   
    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje:"El campo _id es obligatorio"})
        return false
    }

    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje:"El campo nombre es obligatorio"})
        return false
    }

    if(post.descripcion == undefined || post.descripcion == null || post.descripcion == ""){
        response.json({state:false, mensaje:"El campo descripción es obligatorio"})
        return false
    }

    if(post.beneficios == undefined || post.beneficios == null || post.beneficios == ""){
        response.json({state:false, mensaje:"El campo beneficios es obligatorio"})
        return false
    }

    if(post.nombre.length > 30){
        response.json({mensaje:"El nombre no es valido. Intente un nombre más corto", state:false})
        return false
    }

    if(post.descripcion.length > 2400){
        response.json({mensaje:"La descripción no es valido. Intente un texto más corto", state:false})
        return false
    }

    if(post.beneficios.length > 2400){
        response.json({mensaje:"Los beneficios no son validos. Intente un texto más corto", state:false})
        return false
    }

    if(post.recomendaciones.length > 2400){
        response.json({mensaje:"Las recomendaciones no son validas. Intente un texto más corto", state:false})
        return false
    }
    

            plantas_model.actualizar(post, function(respuesta_2){
            if(respuesta_2.state == true){
                response.json({state:true, mensaje:"Elemento actualizado correctamente"})
            }
            else{
                response.json({state:false, mensaje:"Error al momento de actualizar el elemento"})
            }
        })
}

plantas_controller.eliminar =function(request, response){
    var post = {
        _id:request.body._id,
    }
   
    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje:"El campo _id es obligatorio"})
        return false
    }

            plantas_model.eliminar(post, function(respuesta_2){
            if(respuesta_2.state == true){
                response.json({state:true, mensaje:"Elemento eliminado correctamente"})
            }
            else{
                response.json({state:false, mensaje:"Error al momento de eliminar el elemento"})
            }
        }) 
}

plantas_controller.listar =function(request, response){
    plantas_model.listar(null, function(respuesta){
        response.json(respuesta)
    })
}

plantas_controller.listar_id =function(request, response){
    var post = {
        _id:request.body._id
    }
   
    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje:"El campo _id es obligatorio"})
        return false
    }

    plantas_model.listar_id(post, function(respuesta){
        response.json(respuesta)
    })  
}

plantas_controller.generarXLS =function(request, response){
    plantas_model.listar(null, function(respuesta){
       var json = respuesta.map(({_doc})=>{
        const {__v, ...rest} = _doc;
        return rest;
       }) 
       var xls = json2xls(json)
       fs.writeFileSync("plantas.xlsx",xls,'binary')
       response.download('plantas.xlsx', function(error){
        if(error){
            console.log(error)
        }
        else{
            console.log("Descarga completa")
            fs.unlinkSync("plantas.xlsx")
        }
       })
    })
}

plantas_controller.generarPDF =function(request, response){
    plantas_model.listar(null, function(respuesta){
        const doc = new documentoPDF()
        var writeStream = fs.createWriteStream("plantas.pdf")
        doc.pipe(writeStream)

        doc.fontSize(14).text("Lista de plantas",240,70)
        doc.fontSize(10).text("Código",80,100)
        doc.fontSize(10).text("Nombre",150,100)
        doc.fontSize(10).text("Precio",250,100)
        doc.fontSize(10).text("Descripción",320,100)

        for (let a = 0; a < respuesta.length; a++) {
            doc.fontSize(10).text(respuesta[a].codigo,80,120 +a *146)
            doc.fontSize(10).text(respuesta[a].nombre,150,120 +a *146)
            doc.fontSize(10).text(respuesta[a].precio,250,120 +a *146)
            doc.fontSize(10).text(respuesta[a].descripcion,320,120 +a *146)

        if(a == respuesta.length - 1){
            doc.end();
            writeStream.on("finish", function(){    
                console.log("Archivo finalizado")
                response.download('plantas.pdf', function(error){
                if(error){
                    console.log(error)
                }
                else{
                    console.log("Descarga completa")
                    fs.unlinkSync("plantas.pdf")
                }
            })
          
            })   
        }   
    }
})

}


module.exports.plantas_controller = plantas_controller