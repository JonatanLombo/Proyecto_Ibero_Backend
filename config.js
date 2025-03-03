var config = {
    email:{},
    sesiones:{}
}

config.puerto_express = 3000
config.bd = "final_proyect"
config.secret = "jvnadvg54av66465v5sdvfCF5Gdferfv<avad%%&($W%QW%45R4HGRASsdgfjd__ytvsev4"

config.email.host = "smtp.gmail.com"
config.email.port = 587
config.email.user = "lombojonatan@gmail.com"
config.email.pass = "mjzygxeqjpdwfutn"

config.sesiones.secret = "vgswdfyulvcabgdfsdvcbcgciaq"
config.sesiones.expiracion = 60000 * 30

config.listaBlanca = [
    "http://localhost:4200"
]


module.exports.config = config