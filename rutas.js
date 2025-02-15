var usuarios_controller = require("./api/controladores/usuarios_controller.js").usuarios_controller

//POST
// CADA VEZ SE USA POST SE DEBE CAPTURAR DATOS DE LA PETICIÓN CON .body SEGUIDO DEL NOMBRE DE LA VARIABLE .body.email
app.post("/usuarios/registrar", function(request, response){
    usuarios_controller.registrar(request, response)
})

app.get("/usuarios/activar/:email/:codigo", function(request, response){
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
app.delete("/usuarios/eliminar", function(request, response){
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