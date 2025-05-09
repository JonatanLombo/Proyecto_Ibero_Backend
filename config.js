var config = {
    email:{},
    sesiones:{}
}

// config.urlReal = "proyecto.llelou.space"
config.urlReal = "http://localhost:3000"
config.puerto_express = 3000
config.test = "final_test"
config.bd = "proyecto_mundplant"

// config.bd = "BackendBit" //nombre bd mongo
// config.bdUser = "adminBit"
// config.bdPass = "admin123"
// config.bdIp = "128.199.8.32"
// config.bdPort = "27017"

config.secret = "jvnadvg54av66465v5sdvfCF5Gdferfv<avad%%&($W%QW%45R4HGRASsdgfjd__ytvsev4"

config.email.host = "smtp.gmail.com"
config.email.port = 587
config.email.user = "lombojonatan@gmail.com"
config.email.pass = "mjzygxeqjpdwfutn"

config.sesiones.secret = "vgswdfyulvcabgdfsdvcbcgciaq"
config.sesiones.expiracion = 60000 * 30

config.listaBlanca = [
    "http://localhost:4200",
    "http://localhost:9876",
    "http://localhost:3000"   
]


module.exports.config = config