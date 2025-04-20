const macetas_controller = require("./macetas_controller").macetas_controller
var mongoose = require("mongoose")
var config = require("../../config").config
var macetas_model = require("../../api/modelos/macetas_model.js").macetas_model


describe("post:/macetas/guardar", () =>{
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

  test("Debe fallar cuando el código no esta presente",(done)=>{
    // Confirguración request
    request.body ={}
    macetas_controller.guardar(request, response)

    expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo código es obligatorio"})
    done()
  })

  test("Debe fallar cuando el nombre no esta presente",(done)=>{
    // Confirguración request
    request.body ={codigo:13}
    macetas_controller.guardar(request, response)

    expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo nombre es obligatorio"})
    done()
  })

  test("Debe fallar cuando el precio no esta presente",(done)=>{
    // Confirguración request
    request.body ={codigo:13, nombre:"Jonatan"}
    macetas_controller.guardar(request, response)

    expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo precio es obligatorio"})
    done()
  })

  test("Debe fallar cuando la descripción no esta presente",(done)=>{
    // Confirguración request
    request.body ={codigo:13, nombre:"Jonatan", precio:2000}
    macetas_controller.guardar(request, response)

    expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo descripción es obligatorio"})
    done()
  })

  test("Debe fallar cuando los beneficios no estén presentes",(done)=>{
    // Confirguración request
    request.body ={codigo:13, nombre:"Jonatan", precio:2000, descripcion:"descripción"}
    macetas_controller.guardar(request, response)

    expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo beneficios es obligatorio"})
    done()
  })   

  test("Debe fallar cuando el nombre sea mayor de 30",(done)=>{
    // Confirguración request
    request.body ={codigo:13, nombre:"lalalalalalalalalalalalalalalala", precio:2000, descripcion:"descripción", beneficios:"beneficios"}
    macetas_controller.guardar(request, response)

    expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El nombre no es valido. Intente un nombre más corto"})
    done()
  })    

  test("Debe fallar cuando la descripción sea mayor de 2400",(done)=>{
    // Confirguración request
    request.body = {codigo:13, nombre:"Jonatan", precio:2000, descripcion:"lmvqhefwajhdsfgtkpzcnxioyrlwudvbkzqpfhxmcdtuwrnbjqylshzvkpqfghxutifmldvskajerobnqzpcwhtixvmydgszuaolwrpcknqhzjvfsldtbpymqiugxchawjfrdpszblmvektcoanxwuhqpkryijcvsfbzgtuxmowlydaejzhprxqwtvkcdgtnjflspkcyiubrwzvqeafhxodjntmkuplizchqwgstvbnfcyjwrkpohmxdilzatgsqfupoyhwbvknltzjcxiqsdferuovkwnghzxqbltsjfmciukpdaoyrwhnxvgeqtlzjrsbkpwfiqmhxuvdtonawcygslzkrqtefpbxdjihmvoycquznwpkxjrgfhstlzvmdyqbncoiutpxwzchrsfajgkyvbelkmnpqwiuzotcslfhdvnjarxgzhqwydbpkmvcnjfiwltqoszrvyxpgujedkhcmwbaztjnofrpvlhyqkxdugwszctbjmviarhfpyqowlknstzghxcpduijmrwfbvovqtlszkdhyfpcanugmjoqrwxtisvlkhbpzfuegpmtncxwrldjoabfuzkvqhsdygclmniprawojktvfbxzqsydhcnluiwrobyxfmpkjlazgsqchwdmntirvbkpjcfhyuzsxtqglaowvznrkiubfpheymcjxwvdtqgnpszolrbufymkqjhxvnscratwligkzpojyqfbduxmvsphewnzqljyoikbftchxmrwzcuvgsplqaenbdiyfwxoztcshjrmqgkapvhlbncsojtpxwzkyviunfrgmwxlceaqsdotbjrzfkhvupgtaolnwbmdjcvkqxyhwrsztoifgbzpxjrnfdmklqhcaeovuwtsvbgkrpfyzliubjwvtaqxchdnoemwqsytkfvzhrgijpluxbscozwmdnfhkyaropqjstglbvcxiwzfyrnlwvqdkpmstojhxgkcyzfrubapowcqtinmvzhlpdkyjgsxwqvfnrcbtoizhjquvxdflkgwspmtcvyqzbnwheosupjrxktcidlfvnqzgmlmvqhefwajhdsfgtkpzcnxioyrlwudvbkzqpfhxmcdtuwrnbjqylshzvkpqfghxutifmldvskajerobnqzpcwhtixvmydgszuaolwrpcknqhzjvfsldtbpymqiugxchawjfrdpszblmvektcoanxwuhqpkryijcvsfbzgtuxmowlydaejzhprxqwtvkcdgtnjflspkcyiubrwzvqeafhxodjntmkuplizchqwgstvbnfcyjwrkpohmxdilzatgsqfupoyhwbvknltzjcxiqsdferuovkwnghzxqbltsjfmciukpdaoyrwhnxvgeqtlzjrsbkpwfiqmhxuvdtonawcygslzkrqtefpbxdjihmvoycquznwpkxjrgfhstlzvmdyqbncoiutpxwzchrsfajgkyvbelkmnpqwiuzotcslfhdvnjarxgzhqwydbpkmvcnjfiwltqoszrvyxpgujedkhcmwbaztjnofrpvlhyqkxdugwszctbjmviarhfpyqowlknstzghxcpduijmrwfbvovqtlszkdhyfpcanugmjoqrwxtisvlkhbpzfuegpmtncxwrldjoabfuzkvqhsdygclmniprawojktvfbxzqsydhcnluiwrobyxfmpkjlazgsqchwdmntirvbkpjcfhyuzsxtqglaowvznrkiubfpheymcjxwvdtqgnpszolrbufymkqjhxvnscratwligkzpojyqfbduxmvsphewnzqljyoikbftchxmrwzcuvgsplqaenbdiyfwxoztcshjrmqgkapvhlbncsojtpxwzkyviunfrgmwxlceaqsdotbjrzfkhvupgtaolnwbmdjcvkqxyhwrsztoifgbzpxjrnfdmklqhcaeovuwtsvbgkrpfyzliubjwvtaqxchdnoemwqsytkfvzhrgijpluxbscozwmdnfhkyaropqjstglbvcxiwzfyrnlwvqdkpmstojhxgkcyzfrubapowcqtinmvzhlpdkyjgsxwqvfnrcbtoizhjquvxdflkgwspmtcvyqzbnwheosupjrxktcidlfvnqzgmowlknstzghxcpduijmrwfbvovqtlszkdhyfpcanugmjoqrwxtisvlkhbpzfuegpmtncxwrldjoabfuzkvqhsdygclmniprawojktvfbxzqsydhcnluiwrobyxfmpkjlazgsqchwdmntirvbkpjcfhyuzsxtqglaowvznrkiubfpheymcjxwvdtqgnpszolrbufymkqjhxvnscratwligkzpojyqfbduxmvsphewnzqljyoikbfkgwspmtcvyqzbnwheosupjrxk"
    ,beneficios:"beneficios"}
    macetas_controller.guardar(request, response)

    setTimeout(()=>{
        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"La descripción no es valido. Intente un texto más corto"})
        done()
    },60)  
  })

  test("Debe fallar cuando los beneficios sea mayor de 2400",(done)=>{
    // Confirguración request
    request.body = {codigo:13, nombre:"Jonatan", precio:2000, descripcion:"descripcion", beneficios:"lmvqhefwajhdsfgtkpzcnxioyrlwudvbkzqpfhxmcdtuwrnbjqylshzvkpqfghxutifmldvskajerobnqzpcwhtixvmydgszuaolwrpcknqhzjvfsldtbpymqiugxchawjfrdpszblmvektcoanxwuhqpkryijcvsfbzgtuxmowlydaejzhprxqwtvkcdgtnjflspkcyiubrwzvqeafhxodjntmkuplizchqwgstvbnfcyjwrkpohmxdilzatgsqfupoyhwbvknltzjcxiqsdferuovkwnghzxqbltsjfmciukpdaoyrwhnxvgeqtlzjrsbkpwfiqmhxuvdtonawcygslzkrqtefpbxdjihmvoycquznwpkxjrgfhstlzvmdyqbncoiutpxwzchrsfajgkyvbelkmnpqwiuzotcslfhdvnjarxgzhqwydbpkmvcnjfiwltqoszrvyxpgujedkhcmwbaztjnofrpvlhyqkxdugwszctbjmviarhfpyqowlknstzghxcpduijmrwfbvovqtlszkdhyfpcanugmjoqrwxtisvlkhbpzfuegpmtncxwrldjoabfuzkvqhsdygclmniprawojktvfbxzqsydhcnluiwrobyxfmpkjlazgsqchwdmntirvbkpjcfhyuzsxtqglaowvznrkiubfpheymcjxwvdtqgnpszolrbufymkqjhxvnscratwligkzpojyqfbduxmvsphewnzqljyoikbftchxmrwzcuvgsplqaenbdiyfwxoztcshjrmqgkapvhlbncsojtpxwzkyviunfrgmwxlceaqsdotbjrzfkhvupgtaolnwbmdjcvkqxyhwrsztoifgbzpxjrnfdmklqhcaeovuwtsvbgkrpfyzliubjwvtaqxchdnoemwqsytkfvzhrgijpluxbscozwmdnfhkyaropqjstglbvcxiwzfyrnlwvqdkpmstojhxgkcyzfrubapowcqtinmvzhlpdkyjgsxwqvfnrcbtoizhjquvxdflkgwspmtcvyqzbnwheosupjrxktcidlfvnqzgmlmvqhefwajhdsfgtkpzcnxioyrlwudvbkzqpfhxmcdtuwrnbjqylshzvkpqfghxutifmldvskajerobnqzpcwhtixvmydgszuaolwrpcknqhzjvfsldtbpymqiugxchawjfrdpszblmvektcoanxwuhqpkryijcvsfbzgtuxmowlydaejzhprxqwtvkcdgtnjflspkcyiubrwzvqeafhxodjntmkuplizchqwgstvbnfcyjwrkpohmxdilzatgsqfupoyhwbvknltzjcxiqsdferuovkwnghzxqbltsjfmciukpdaoyrwhnxvgeqtlzjrsbkpwfiqmhxuvdtonawcygslzkrqtefpbxdjihmvoycquznwpkxjrgfhstlzvmdyqbncoiutpxwzchrsfajgkyvbelkmnpqwiuzotcslfhdvnjarxgzhqwydbpkmvcnjfiwltqoszrvyxpgujedkhcmwbaztjnofrpvlhyqkxdugwszctbjmviarhfpyqowlknstzghxcpduijmrwfbvovqtlszkdhyfpcanugmjoqrwxtisvlkhbpzfuegpmtncxwrldjoabfuzkvqhsdygclmniprawojktvfbxzqsydhcnluiwrobyxfmpkjlazgsqchwdmntirvbkpjcfhyuzsxtqglaowvznrkiubfpheymcjxwvdtqgnpszolrbufymkqjhxvnscratwligkzpojyqfbduxmvsphewnzqljyoikbftchxmrwzcuvgsplqaenbdiyfwxoztcshjrmqgkapvhlbncsojtpxwzkyviunfrgmwxlceaqsdotbjrzfkhvupgtaolnwbmdjcvkqxyhwrsztoifgbzpxjrnfdmklqhcaeovuwtsvbgkrpfyzliubjwvtaqxchdnoemwqsytkfvzhrgijpluxbscozwmdnfhkyaropqjstglbvcxiwzfyrnlwvqdkpmstojhxgkcyzfrubapowcqtinmvzhlpdkyjgsxwqvfnrcbtoizhjquvxdflkgwspmtcvyqzbnwheosupjrxktcidlfvnqzgmowlknstzghxcpduijmrwfbvovqtlszkdhyfpcanugmjoqrwxtisvlkhbpzfuegpmtncxwrldjoabfuzkvqhsdygclmniprawojktvfbxzqsydhcnluiwrobyxfmpkjlazgsqchwdmntirvbkpjcfhyuzsxtqglaowvznrkiubfpheymcjxwvdtqgnpszolrbufymkqjhxvnscratwligkzpojyqfbduxmvsphewnzqljyoikbfkgwspmtcvyqzbnwheosupjrxk"}
    macetas_controller.guardar(request, response)

    setTimeout(()=>{
        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"Los beneficios no son validos. Intente un texto más corto"})
        done()
    },60)  
  })

  test("Debe guardar un producto",(done)=>{
    // Confirguración request
    request.body = {codigo:13, nombre:"Jonatan", precio:2000, descripcion:"descripción", beneficios:"beneficios"}    
    macetas_controller.guardar(request, response)

    setTimeout(()=>{
        expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Elemento guardado correctamente, recuerda actualizar la imagen de la maceta"})
        done()
    },60)  
  })

  test("Debe fallar cuando el producto ya exista",(done)=>{
    // Confirguración request
    request.body = {codigo:13, nombre:"Jonatan", precio:2000, descripcion:"descripción", beneficios:"beneficios"}    
    macetas_controller.guardar(request, response)

    setTimeout(()=>{
        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El código de este elemento ya existe"})
        done()
    },60)  
  })

  test("Borrado",(done)=>{
    macetas_model.myModel.deleteMany({}).then((respuesta)=>{
        setTimeout(()=>{
            expect("ok").toBe("ok")
            done()
        },60)  
      })
    })
    
  afterAll(()=>{
    macetas_model.myModel.deleteMany({}).then((respuesta)=>{})
  })

})

describe("post:/macetas/actualizar", () =>{
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
  
    test("Debe fallar cuando el _id no este presente",(done)=>{
      // Confirguración request
      request.body ={}
      macetas_controller.actualizar(request, response)
  
      expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo _id es obligatorio"})
      done()
    })
  
    test("Debe fallar cuando el nombre no esta presente",(done)=>{
      // Confirguración request
      request.body ={_id:13}
      macetas_controller.actualizar(request, response)
  
      expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo nombre es obligatorio"})
      done()
    })
  
    test("Debe fallar cuando la descripción no esta presente",(done)=>{
      // Confirguración request
      request.body ={_id:13, nombre:"Jonatan"}
      macetas_controller.actualizar(request, response)
  
      expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo descripción es obligatorio"})
      done()
    })
  
    test("Debe fallar cuando los beneficios no estén presentes",(done)=>{
      // Confirguración request
      request.body ={_id:13, nombre:"Jonatan", descripcion:"descripción"}
      macetas_controller.actualizar(request, response)
  
      expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo beneficios es obligatorio"})
      done()
    })
  
    test("Debe fallar cuando el nombre sea mayor de 30",(done)=>{
      // Confirguración request
      request.body ={_id:13, nombre:"lalalalalalalalalalalalalalalala", descripcion:"descripción", beneficios:"beneficios"}
      macetas_controller.actualizar(request, response)
  
      expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El nombre no es valido. Intente un nombre más corto"})
      done()
    })    
  
    test("Debe fallar cuando la descripción sea mayor de 2400",(done)=>{
      // Confirguración request
      request.body = {_id:13, nombre:"Jonatan", descripcion:"lmvqhefwajhdsfgtkpzcnxioyrlwudvbkzqpfhxmcdtuwrnbjqylshzvkpqfghxutifmldvskajerobnqzpcwhtixvmydgszuaolwrpcknqhzjvfsldtbpymqiugxchawjfrdpszblmvektcoanxwuhqpkryijcvsfbzgtuxmowlydaejzhprxqwtvkcdgtnjflspkcyiubrwzvqeafhxodjntmkuplizchqwgstvbnfcyjwrkpohmxdilzatgsqfupoyhwbvknltzjcxiqsdferuovkwnghzxqbltsjfmciukpdaoyrwhnxvgeqtlzjrsbkpwfiqmhxuvdtonawcygslzkrqtefpbxdjihmvoycquznwpkxjrgfhstlzvmdyqbncoiutpxwzchrsfajgkyvbelkmnpqwiuzotcslfhdvnjarxgzhqwydbpkmvcnjfiwltqoszrvyxpgujedkhcmwbaztjnofrpvlhyqkxdugwszctbjmviarhfpyqowlknstzghxcpduijmrwfbvovqtlszkdhyfpcanugmjoqrwxtisvlkhbpzfuegpmtncxwrldjoabfuzkvqhsdygclmniprawojktvfbxzqsydhcnluiwrobyxfmpkjlazgsqchwdmntirvbkpjcfhyuzsxtqglaowvznrkiubfpheymcjxwvdtqgnpszolrbufymkqjhxvnscratwligkzpojyqfbduxmvsphewnzqljyoikbftchxmrwzcuvgsplqaenbdiyfwxoztcshjrmqgkapvhlbncsojtpxwzkyviunfrgmwxlceaqsdotbjrzfkhvupgtaolnwbmdjcvkqxyhwrsztoifgbzpxjrnfdmklqhcaeovuwtsvbgkrpfyzliubjwvtaqxchdnoemwqsytkfvzhrgijpluxbscozwmdnfhkyaropqjstglbvcxiwzfyrnlwvqdkpmstojhxgkcyzfrubapowcqtinmvzhlpdkyjgsxwqvfnrcbtoizhjquvxdflkgwspmtcvyqzbnwheosupjrxktcidlfvnqzgmlmvqhefwajhdsfgtkpzcnxioyrlwudvbkzqpfhxmcdtuwrnbjqylshzvkpqfghxutifmldvskajerobnqzpcwhtixvmydgszuaolwrpcknqhzjvfsldtbpymqiugxchawjfrdpszblmvektcoanxwuhqpkryijcvsfbzgtuxmowlydaejzhprxqwtvkcdgtnjflspkcyiubrwzvqeafhxodjntmkuplizchqwgstvbnfcyjwrkpohmxdilzatgsqfupoyhwbvknltzjcxiqsdferuovkwnghzxqbltsjfmciukpdaoyrwhnxvgeqtlzjrsbkpwfiqmhxuvdtonawcygslzkrqtefpbxdjihmvoycquznwpkxjrgfhstlzvmdyqbncoiutpxwzchrsfajgkyvbelkmnpqwiuzotcslfhdvnjarxgzhqwydbpkmvcnjfiwltqoszrvyxpgujedkhcmwbaztjnofrpvlhyqkxdugwszctbjmviarhfpyqowlknstzghxcpduijmrwfbvovqtlszkdhyfpcanugmjoqrwxtisvlkhbpzfuegpmtncxwrldjoabfuzkvqhsdygclmniprawojktvfbxzqsydhcnluiwrobyxfmpkjlazgsqchwdmntirvbkpjcfhyuzsxtqglaowvznrkiubfpheymcjxwvdtqgnpszolrbufymkqjhxvnscratwligkzpojyqfbduxmvsphewnzqljyoikbftchxmrwzcuvgsplqaenbdiyfwxoztcshjrmqgkapvhlbncsojtpxwzkyviunfrgmwxlceaqsdotbjrzfkhvupgtaolnwbmdjcvkqxyhwrsztoifgbzpxjrnfdmklqhcaeovuwtsvbgkrpfyzliubjwvtaqxchdnoemwqsytkfvzhrgijpluxbscozwmdnfhkyaropqjstglbvcxiwzfyrnlwvqdkpmstojhxgkcyzfrubapowcqtinmvzhlpdkyjgsxwqvfnrcbtoizhjquvxdflkgwspmtcvyqzbnwheosupjrxktcidlfvnqzgmowlknstzghxcpduijmrwfbvovqtlszkdhyfpcanugmjoqrwxtisvlkhbpzfuegpmtncxwrldjoabfuzkvqhsdygclmniprawojktvfbxzqsydhcnluiwrobyxfmpkjlazgsqchwdmntirvbkpjcfhyuzsxtqglaowvznrkiubfpheymcjxwvdtqgnpszolrbufymkqjhxvnscratwligkzpojyqfbduxmvsphewnzqljyoikbfkgwspmtcvyqzbnwheosupjrxk"
      ,beneficios:"beneficios"}
      macetas_controller.actualizar(request, response)
  
      setTimeout(()=>{
          expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"La descripción no es valido. Intente un texto más corto"})
          done()
      },60)  
    })
  
    test("Debe fallar cuando los beneficios sea mayor de 2400",(done)=>{
      // Confirguración request
      request.body = {_id:13, nombre:"Jonatan", descripcion:"descripcion", beneficios:"lmvqhefwajhdsfgtkpzcnxioyrlwudvbkzqpfhxmcdtuwrnbjqylshzvkpqfghxutifmldvskajerobnqzpcwhtixvmydgszuaolwrpcknqhzjvfsldtbpymqiugxchawjfrdpszblmvektcoanxwuhqpkryijcvsfbzgtuxmowlydaejzhprxqwtvkcdgtnjflspkcyiubrwzvqeafhxodjntmkuplizchqwgstvbnfcyjwrkpohmxdilzatgsqfupoyhwbvknltzjcxiqsdferuovkwnghzxqbltsjfmciukpdaoyrwhnxvgeqtlzjrsbkpwfiqmhxuvdtonawcygslzkrqtefpbxdjihmvoycquznwpkxjrgfhstlzvmdyqbncoiutpxwzchrsfajgkyvbelkmnpqwiuzotcslfhdvnjarxgzhqwydbpkmvcnjfiwltqoszrvyxpgujedkhcmwbaztjnofrpvlhyqkxdugwszctbjmviarhfpyqowlknstzghxcpduijmrwfbvovqtlszkdhyfpcanugmjoqrwxtisvlkhbpzfuegpmtncxwrldjoabfuzkvqhsdygclmniprawojktvfbxzqsydhcnluiwrobyxfmpkjlazgsqchwdmntirvbkpjcfhyuzsxtqglaowvznrkiubfpheymcjxwvdtqgnpszolrbufymkqjhxvnscratwligkzpojyqfbduxmvsphewnzqljyoikbftchxmrwzcuvgsplqaenbdiyfwxoztcshjrmqgkapvhlbncsojtpxwzkyviunfrgmwxlceaqsdotbjrzfkhvupgtaolnwbmdjcvkqxyhwrsztoifgbzpxjrnfdmklqhcaeovuwtsvbgkrpfyzliubjwvtaqxchdnoemwqsytkfvzhrgijpluxbscozwmdnfhkyaropqjstglbvcxiwzfyrnlwvqdkpmstojhxgkcyzfrubapowcqtinmvzhlpdkyjgsxwqvfnrcbtoizhjquvxdflkgwspmtcvyqzbnwheosupjrxktcidlfvnqzgmlmvqhefwajhdsfgtkpzcnxioyrlwudvbkzqpfhxmcdtuwrnbjqylshzvkpqfghxutifmldvskajerobnqzpcwhtixvmydgszuaolwrpcknqhzjvfsldtbpymqiugxchawjfrdpszblmvektcoanxwuhqpkryijcvsfbzgtuxmowlydaejzhprxqwtvkcdgtnjflspkcyiubrwzvqeafhxodjntmkuplizchqwgstvbnfcyjwrkpohmxdilzatgsqfupoyhwbvknltzjcxiqsdferuovkwnghzxqbltsjfmciukpdaoyrwhnxvgeqtlzjrsbkpwfiqmhxuvdtonawcygslzkrqtefpbxdjihmvoycquznwpkxjrgfhstlzvmdyqbncoiutpxwzchrsfajgkyvbelkmnpqwiuzotcslfhdvnjarxgzhqwydbpkmvcnjfiwltqoszrvyxpgujedkhcmwbaztjnofrpvlhyqkxdugwszctbjmviarhfpyqowlknstzghxcpduijmrwfbvovqtlszkdhyfpcanugmjoqrwxtisvlkhbpzfuegpmtncxwrldjoabfuzkvqhsdygclmniprawojktvfbxzqsydhcnluiwrobyxfmpkjlazgsqchwdmntirvbkpjcfhyuzsxtqglaowvznrkiubfpheymcjxwvdtqgnpszolrbufymkqjhxvnscratwligkzpojyqfbduxmvsphewnzqljyoikbftchxmrwzcuvgsplqaenbdiyfwxoztcshjrmqgkapvhlbncsojtpxwzkyviunfrgmwxlceaqsdotbjrzfkhvupgtaolnwbmdjcvkqxyhwrsztoifgbzpxjrnfdmklqhcaeovuwtsvbgkrpfyzliubjwvtaqxchdnoemwqsytkfvzhrgijpluxbscozwmdnfhkyaropqjstglbvcxiwzfyrnlwvqdkpmstojhxgkcyzfrubapowcqtinmvzhlpdkyjgsxwqvfnrcbtoizhjquvxdflkgwspmtcvyqzbnwheosupjrxktcidlfvnqzgmowlknstzghxcpduijmrwfbvovqtlszkdhyfpcanugmjoqrwxtisvlkhbpzfuegpmtncxwrldjoabfuzkvqhsdygclmniprawojktvfbxzqsydhcnluiwrobyxfmpkjlazgsqchwdmntirvbkpjcfhyuzsxtqglaowvznrkiubfpheymcjxwvdtqgnpszolrbufymkqjhxvnscratwligkzpojyqfbduxmvsphewnzqljyoikbfkgwspmtcvyqzbnwheosupjrxk"}
      macetas_controller.actualizar(request, response)
  
      setTimeout(()=>{
          expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"Los beneficios no son validos. Intente un texto más corto"})
          done()
      },60)  
    })
  
    test("Debe guardar un producto",(done)=>{
        // Confirguración request
        request.body = {codigo:13, nombre:"Jonatan", precio:2000, descripcion:"descripción", beneficios:"beneficios"}    
        macetas_controller.guardar(request, response)
    
        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Elemento guardado correctamente, recuerda actualizar la imagen de la maceta"})
            done()
        },60)  
      })
    
    test("Debe actualizar los datos del producto",(done)=>{
    // Confirguración request
    macetas_model.myModel.find({codigo:13}).then((respuesta)=>{
        request.body = {_id:respuesta[0]._id, nombre:"Jonatan", descripcion:"descripción", beneficios:"beneficios"}    
        macetas_controller.actualizar(request, response)
        
            setTimeout(()=>{
                expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Elemento actualizado correctamente"})
                done()
            },60)       
    }) 
    })

    test("Borrado",(done)=>{
        macetas_model.myModel.deleteMany({}).then((respuesta)=>{
            setTimeout(()=>{
                expect("ok").toBe("ok")
                done()
            },60)  
          })
        })
  
    
    afterAll(()=>{
      macetas_model.myModel.deleteMany({}).then((respuesta)=>{})
    })
  
})

describe("post:/macetas/eliminar", () =>{
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
  
    test("Debe fallar cuando el _id no este presente",(done)=>{
      // Confirguración request
      request.body ={}
      macetas_controller.eliminar(request, response)
  
      expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo _id es obligatorio"})
      done()
    })
  
    test("Debe guardar un producto",(done)=>{
        // Confirguración request
        request.body = {codigo:13, nombre:"Jonatan", precio:2000, descripcion:"descripción", beneficios:"beneficios"}    
        macetas_controller.guardar(request, response)
    
        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Elemento guardado correctamente, recuerda actualizar la imagen de la maceta"})
            done()
        },60)  
      })

    test("Debe eliminar un productos",(done)=>{
      // Confirguración request
      macetas_model.myModel.find({codigo:13}).then((respuesta)=>{
      request.body = {_id:respuesta[0]._id}    
      macetas_controller.eliminar(request, response)
  
      setTimeout(()=>{
         expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Elemento eliminado correctamente"})
          done()
      },60)  
    })
    })

    test("Borrado",(done)=>{
        macetas_model.myModel.deleteMany({}).then((respuesta)=>{
            setTimeout(()=>{
                expect("ok").toBe("ok")
                done()
            },60)  
          })
        })
  
    afterAll(()=>{
      macetas_model.myModel.deleteMany({}).then((respuesta)=>{})
    })
  
})
  
describe("post:/macetas/listar", () =>{
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
   
    test("Debe guardar un producto",(done)=>{
        // Confirguración request
        request.body = {codigo:13, nombre:"Jonatan", precio:2000, descripcion:"descripción", beneficios:"beneficios"}    
        macetas_controller.guardar(request, response)
    
        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Elemento guardado correctamente, recuerda actualizar la imagen de la maceta"})
            done()
        },60)  
      })

    test("Debe validar que exista un producto",(done)=>{
      // Confirguración request
      request.body = {}    
      macetas_controller.listar(request, response)
  
      setTimeout(()=>{
          expect(response.json.mock.calls[0][0].length).toBe(1)
          done()
      },60)  
    })

    test("Borrado",(done)=>{
        macetas_model.myModel.deleteMany({}).then((respuesta)=>{
            setTimeout(()=>{
                expect("ok").toBe("ok")
                done()
            },60)  
          })
        })
  
    afterAll(()=>{
      macetas_model.myModel.deleteMany({}).then((respuesta)=>{})
    })
  
})

describe("post:/macetas/listar_id", () =>{
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
   
    test("Debe fallar cuando el _id no este presente",(done)=>{
        // Confirguración request
        request.body ={}
        macetas_controller.listar_id(request, response)
    
        expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo _id es obligatorio"})
        done()
      })

    test("Debe guardar un producto",(done)=>{
        // Confirguración request
        request.body = {codigo:13, nombre:"Jonatan", precio:2000, descripcion:"descripción", beneficios:"beneficios"}    
        macetas_controller.guardar(request, response)
    
        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Elemento guardado correctamente, recuerda actualizar la imagen de la maceta"})
            done()
        },60)  
      })

    test("Debe mostrar los datos del producto",(done)=>{
      // Confirguración request
      macetas_model.myModel.find({}).then((respuesta)=>{
      
      request.body = {}    
      macetas_controller.listar(request, response)
  
      setTimeout(()=>{
        expect(response.json.mock.calls[0][0][0]).toHaveProperty("_id"); 
        done()
      },60) 

      })
       
    })
    
    test("Borrado",(done)=>{
        macetas_model.myModel.deleteMany({}).then((respuesta)=>{
            setTimeout(()=>{
                expect("ok").toBe("ok")
                done()
            },60)  
          })
        })

    afterAll(()=>{
      macetas_model.myModel.deleteMany({}).then((respuesta)=>{})
    })
  
})