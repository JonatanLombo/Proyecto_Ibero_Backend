const { response } = require("express")

var usuarios_controller = require("./api/controladores/usuarios_controller.js").usuarios_controller

var soloAdmin = function(request, response, next){
    if(request.session.perfil == "Administrador"){
        next()
    }
    else{
        response.json({state:false, mensaje:"Esta Api solo la pueden utilizar los administradores"})
    }
}

//POST
// CADA VEZ SE USA POST SE DEBE CAPTURAR DATOS DE LA PETICIÓN CON .body SEGUIDO DEL NOMBRE DE LA VARIABLE .body.email
app.post("/usuarios/registrar", function(request, response){
    usuarios_controller.registrar(request, response)
})

app.post("/usuarios/activar", function(request, response){
    usuarios_controller.activar(request, response)
})

app.post("/usuarios/login", function(request, response){
    usuarios_controller.login(request, response)
})

//PUT
// CADA VEZ SE USA PUT SE DEBE CAPTURAR DATOS DE LA PETICIÓN CON .body SEGUIDO DEL NOMBRE DE LA VARIABLE .body.email
// Se requieren casi las mismas validaciones, solo es buscar por el identificador e indicar que datos se actualizan. Cambia el push
app.put("/usuarios/actualizar", soloAdmin, function(request, response){
    usuarios_controller.actualizar(request, response)
})


//DETELE
// CADA VEZ SE USA DELETE SE DEBE CAPTURAR DATOS DE LA PETICIÓN CON .body SEGUIDO DEL NOMBRE DE LA VARIABLE .body.email
// Se requieren casi las mismas validaciones, solo es buscar por el identificador y eliminar el mismo, los demás datos sobran. Cambia a splice
app.post("/usuarios/eliminar", soloAdmin, function(request, response){
    usuarios_controller.eliminar(request, response)
})


// Traer información
//GET
app.get("/usuarios/listar",soloAdmin, function(request, response){
    usuarios_controller.listar(request, response)
})

// Traer información especifica
//con POST para no exponer el id en la URL
app.post("/usuarios/listar_id",soloAdmin, function(request, response){
    usuarios_controller.listar_id(request, response)
})

app.post("/usuarios/estado", function(request, response){
    response.json(request.session)
})

app.post("/usuarios/logout", function(request, response){
    request.session.destroy()
    response.json({state:true, mensaje:"Sesión cerrada"})
})

// POST/GET/PUT/GET/DELETE es el CRUD 
// CREATE/READ/UPDATE/DELETE 

var productos_controller = require("./api/controladores/productos_controller.js").productos_controller

app.post("/productos/guardar",soloAdmin, function(request, response){
    productos_controller.guardar(request, response)
})

app.post("/productos/actualizar",soloAdmin, function(request, response){
    productos_controller.actualizar(request, response)
})

app.post("/productos/eliminar",soloAdmin, function(request, response){
    productos_controller.eliminar(request, response)
})

app.post("/productos/listar", function(request, response){
    productos_controller.listar(request, response)
})

app.post("/productos/listar_id", function(request, response){
    productos_controller.listar_id(request, response)
})

var plantas_controller = require("./api/controladores/plantas_controller.js").plantas_controller

app.post("/plantas/guardar",soloAdmin, function(request, response){
    plantas_controller.guardar(request, response)
})

app.post("/plantas/actualizar",soloAdmin, function(request, response){
    plantas_controller.actualizar(request, response)
})

app.post("/plantas/eliminar",soloAdmin, function(request, response){
    plantas_controller.eliminar(request, response)
})

app.post("/plantas/listar", function(request, response){
    plantas_controller.listar(request, response)
})

app.post("/plantas/listar_id", function(request, response){
    plantas_controller.listar_id(request, response)
})





var servicios_controller = require("./api/controladores/servicios_controller.js").servicios_controller

app.post("/servicios/guardar",soloAdmin, function(request, response){
    servicios_controller.guardar(request, response)
})

app.post("/servicios/actualizar",soloAdmin, function(request, response){
    servicios_controller.actualizar(request, response)
})

app.post("/servicios/eliminar",soloAdmin, function(request, response){
    servicios_controller.eliminar(request, response)
})

app.post("/servicios/listar", function(request, response){
    servicios_controller.listar(request, response)
})

app.post("/servicios/listar_id", function(request, response){
    servicios_controller.listar_id(request, response)
})

var archivos_controller = require("./api/controladores/archivos_controller.js").archivos_controller

app.post("/upload/:nombreArchivo",function(request, response){
    archivos_controller.upload (request, response)
})

app.post("/avatar/:nombreArchivo",function(request, response){
    archivos_controller.avatar (request, response)
})

app.post("/portada/:nombreArchivo",function(request, response){
    archivos_controller.portada (request, response)
})

app.post("/plantas/:nombreArchivo",function(request, response){
    archivos_controller.plantas (request, response)
})


var conocenos_controller = require("./api/controladores/conocenos_controller.js").conocenos_controller

app.post("/conocenos/guardar", function(request, response){
    conocenos_controller.guardar(request, response)
})

app.post("/conocenos/actualizar",function(request, response){
    conocenos_controller.actualizar(request, response)
})

app.post("/conocenos/listar", function(request, response){
    conocenos_controller.listar(request, response)
})

app.post("/conocenos/listar_id", function(request, response){
    conocenos_controller.listar_id(request, response)
})
