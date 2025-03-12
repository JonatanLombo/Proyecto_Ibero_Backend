// se debe descargar el paquete en node de body para que funcionen los get npm i express
var express = require("express")
global.app = express()
var config = require("./config.js").config
global.sha256 = require("sha256")
const cors = require("cors")
const session= require("express-session")
global.multer = require("multer")
global.path = require("path")
global.appRoot = path.resolve(__dirname)

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

app.use(session({
    secret:config.sesiones.secret,
    resave:true,
    saveUninitialized:true,
    cookie:{
        maxAge:config.sesiones.expiracion,
        httpOnly:true
    },
    name:"CookieApp",
    rolling:true
}))


require("./rutas.js")

app.use("/portada", express.static(__dirname + "/portada"))
app.use("/plantas", express.static(__dirname + "/plantas"))
app.use("/macetas", express.static(__dirname + "/macetas"))
app.use("/avatar", express.static(__dirname + "/avatar"))
app.use("/imagenes", express.static(__dirname + "/imagenes"))
app.use("/", express.static(__dirname + "/pagina"))


app.listen(config.puerto_express, function(){
    console.log("Servidor funcionando por el puerto " + config.puerto_express);    
})

