var datos = []

var cargarTodo = function(){

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        datos = JSON.parse(this.responseText).datos

        var datosTabla = document.getElementById("datosTabla")
        datosTabla.innerHTML = ""
        for (let a = 0; a < datos.length; a++) {
        datosTabla.innerHTML += `<tr>
                                    <td>${datos[a].nombre}</td>
                                    <td>${datos[a].apellido}</td>
                                    <td>${datos[a].email}</td>
                                    <td>${datos[a].password}</td>
                                </tr>`
            
        }

        
    }
    });

    xhr.open("GET", "http://localhost:3000/usuarios/listar");

    xhr.send();

}

var abrirModal = function(){
    $('#exampleModal').modal('show')
}

var guardar = function(){
    var nombre = document.getElementById("nombre").value
    var apellido = document.getElementById("apellido").value
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value

    var data = `nombre=${nombre}&apellido=${apellido}&email=${email}&password=${password}`;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        var miRespuesta = JSON.parse(this.responseText);
        if(miRespuesta.state == false){
            Swal.fire({
                title: 'Lo siento',
                text: miRespuesta.mensaje,
                icon: 'error',
              })
        }
        else{
            Swal.fire({
                title: '¡Genial!',
                text: miRespuesta.mensaje,
                icon: 'success',
              })
              $('#exampleModal').modal('hide')
              cargarTodo()
        }
    }
    });

    xhr.open("POST", "http://localhost:3000/usuarios/registrar");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.send(data);
}


cargarTodo()