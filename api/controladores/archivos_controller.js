
var archivos_controller = {}
var multer = require("multer")

archivos_controller.upload = function(request, response){
    var upload = multer({
        storage:multer.diskStorage({
            destination:(request, file, callback) =>{
                callback(null, appRoot + '/imagenes/')
            },
            filename:(request, file, callback) =>{
                callback(null,request.params.nombreArchivo + '.png')
            }
        }),
        fileFilter:(request, file, callback) =>{
            var ext = path.extname(file.originalname)
            if(ext !== ".png" && ext !== ".jpg" && ext !== ".tif" && ext !== ".jpeg" && ext !== ".jfif"){
                callback("Solo se admiten adjuntos en formato de imagen",null)
            }
            else{
                callback(null,true)
            }
        }
    }).single("file")

    upload(request, response, function(error){
        if(error){
            console.log(error)
           response.json({state:false, mensaje:"Error al cargar el archivo", error:error}) 
        }
        else{
            response.json({state:true, mensaje:"Archivo cargado correctamente"})
        }
    })    


}

archivos_controller.avatar = function(request, response){
    var upload = multer({
        storage:multer.diskStorage({
            destination:(request, file, callback) =>{
                callback(null, appRoot + '/avatar/')
            },
            filename:(request, file, callback) =>{
                callback(null,request.params.nombreArchivo + '.png')
            }
        }),
        fileFilter:(request, file, callback) =>{
            var ext = path.extname(file.originalname)
            if(ext !== ".png" && ext !== ".jpg" && ext !== ".tif" && ext !== ".jpeg" && ext !== ".jfif"){
                callback("Solo se admiten adjuntos en formato de imagen",null)
            }
            else{
                callback(null,true)
            }
        }
    }).single("file")

    upload(request, response, function(error){
        if(error){
            console.log(error)
           response.json({state:false, mensaje:"Error al cargar el archivo", error:error}) 
        }
        else{
            response.json({state:true, mensaje:"Archivo cargado correctamente"})
        }
    })    

}

archivos_controller.portada = function(request, response){
    var portada = multer({
        storage:multer.diskStorage({
            destination:(request, file, callback) =>{
                callback(null, appRoot + '/portada/')
            },
            filename:(request, file, callback) =>{
                callback(null,request.params.nombreArchivo + '.png')
            }
        }),
        fileFilter:(request, file, callback) =>{
            var ext = path.extname(file.originalname)
            if(ext !== ".png" && ext !== ".jpg" && ext !== ".tif" && ext !== ".jpeg" && ext !== ".jfif"){
                callback("Solo se admiten adjuntos en formato de imagen",null)
            }
            else{
                callback(null,true)
            }
        }
    }).single("file")

    portada(request, response, function(error){
        if(error){
            console.log(error)
           response.json({state:false, mensaje:"Error al cargar el archivo", error:error}) 
        }
        else{
            response.json({state:true, mensaje:"Archivo cargado correctamente"})
        }
    })    

}

archivos_controller.plantas = function(request, response){
    var plantas = multer({
        storage:multer.diskStorage({
            destination:(request, file, callback) =>{
                callback(null, appRoot + '/plantas/')
            },
            filename:(request, file, callback) =>{
                callback(null,request.params.nombreArchivo + '.png')
            }
        }),
        fileFilter:(request, file, callback) =>{
            var ext = path.extname(file.originalname)
            if(ext !== ".png" && ext !== ".jpg" && ext !== ".tif" && ext !== ".jpeg" && ext !== ".jfif"){
                callback("Solo se admiten adjuntos en formato de imagen",null)
            }
            else{
                callback(null,true)
            }
        }
    }).single("file")

    plantas(request, response, function(error){
        if(error){
            console.log(error)
           response.json({state:false, mensaje:"Error al cargar el archivo", error:error}) 
        }
        else{
            response.json({state:true, mensaje:"Archivo cargado correctamente"})
        }
    })    

}

archivos_controller.macetas = function(request, response){
    var macetas = multer({
        storage:multer.diskStorage({
            destination:(request, file, callback) =>{
                callback(null, appRoot + '/macetas/')
            },
            filename:(request, file, callback) =>{
                callback(null,request.params.nombreArchivo + '.png')
            }
        }),
        fileFilter:(request, file, callback) =>{
            var ext = path.extname(file.originalname)
            if(ext !== ".png" && ext !== ".jpg" && ext !== ".tif" && ext !== ".jpeg" && ext !== ".jfif"){
                callback("Solo se admiten adjuntos en formato de imagen",null)
            }
            else{
                callback(null,true)
            }
        }
    }).single("file")

    macetas(request, response, function(error){
        if(error){
            console.log(error)
           response.json({state:false, mensaje:"Error al cargar el archivo", error:error}) 
        }
        else{
            response.json({state:true, mensaje:"Archivo cargado correctamente"})
        }
    })    

}



module.exports.archivos_controller = archivos_controller