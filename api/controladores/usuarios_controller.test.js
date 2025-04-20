const usuarios_controller = require("./usuarios_controller").usuarios_controller
var mongoose = require("mongoose")
var config = require("../../config").config
var usuarios_model = require("../../api/modelos/usuarios_model.js").usuarios_model
global.sha256 = require("sha256")


describe("post:/usuarios/registrar", () =>{
  let request, response;
  
  beforeAll((done) =>{

    mongoose.connect("mongodb://127.0.0.1:27017/" + config.test).then((respuesta) => {
        //console.log("Conexión exitosa a Mongo")
    }).catch((error) => {
        //console.log(error)
    })

    done()
  })

  beforeEach(()=>{
    request = {body:{}}
    response = {
        json: jest.fn()
    }
  })

  test("Debe fallar cuando el email no esta presente",(done)=>{
    // Confirguración request
    request.body ={}
    usuarios_controller.registrar(request, response)

    expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo email es obligatorio"})
    done()
  })

  test("Debe fallar cuando el nombre no esta presente",(done)=>{
    // Confirguración request
    request.body ={email:"jonatan@gmail.com"}
    usuarios_controller.registrar(request, response)

    expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo nombre es obligatorio"})
    done()
  })
  
  test("Debe fallar cuando el apellido no esta presente",(done)=>{
    // Confirguración request
    request.body ={email:"jonatan@gmail.com", nombre:"Jonatan"}
    usuarios_controller.registrar(request, response)

    expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo apellido es obligatorio"})
    done()
  })

  test("Debe fallar cuando el password no esta presente",(done)=>{
    // Confirguración request
    request.body ={email:"jonatan@gmail.com", nombre:"Jonatan", apellido:"Lombo"}
    usuarios_controller.registrar(request, response)

    expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo password es obligatorio"})
    done()
  })

  test("Debe fallar cuando el campo email no sea valido",(done)=>{
    // Confirguración request
    request.body ={email:"jonatan.com", nombre:"Jonatan", apellido:"Lombo", password:123456}
    usuarios_controller.registrar(request, response)

    expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El email no es valido, intente nuevamente"})
    done()
  })   

  test("Debe fallar cuando el nombre sea menor de 3",(done)=>{
    // Confirguración request
    request.body ={email:"jonatan@gmail.com", nombre:"jl", apellido:"Lombo", password:123456}
    usuarios_controller.registrar(request, response)

    expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El nombre no es valido. es muy corto"})
    done()
  })  

  test("Debe fallar cuando el nombre sea mayor de 20",(done)=>{
    // Confirguración request
    request.body ={email:"jonatan@gmail.com", nombre:"lalalalalalalalalalalalalalalala", apellido:"Lombo", password:123456}
    usuarios_controller.registrar(request, response)

    expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El nombre no es valido. es muy largo"})
    done()
  })    

  test("Debe fallar cuando el apellido sea menor de 3",(done)=>{
    // Confirguración request
    request.body ={email:"jonatan@gmail.com", nombre:"Jonatan", apellido:"Lm", password:123456}
    usuarios_controller.registrar(request, response)

    expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El apellido no es valido. es muy corto"})
    done()
  })  

  test("Debe fallar cuando el apellido sea mayor de 20",(done)=>{
    // Confirguración request
    request.body ={email:"jonatan@gmail.com", nombre:"Jonatan", apellido:"lalalalalalalalalalalalalalalala", password:123456}
    usuarios_controller.registrar(request, response)

    expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El apellido no es valido. es muy largo"})
    done()
  }) 

  test("Borrado",(done)=>{
    usuarios_model.myModel.deleteMany({}).then((respuesta)=>{
        setTimeout(()=>{
            expect("ok").toBe("ok")
            done()
        },60)  
      })
  })

  test("Debe guardar un usuario",(done)=>{
    // Confirguración request
    request.body = {email:"jonatan@gmail.com", nombre:"Jonatan", apellido:"Lombo", password:123456}    
    usuarios_controller.registrar(request, response)

    setTimeout(()=>{
        expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Usuario guardado correctamente, active su cuenta con el código envíado al correo electronico"})
        done()
    },100)  
  })

  test("Debe fallar cuando el usuario ya exista",(done)=>{
    // Confirguración request
    request.body = {email:"jonatan@gmail.com", nombre:"Jonatan", apellido:"Lombo", password:123456}    
    usuarios_controller.registrar(request, response)

    setTimeout(()=>{
        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"Este correo ya se encuentra registrado"})
        done()
    },60)  
  })

  test("Borrado",(done)=>{
    usuarios_model.myModel.deleteMany({}).then((respuesta)=>{
        setTimeout(()=>{
            expect("ok").toBe("ok")
            done()
        },60)  
      })
    })
    
  afterAll(()=>{
    usuarios_model.myModel.deleteMany({}).then((respuesta)=>{})
  })

})

describe("post:/usuarios/login", () =>{
    let request, response;
    
    beforeAll((done) =>{
  
      mongoose.connect("mongodb://127.0.0.1:27017/" + config.test).then((respuesta) => {
          //console.log("Conexión exitosa a Mongo")
      }).catch((error) => {
          //console.log(error)
      })
  
      done()
    })
  
    beforeEach(()=>{
      request = {body:{}, session:{}}
      response = {
          json: jest.fn()
      }
    })
  
    test("Debe fallar cuando el email no esta presente",(done)=>{
      // Confirguración request
      request.body ={}
      usuarios_controller.login(request, response)
  
      expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo email es obligatorio"})
      done()
    })
  
    test("Debe fallar cuando el password no esta presente",(done)=>{
      // Confirguración request
      request.body ={email:"jonatan@gmail.com"}
      usuarios_controller.login(request, response)
  
      expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo password es obligatorio"})
      done()
    })
  
    test("Debe fallar cuando el campo email no sea valido",(done)=>{
      // Confirguración request
      request.body ={email:"jonatan.com", password:123456}
      usuarios_controller.login(request, response)
  
      expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El email no es valido, intente nuevamente"})
      done()
    })   

    test("Debe guardar un usuario",(done)=>{
        // Confirguración request
        request.body = {email:"jonatan@gmail.com", nombre:"Jonatan", apellido:"Lombo", password:123456}    
        usuarios_controller.registrar(request, response)
    
        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Usuario guardado correctamente, active su cuenta con el código envíado al correo electronico"})
            done()
        },60)  
      })

    test("Debe validar que el usuario esté activo",(done)=>{
    // Confirguración request
    request.body = {email:"jonatan@gmail.com", password:123456}    
    usuarios_controller.login(request, response)

    setTimeout(()=>{
        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"Por favor active la cuenta con el código de su correo electronico"})
        done()
    },60)  
    } )  
        
    test("Debe inciciar sesión con el campo activo",(done)=>{
    // Confirguración request
    request.body = {email:"jonatan@gmail.com", password:123456}
    usuarios_model.myModel.findOneAndUpdate({email:"jonatan@gmail.com"},{estado:"Activo"}).then((respuesta)=>{
        usuarios_controller.login(request, response)

    setTimeout(()=>{
        expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Bienvenido: Jonatan Lombo"})
        done()
    },60)  
    })  

    })
    

    
//     // test("Borrado",(done)=>{
//     //   usuarios_model.myModel.deleteMany({}).then((respuesta)=>{
//     //       setTimeout(()=>{
//     //           expect("ok").toBe("ok")
//     //           done()
//     //       },60)  
//     //     })
//     // })
  
//     // test("Debe registrar un usuario",(done)=>{
//     //   // Confirguración request
//     //   request.body = {email:"jonatan@gmail.com", nombre:"Jonatan", apellido:"Lombo", password:123456}    
//     //   usuarios_controller.registrar(request, response)
  
//     //   setTimeout(()=>{
//     //       expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Usuario guardado correctamente, active su cuenta con el código envíado al correo electronico"})
//     //       done()
//     //   },60)  
//     // })
  
//     // test("Debe fallar cuando el usuario ya exista",(done)=>{
//     //   // Confirguración request
//     //   request.body = {email:"jonatan@gmail.com", nombre:"Jonatan", apellido:"Lombo", password:123456}    
//     //   usuarios_controller.registrar(request, response)
  
//     //   setTimeout(()=>{
//     //       expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"Este correo ya se encuentra registrado"})
//     //       done()
//     //   },60)  
//     // })
  
    test("Borrado",(done)=>{
      usuarios_model.myModel.deleteMany({}).then((respuesta)=>{
          setTimeout(()=>{
              expect("ok").toBe("ok")
              done()
          },60)  
        })
      })
      
    afterAll(()=>{
      usuarios_model.myModel.deleteMany({}).then((respuesta)=>{})
    })
  
})
  
describe("post:/usuarios/actualizar", () =>{
    let request, response;
    
    beforeAll((done) =>{
  
      mongoose.connect("mongodb://127.0.0.1:27017/" + config.test).then((respuesta) => {
          //console.log("Conexión exitosa a Mongo")
      }).catch((error) => {
          //console.log(error)
      })
  
      done()
    })
  
    beforeEach(()=>{
      request = {body:{}}
      response = {
          json: jest.fn()
      }
    })
  
    test("Debe fallar cuando el email no esta presente",(done)=>{
      // Confirguración request
      request.body ={}
      usuarios_controller.actualizar(request, response)
  
      expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo email es obligatorio"})
      done()
    })
  
    test("Debe fallar cuando el nombre no esta presente",(done)=>{
      // Confirguración request
      request.body ={email:"jonatan@gmail.com"}
      usuarios_controller.actualizar(request, response)
  
      expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo nombre es obligatorio"})
      done()
    })
    
    test("Debe fallar cuando el apellido no esta presente",(done)=>{
      // Confirguración request
      request.body ={email:"jonatan@gmail.com", nombre:"Jonatan"}
      usuarios_controller.actualizar(request, response)
  
      expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo apellido es obligatorio"})
      done()
    })
  
    test("Debe fallar cuando el estado no esta presente",(done)=>{
      // Confirguración request
      request.body ={email:"jonatan@gmail.com", nombre:"Jonatan", apellido:"Lombo"}
      usuarios_controller.actualizar(request, response)
  
      expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo estado es obligatorio"})
      done()
    })

    test("Debe fallar cuando el perfil no esta presente",(done)=>{
        // Confirguración request
        request.body ={email:"jonatan@gmail.com", nombre:"Jonatan", apellido:"Lombo", estado:"Activo"}
        usuarios_controller.actualizar(request, response)
    
        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo perfil es obligatorio"})
        done()
      })
  
    test("Debe fallar cuando el campo email no sea valido",(done)=>{
      // Confirguración request
      request.body ={email:"jonatan.com", nombre:"Jonatan", apellido:"Lombo", estado:"Activo", perfil:"Cliente"}
      usuarios_controller.actualizar(request, response)
  
      expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El email no es valido, intente nuevamente"})
      done()
    })   
  
    test("Debe fallar cuando el nombre sea menor de 3",(done)=>{
      // Confirguración request
      request.body ={email:"jonatan@gmail.com", nombre:"jl", apellido:"Lombo", estado:"Activo", perfil:"Cliente"}
      usuarios_controller.actualizar(request, response)
  
      expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El nombre no es valido. es muy corto"})
      done()
    })  
  
    test("Debe fallar cuando el nombre sea mayor de 20",(done)=>{
      // Confirguración request
      request.body ={email:"jonatan@gmail.com", nombre:"lalalalalalalalalalalalalalalala", apellido:"Lombo", estado:"Activo", perfil:"Cliente"}
      usuarios_controller.actualizar(request, response)
  
      expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El nombre no es valido. es muy largo"})
      done()
    })    
  
    test("Debe fallar cuando el apellido sea menor de 3",(done)=>{
      // Confirguración request
      request.body ={email:"jonatan@gmail.com", nombre:"Jonatan", apellido:"Lm", estado:"Activo", perfil:"Cliente"}
      usuarios_controller.actualizar(request, response)
  
      expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El apellido no es valido. es muy corto"})
      done()
    })  
  
    test("Debe fallar cuando el apellido sea mayor de 20",(done)=>{
      // Confirguración request
      request.body ={email:"jonatan@gmail.com", nombre:"Jonatan", apellido:"lalalalalalalalalalalalalalalala", estado:"Activo", perfil:"Cliente"}
      usuarios_controller.actualizar(request, response)
  
      expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El apellido no es valido. es muy largo"})
      done()
    }) 
  
    test("Debe fallar cuando el usuario no exista",(done)=>{
        // Confirguración request
        request.body = {email:"jonatan@gmail.com", nombre:"Jonatan", apellido:"Lombo", estado:"Activo", perfil:"Cliente"}    
        usuarios_controller.actualizar(request, response)
    
        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El email no existe en la base de datos"})
            done()
        },60)  
      })

    test("Debe guardar un usuario",(done)=>{
      // Confirguración request
      request.body = {email:"jonatan@gmail.com", nombre:"Jonatan", apellido:"Lombo", estado:"Activo", perfil:"Cliente"}    
      usuarios_controller.registrar(request, response)
  
      setTimeout(()=>{
          expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Usuario guardado correctamente, active su cuenta con el código envíado al correo electronico"})
          done()
      },60)  
    })
  
    test("Debe actualizar un usuario",(done)=>{
        // Confirguración request
        request.body = {email:"jonatan@gmail.com", nombre:"Jonatan", apellido:"Lombo", estado:"Activo", perfil:"Cliente"}    
        usuarios_controller.actualizar(request, response)
    
        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Usuario actualizado correctamente"})
            done()
        },60)  
      })
  
    test("Borrado",(done)=>{
      usuarios_model.myModel.deleteMany({}).then((respuesta)=>{
          setTimeout(()=>{
              expect("ok").toBe("ok")
              done()
          },60)  
        })
      })
      
    afterAll(()=>{
      usuarios_model.myModel.deleteMany({}).then((respuesta)=>{})
    })
  
})

describe("post:/usuarios/eliminar", () =>{
    let request, response;
    
    beforeAll((done) =>{
  
      mongoose.connect("mongodb://127.0.0.1:27017/" + config.test).then((respuesta) => {
          //console.log("Conexión exitosa a Mongo")
      }).catch((error) => {
          //console.log(error)
      })
  
      done()
    })
  
    beforeEach(()=>{
      request = {body:{}}
      response = {
          json: jest.fn()
      }
    })
  
    test("Debe fallar cuando el email no este presente",(done)=>{
      // Confirguración request
      request.body ={}
      usuarios_controller.eliminar(request, response)
  
      expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo email es obligatorio"})
      done()
    })

    test("Debe fallar cuando el campo email no sea valido",(done)=>{
        // Confirguración request
        request.body ={email:"jonatan.com"}
        usuarios_controller.eliminar(request, response)
    
        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El email no es valido, intente nuevamente"})
        done()
    })  
      
    test("Debe fallar cuando el usuario no exista",(done)=>{
    // Confirguración request
    request.body = {email:"jonatan@gmail.com", nombre:"Jonatan", apellido:"Lombo", estado:"Activo", perfil:"Cliente"}    
    usuarios_controller.eliminar(request, response)

    setTimeout(()=>{
        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El email no existe en la base de datos"})
        done()
    },60)  
    })  

    test("Debe guardar un usuario",(done)=>{
    // Confirguración request
    request.body = {email:"jonatan@gmail.com", nombre:"Jonatan", apellido:"Lombo", estado:"Activo", perfil:"Cliente"}    
    usuarios_controller.registrar(request, response)

    setTimeout(()=>{
        expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Usuario guardado correctamente, active su cuenta con el código envíado al correo electronico"})
        done()
    },60)  
    })  

    test("Debe eliminar un usuario",(done)=>{
      // Confirguración request
      request.body = {email:"jonatan@gmail.com"}    
      usuarios_controller.eliminar(request, response)
  
      setTimeout(()=>{
         expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Usuario eliminado correctamente"})
          done()
      },60)  
    })
  
    afterAll(()=>{
      usuarios_model.myModel.deleteMany({}).then((respuesta)=>{})
    })
  
})
  
describe("post:/usuarios/listar", () =>{
    let request, response;
    
    beforeAll((done) =>{
  
      mongoose.connect("mongodb://127.0.0.1:27017/" + config.test).then((respuesta) => {
         // console.log("Conexión exitosa a Mongo")
      }).catch((error) => {
         // console.log(error)
      })
  
      done()
    })
  
    beforeEach(()=>{
      request = {body:{}}
      response = {
          json: jest.fn()
      }
    })
   
    test("Debe guardar un usuario",(done)=>{
        // Confirguración request
        request.body = {email:"jonatan@gmail.com", nombre:"Jonatan", apellido:"Lombo", estado:"Activo", perfil:"Cliente"}    
        usuarios_controller.registrar(request, response)
    
        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Usuario guardado correctamente, active su cuenta con el código envíado al correo electronico"})
            done()
        },60)  
        }) 

    test("Debe validar que exista un producto",(done)=>{
      // Confirguración request
      request.body = {}    
      usuarios_controller.listar(request, response)
  
      setTimeout(()=>{
          expect(response.json.mock.calls[0][0].length).toBe(1)
          done()
      },60)  
    })

    test("Borrado",(done)=>{
        usuarios_model.myModel.deleteMany({}).then((respuesta)=>{
            setTimeout(()=>{
                expect("ok").toBe("ok")
                done()
            },60)  
          })
        })
  
    afterAll(()=>{
      usuarios_model.myModel.deleteMany({}).then((respuesta)=>{})
    })
  
})

describe("post:/usuarios/listar_id", () =>{
    let request, response;
    
    beforeAll((done) =>{
  
      mongoose.connect("mongodb://127.0.0.1:27017/" + config.test).then((respuesta) => {
        //  console.log("Conexión exitosa a Mongo")
      }).catch((error) => {
        //  console.log(error)
      })
  
      done()
    })
  
    beforeEach(()=>{
      request = {body:{}}
      response = {
          json: jest.fn()
      }
    })
   
    test("Debe fallar cuando el email no este presente",(done)=>{
        // Confirguración request
        request.body ={}
        usuarios_controller.listar_id(request, response)
    
        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo email es obligatorio"})
        done()
    })
  
    test("Debe fallar cuando el campo email no sea valido",(done)=>{
        // Confirguración request
        request.body ={email:"jonatan.com"}
        usuarios_controller.listar_id(request, response)
    
        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El email no es valido, intente nuevamente"})
        done()
    })  
        
    test("Debe fallar cuando el usuario no exista",(done)=>{
    // Confirguración request
    request.body = {email:"jonatan@gmail.com", nombre:"Jonatan", apellido:"Lombo", estado:"Activo", perfil:"Cliente"}    
    usuarios_controller.listar_id(request, response)

    setTimeout(()=>{
        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El email no existe en la base de datos"})
        done()
    },60)  
    })  

    test("Debe guardar un usuario",(done)=>{
    // Confirguración request
    request.body = {email:"jonatan@gmail.com", nombre:"Jonatan", apellido:"Lombo", estado:"Activo", perfil:"Cliente"}    
    usuarios_controller.registrar(request, response)

    setTimeout(()=>{
        expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Usuario guardado correctamente, active su cuenta con el código envíado al correo electronico"})
        done()
    },60)  
    })  

    test("Debe mostrar los datos del producto",(done)=>{
      // Confirguración request      
      request.body = {}    
      usuarios_controller.listar(request, response)
  
      setTimeout(()=>{
        expect(response.json.mock.calls[0][0][0]).toHaveProperty("email"); 
        done()
      },60) 
       
    })
    
    test("Borrado",(done)=>{
        usuarios_model.myModel.deleteMany({}).then((respuesta)=>{
            setTimeout(()=>{
                expect("ok").toBe("ok")
                done()
            },60)  
          })
        })

    afterAll(()=>{
      usuarios_model.myModel.deleteMany({}).then((respuesta)=>{})
    })
  
})

describe("post:/usuarios/listar_id", () =>{
    let request, response;
    
    beforeAll((done) =>{
  
      mongoose.connect("mongodb://127.0.0.1:27017/" + config.test).then((respuesta) => {
        //  console.log("Conexión exitosa a Mongo")
      }).catch((error) => {
        //  console.log(error)
      })
  
      done()
    })
  
    beforeEach(()=>{
      request = {body:{}}
      response = {
          json: jest.fn()
      }
    })
   
    test("Debe fallar cuando el email no este presente",(done)=>{
        // Confirguración request
        request.body ={}
        usuarios_controller.activar(request, response)
    
        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo email es obligatorio"})
        done()
    })
  
    test("Debe fallar cuando el campo codigo no este presente",(done)=>{
        // Confirguración request
        request.body ={email:"jonatan@gmail.com"}
        usuarios_controller.activar(request, response)
    
        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo codigo es obligatorio"})
        done()
    })  

    test("Debe guardar un usuario",(done)=>{
    // Confirguración request
    request.body = {email:"jonatan@gmail.com", nombre:"Jonatan", apellido:"Lombo", estado:"Activo", perfil:"Cliente"}    
    usuarios_controller.registrar(request, response)

    setTimeout(()=>{
        expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Usuario guardado correctamente, active su cuenta con el código envíado al correo electronico"})
        done()
    },60)  
    })  

    test("Debe fallar cuando el codigo no sea correcto",(done)=>{
        // Confirguración request
        request.body = {email:"jonatan@gmail.com", codigo:"estaeslaprueba"}    
        usuarios_controller.activar(request, response)
    
        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"Error al activar la cuenta, verifique los datos"})
            done()
        },60)  
        })  

    test("La cuenta debe quedar activa",(done)=>{
        // Confirguración request
        usuarios_model.myModel.find({email:"jonatan@gmail.com"}).then((respuesta)=>{

            request.body = {email:"jonatan@gmail.com", codigo:respuesta[0].codigo}    
            usuarios_controller.activar(request, response)
        
            setTimeout(()=>{
                expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Cuenta activada correctamente, ingresa con tus credenciales"})
                done()
            },60)  
            })      
        })
       
    test("Borrado",(done)=>{
        usuarios_model.myModel.deleteMany({}).then((respuesta)=>{
            setTimeout(()=>{
                expect("ok").toBe("ok")
                done()
            },60)  
          })
        })

    afterAll(()=>{
      usuarios_model.myModel.deleteMany({}).then((respuesta)=>{})
    })
  
})