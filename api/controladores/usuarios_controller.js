var usuarios_model = require("../modelos/usuarios_model.js").usuarios_model
var config = require("../../config.js").config
var usuarios_controller = {}
const { text } = require("body-parser")
var nodemailer = require("nodemailer")

usuarios_controller.registrar = function(request, response){
    
    var post = {
        email: request.body.email,
        nombre: request.body.nombre,
        apellido: request.body.apellido,
        password: request.body.password
    }

    if(post.email == "" || post.email == undefined || post.email == null){
        response.json({mensaje:"El campo email es obligatorio", state:false}) 
    }

    if(post.nombre == "" || post.nombre == undefined || post.nombre == null){
        response.json({mensaje:"El campo nombre es obligatorio", state:false}) 
    }

    if(post.apellido == "" || post.apellido == undefined || post.apellido == null){
        response.json({mensaje:"El campo apellido es obligatorio", state:false}) 
    }
    
    if(post.password == "" || post.password == undefined || post.password == null){
        response.json({mensaje:"El campo password es obligatorio", state:false}) 
    }

    // Se validan las expresiones regulares para identificar si el correo está correcto y cumple con la escructura
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if(regex.test(post.email) == false){
        response.json({mensaje:"El email no es valido, intente nuevamente", state:false})
        return false
    }
    
    if(post.nombre.length < 3){
        response.json({mensaje:"El nombre no es valido. es muy corto", state:false})
        return false
    }
    
    if(post.nombre.length > 20){
        response.json({mensaje:"El nombre no es valido. es muy largo", state:false})
        return false
    }

    if(post.apellido.length < 3){
        response.json({mensaje:"El apellido no es valido. es muy corto", state:false})
        return false
    }
    
    if(post.apellido.length > 20){
        response.json({mensaje:"El apellido no es valido. es muy largo", state:false})
        return false
    }

    post.password = sha256(post.password + config.secret)

    var letras = ["A", "E", "I", "N", "P", "S", "Y"]
    var posicionLetras = Math.floor(Math.random() * (6 - 0) + 0)    
    var miCodigo = letras[posicionLetras] + "-" + Math.floor(Math.random() * (9999 - 1000) + 1000)
    post.codigo = miCodigo
    post.estado = "Inactivo"

    usuarios_model.ver_posicion_email(post, function(existe){
        if(existe == null){
            usuarios_model.registrar(post, function(respuesta){
                if(respuesta.state == true){
                    //El que envía el correo
                    const transporter = nodemailer.createTransport({
                        host:config.email.host,
                        port:config.email.port,
                        secure:false,
                        requireTLS:true,
                        auth:{
                           user:config.email.user,
                           pass:config.email.pass 
                        }
                    })
                    // La estructura del correo
                    var mailOptions = {
                        from:config.email.user,
                        to:post.email,
                        subject:"Activar cuenta con el código " + post.codigo,
                        html: `<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
                               
                                <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">                                                       
                                <h2 style="text-align: center; color: #333333;">Activación de Cuenta</h2>                                
                                <p style="font-size: 16px; color: #555555; text-align: center;">
                                    Estimado usuario, por favor haga clic en el siguiente enlace para activar su cuenta.
                                </p>
                                
                                <form action="#" method="post" style="display: flex; flex-direction: column; align-items: center;">
                                    <div style="margin-bottom: 15px; width: 100%; max-width: 400px;">
                                        <label for="email" style="font-size: 14px; color: #555555; margin-bottom: 5px;">email</label>
                                        <input type="email" id="email" name="email" value="${post.email}" style="width: 100%; padding: 10px; border-radius: 4px; border: 1px solid #ccc; font-size: 14px; color: #333333;">
                                    </div>
                                    
                                    <div style="margin-bottom: 15px; width: 100%; max-width: 400px;">
                                        <label for="codigo" style="font-size: 14px; color: #555555; margin-bottom: 5px;">Código</label>
                                        <input type="text" id="codigo" name="codigo" value="${post.codigo}" style="width: 100%; padding: 10px; border-radius: 4px; border: 1px solid #ccc; font-size: 14px; color: #333333;">
                                    </div>
                                    
                                    <div style="margin-bottom: 20px;">
                                        <a href="http://localhost:3000/usuarios/activar/${post.email}/${post.codigo}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-size: 16px; text-align: center;">
                                            Activar Cuenta
                                        </a>
                                    </div>
                                </form>
                                
                                <p style="font-size: 14px; color: #777777; text-align: center;">
                                    Si no solicitó esta activación, ignore este mensaje.
                                </p>
                            </div>
                        </body>`
                    }

                    //Envío del correo
                    transporter.sendMail(mailOptions, (error, info) => {
                        if(error){
                            console.log(error)
                        }
                        else{
                            console.log(info)
                        }
                    })    



                    response.json({state:true, mensaje:"Usuario guardado correctamente"})
                }
                else{
                    response.json({state:false, mensaje:"Se presentó un error al guardar el usuario"})
                }
            })
        }
        else{
            response.json({state:false, mensaje:"Este correo ya se encuentra registrado"})   
        }
    }) 
   
}

usuarios_controller.login = function(request, response){
    
    var post = {
        email: request.body.email,
        password: request.body.password
    }

    if(post.email == "" || post.email == undefined || post.email == null){
        response.json({mensaje:"El campo email es obligatorio", state:false}) 
    }
    
    if(post.password == "" || post.password == undefined || post.password == null){
        response.json({mensaje:"El campo password es obligatorio", state:false}) 
    }

    // Se validan las expresiones regulares para identificar si el correo está correcto y cumple con la escructura
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if(regex.test(post.email) == false){
        response.json({mensaje:"El email no es valido, intente nuevamente", state:false})
        return false
    }

    post.password = sha256(post.password + config.secret)

    usuarios_model.login(post, function(respuesta){
        if(respuesta.length == 0){
            response.json({state:false, mensaje:"Credenciales invalidas"})
        }
        else
        {
            if(respuesta[0].estado == "Inactivo"){
                response.json({state:false, mensaje:"Por favor active la cuenta con el código de su correo electronico"})
            }
            else
            {            
            response.json({state:true, mensaje:"Bienvenido: " + respuesta[0].nombre + " " + respuesta[0].apellido})
            }
        }
    })
   
}

usuarios_controller.actualizar = function(request, response){
    
    var post = {
        email: request.body.email,
        nombre: request.body.nombre,
        apellido: request.body.apellido,
    }

    if(post.email == "" || post.email == undefined || post.email == null){
        response.json({mensaje:"El campo email es obligatorio", state:false}) 
    }

    if(post.nombre == "" || post.nombre == undefined || post.nombre == null){
        response.json({mensaje:"El campo nombre es obligatorio", state:false}) 
    }

    if(post.apellido == "" || post.apellido == undefined || post.apellido == null){
        response.json({mensaje:"El campo apellido es obligatorio", state:false}) 
    }    

    // Se validan las expresiones regulares para identificar si el correo está correcto y cumple con la escructura
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if(regex.test(post.email) == false){
        response.json({mensaje:"El email no es valido, intente nuevamente", state:false})
        return false
    }
    
    if(post.nombre.length < 3){
        response.json({mensaje:"El nombre no es valido. es muy corto", state:false})
        return false
    }
    
    if(post.nombre.length > 20){
        response.json({mensaje:"El nombre no es valido. es muy largo", state:false})
        return false
    }

    if(post.apellido.length < 3){
        response.json({mensaje:"El apellido no es valido. es muy corto", state:false})
        return false
    }
    
    if(post.apellido.length > 20){
        response.json({mensaje:"El apellido no es valido. es muy largo", state:false})
        return false
    }
        
    usuarios_model.ver_posicion_email(post, function(respuesta){
        if(respuesta == null){
            response.json({mensaje: "El email no existe en la base de datos", state:false})
            return false
        }
        else{
            usuarios_model.actualizar(post, function(respuesta_2){
                if(respuesta_2.state == true){
                    response.json({mensaje:"Usuario actualizado correctamente", state:true})
                }
                else{
                    response.json({mensaje:"Se presento un error al actualizar la información", state:false})
                }
            })
        }
    })   
}

usuarios_controller.eliminar = function(request, response){
   
    var post = {
        email: request.body.email
    }

    if(post.email == "" || post.email == undefined || post.email == null){
        response.json({mensaje:"El campo email es obligatorio", state:false}) 
    }
    
    // Se validan las expresiones regulares para identificar si el correo está correcto y cumple con la escructura
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if(regex.test(post.email) == false){
        response.json({mensaje:"El email no es valido, intente nuevamente", state:false})
        return false
    }
    
    usuarios_model.ver_posicion_email(post, function(respuesta){
    
    if(respuesta == null){
        response.json({mensaje:"El email no existe en la base de datos", state:false})
        return false
    }
    else{
        usuarios_model.eliminar(post, function(respuesta){
            response.json({mensaje:"Usuario eliminado correctamente", state:true}) 
        })        
    }
})   
}

usuarios_controller.listar = function(request, response){
    usuarios_model.listar(null, function(respuesta){
        response.json({respuesta})
    })
  
}

usuarios_controller.listar_id = function(request, response){
    
    var post = {
        email: request.body.email
    }

    if(post.email == "" || post.email == undefined || post.email == null){
        response.json({mensaje:"El campo email es obligatorio", state:false}) 
    }
    
    // Se validan las expresiones regulares para identificar si el correo está correcto y cumple con la escructura
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if(regex.test(post.email) == false){
        response.json({mensaje:"El email no es valido, intente nuevamente", state:false})
        return false
    }
            
    usuarios_model.ver_posicion_email(post, function(respuesta){
        if(respuesta== null){
            response.json({mensaje:"El email no existe en la base de datos", state:false})
            return false
        }
        else{
            usuarios_model.listar_id(post, function(respuesta){
                response.json(respuesta)
            })
        }
    })
  
}

usuarios_controller.activar = function(request, response){
    var post = {
        email: request.params.email,
        codigo: request.params.codigo
    }

    if(post.email == "" || post.email == undefined || post.email == null){
        response.json({mensaje:"El campo email es obligatorio", state:false}) 
    }

    if(post.codigo == "" || post.codigo == undefined || post.codigo == null){
        response.json({mensaje:"El campo nombre es obligatorio", state:false}) 
    }

    usuarios_model.activar(post, function(res){
        if(res.modifiedCount == 0){
            response.json({state:false, mensaje:"Error al activar la cuenta, verifique los datos"})
        }
        else{
            response.json({state:false, mensaje:"Cuenta activada correctamente, dirijase al login"})
        }
    })
}

module.exports.usuarios_controller = usuarios_controller