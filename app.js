// se debe descargar el paquete en node de body para que funcionen los get npm i express
var express = require("express")
global.app = express()
var config = require("./config.js").config
global.sha256 = require("sha256")
const cors = require("cors")

// se debe descargar el paquete en node de body para que funcionen los post npm i body-parser
var body_parser = require("body-parser")
app.use(body_parser.json())
app.use(body_parser.urlencoded({extended:true}))
var mongoose = require("mongoose")

app.all('*',function(req, res, next){

    var whitelist = req.headers.origin;
    res.header('Access-Control-Allow-Origin', whitelist);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,HEAD');
    res.header('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.header("Access-Control-Allow-Credentials", "true");

    next();

});


require("./rutas.js")

mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.8/" + config.bd).then((respuesta) => {
    console.log("Conexión exitosa a Mongo")
}).catch((error) => {
    console.log(error)
})

app.use(cors({
    origin: function(origin, callback){
        console.log(origin)
        if(!origin) return callback(null, true)
        if(config.listaBlanca.indexOf(origin)===-1){
            return callback("error cors sin permiso", false)
        }    
        else{
            return  callback(null,true)
        }
    }
}))

// API (Interfaz de programación de aplicaciones) Es el intermediario entre backend y frontend y si se presentan errores se reportan
// Las API regresan datos en formatro JSON
// Un ejemplo son los mensajes que aparecen al momento de hacer un registro en donde dice que falta un dato por diligenciar

//Metodos para peticiones

// Get: Trae información.  Envía información a tráves de la URL
// Post: Crear información 
// Put: Hacer modificaciones en los datos
// Delete: Borrar información

app.use("/", express.static(__dirname + "/pagina"))


app.listen(config.puerto_express, function(){
    console.log("Servidor funcionando por el puerto " + config.puerto_express);    
})

// MVC  MODELO, VISTA, CONTROLADOR
// MODELO ES EL SISTEMA DE ACTUALIZA, CREA Y DEMÁS
// VISTA ES LA PARTE GRAFICA O LA IDEA QUE SE TIENE DE HACER ALGO 
// CONTROLADOR ES EL QUE VALIDA QUE LA INFORMACIÓN ESTE DILIGENCIADA SEA CORRECTA Y CUMPLA CON LOS CRITERIOS 