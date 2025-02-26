var usuarios_controller = require("./api/controladores/usuarios_controller.js").usuarios_controller

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
app.put("/usuarios/actualizar", function(request, response){
    usuarios_controller.actualizar(request, response)
})


//DETELE
// CADA VEZ SE USA DELETE SE DEBE CAPTURAR DATOS DE LA PETICIÓN CON .body SEGUIDO DEL NOMBRE DE LA VARIABLE .body.email
// Se requieren casi las mismas validaciones, solo es buscar por el identificador y eliminar el mismo, los demás datos sobran. Cambia a splice
app.post("/usuarios/eliminar", function(request, response){
    usuarios_controller.eliminar(request, response)
})


// Traer información
//GET
app.get("/usuarios/listar", function(request, response){
    usuarios_controller.listar(request, response)
})

// Traer información especifica
//con POST para no exponer el id en la URL
app.post("/usuarios/listar_id", function(request, response){
    usuarios_controller.listar_id(request, response)
})
// POST/GET/PUT/GET/DELETE es el CRUD 
// CREATE/READ/UPDATE/DELETE 

var productos_controller = require("./api/controladores/productos_controller.js").productos_controller

app.post("/productos/guardar", function(request, response){
    productos_controller.guardar(request, response)
})

app.post("/productos/actualizar", function(request, response){
    productos_controller.actualizar(request, response)
})

app.post("/productos/eliminar", function(request, response){
    productos_controller.eliminar(request, response)
})

app.post("/productos/listar", function(request, response){
    productos_controller.listar(request, response)
})

app.post("/productos/listar_id", function(request, response){
    productos_controller.listar_id(request, response)
})


var servicios_controller = require("./api/controladores/servicios_controller.js").servicios_controller

app.post("/servicios/guardar", function(request, response){
    servicios_controller.guardar(request, response)
})

app.post("/servicios/actualizar", function(request, response){
    servicios_controller.actualizar(request, response)
})

app.post("/servicios/eliminar", function(request, response){
    servicios_controller.eliminar(request, response)
})

app.post("/servicios/listar", function(request, response){
    servicios_controller.listar(request, response)
})

app.post("/servicios/listar_id", function(request, response){
    servicios_controller.listar_id(request, response)
})