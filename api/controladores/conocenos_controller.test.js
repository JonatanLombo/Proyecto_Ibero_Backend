const conocenos_controller = require("./conocenos_controller").conocenos_controller
var mongoose = require("mongoose")
var config = require("../../config").config
var conocenos_model = require("../../api/modelos/conocenos_model.js").conocenos_model

describe("post:/conocenos/guardar", () =>{
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

  test("Debe fallar cuando el text_1 no esta presente",(done)=>{
    // Confirguración request
    request.body ={}
    conocenos_controller.guardar(request, response)

    expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo ¿Quiénes somos? es obligatorio"})
    done()
  })

  test("Debe fallar cuando el text_2 no esta presente",(done)=>{
    // Confirguración request
    request.body ={text_1:"¿Quiénes somos?"}
    conocenos_controller.guardar(request, response)

    expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"El campo consejos es obligatorio"})
    done()
  })

  test("Debe fallar cuando la descripción sea mayor de 4000",(done)=>{
    // Confirguración request
    request.body ={text_1:"¿Quiénes somos?", text_2:"lmvqhefwajhdsfgtkpzcnxioyrlwudvbkzqpfhxmcdtuwrnbjqylshzvkpqfghxutifmldvskajerobnqzpcwhtixvmydgszuaolwrpcknqhzjvfsldtbpymqiugxchawjfrdpszblmvektcoanxwuhqpkryijcvsfbzgtuxmowlydaejzhprxqwtvkcdgtnjflspkcyiubrwzvqeafhxodjntmkuplizchqwgstvbnfcyjwrkpohmxdilzatgsqfupoyhwbvknltzjcxiqsdferuovkwnghzxqbltsjfmciukpdaoyrwhnxvgeqtlzjrsbkpwfiqmhxuvdtonawcygslzkrqtefpbxdjihmvoycquznwpkxjrgfhstlzvmdyqbncoiutpxwzchrsfajgkyvbelkmnpqwiuzotcslfhdvnjarxgzhqwydbpkmvcnjfiwltqoszrvyxpgujedkhcmwbaztjnofrpvlhyqkxdugwszctbjmviarhfpyqowlknstzghxcpduijmrwfbvovqtlszkdhyfpcanugmjoqrwxtisvlkhbpzfuegpmtncxwrldjoabfuzkvqhsdygclmniprawojktvfbxzqsydhcnluiwrobyxfmpkjlazgsqchwdmntirvbkpjcfhyuzsxtqglaowvznrkiubfpheymcjxwvdtqgnpszolrbufymkqjhxvnscratwligkzpojyqfbduxmvsphewnzqljyoikbftchxmrwzcuvgsplqaenbdiyfwxoztcshjrmqgkapvhlbncsojtpxwzkyviunfrgmwxlceaqsdotbjrzfkhvupgtaolnwbmdjcvkqxyhwrsztoifgbzpxjrnfdmklqhcaeovuwtsvbgkrpfyzliubjwvtaqxchdnoemwqsytkfvzhrgijpluxbscozwmdnfhkyaropqjstglbvcxiwzfyrnlwvqdkpmstojhxgkcyzfrubapowcqtinmvzhlpdkyjgsxwqvfnrcbtoizhjquvxdflkgwspmtcvyqzbnwheosupjrxktcidlfvnqzgmlmvqhefwajhdsfgtkpzcnxioyrlwudvbkzqpfhxmcdtuwrnbjqylshzvkpqfghxutifmldvskajerobnqzpcwhtixvmydgszuaolwrpcknqhzjvfsldtbpymqiugxchawjfrdpszblmvektcoanxwuhqpkryijcvsfbzgtuxmowlydaejzhprxqwtvkcdgtnjflspkcyiubrwzvqeafhxodjntmkuplizchqwgstvbnfcyjwrkpohmxdilzatgsqfupoyhwbvknltzjcxiqsdferuovkwnghzxqbltsjfmciukpdaoyrwhnxvgeqtlzjrsbkpwfiqmhxuvdtonawcygslzkrqtefpbxdjihmvoycquznwpkxjrgfhstlzvmdyqbncoiutpxwzchrsfajgkyvbelkmnpqwiuzotcslfhdvnjarxgzhqwydbpkmvcnjfiwltqoszrvyxpgujedkhcmwbaztjnofrpvlhyqkxdugwszctbjmviarhfpyqowlknstzghxcpduijmrwfbvovqtlszkdhyfpcanugmjoqrwxtisvlkhbpzfuegpmtncxwrldjoabfuzkvqhsdygclmniprawojktvfbxzqsydhcnluiwrobyxfmpkjlazgsqchwdmntirvbkpjcfhyuzsxtqglaowvznrkiubfpheymcjxwvdtqgnpszolrbufymkqjhxvnscratwligkzpojyqfbduxmvsphewnzqljyoikbftchxmrwzcuvgsplqaenbdiyfwxoztcshjrmqgkapvhlbncsojtpxwzkyviunfrgmwxlceaqsdotbjrzfkhvupgtaolnwbmdjcvkqxyhwrsztoifgbzpxjrnfdmklqhcaeovuwtsvbgkrpfyzliubjwvtaqxchdnoemwqsytkfvzhrgijpluxbscozwmdnfhkyaropqjstglbvcxiwzfyrnlwvqdkpmstojhxgkcyzfrubapowcqtinmvzhlpdkyjgsxwqvfnrcbtoizhjquvxdflkgwspmtcvyqzbnwheosupjrxktcidlfvnqzgmowlknstzghxcpduijmrwfbvovqtlszkdhyfpcanugmjoqrwxtisvlkhbpzfuegpmtncxwrldjoabfuzkvqhsdygclmniprawojktvfbxzqsydhcnluiwrobyxfmpkjlazgsqchwdmntirvbkpjcfhyuzsxtqglaowvznrkiubfpheymcjxwvdtqgnpszolrbufymkqjhxvnscratwligkzpojyqfbduxmvsphewnzqljyoikbfkgwspmtcvyqzbnwheosupjrxklmvqhefwajhdsfgtkpzcnxioyrlwudvbkzqpfhxmcdtuwrnbjqylshzvkpqfghxutifmldvskajerobnqzpcwhtixvmydgszuaolwrpcknqhzjvfsldtbpymqiugxchawjfrdpszblmvektcoanxwuhqpkryijcvsfbzgtuxmowlydaejzhprxqwtvkcdgtnjflspkcyiubrwzvqeafhxodjntmkuplizchqwgstvbnfcyjwrkpohmxdilzatgsqfupoyhwbvknltzjcxiqsdferuovkwnghzxqbltsjfmciukpdaoyrwhnxvgeqtlzjrsbkpwfiqmhxuvdtonawcygslzkrqtefpbxdjihmvoycquznwpkxjrgfhstlzvmdyqbncoiutpxwzchrsfajgkyvbelkmnpqwiuzotcslfhdvnjarxgzhqwydbpkmvcnjfiwltqoszrvyxpgujedkhcmwbaztjnofrpvlhyqkxdugwszctbjmviarhfpyqowlknstzghxcpduijmrwfbvovqtlszkdhyfpcanugmjoqrwxtisvlkhbpzfuegpmtncxwrldjoabfuzkvqhsdygclmniprawojktvfbxzqsydhcnluiwrobyxfmpkjlazgsqchwdmntirvbkpjcfhyuzsxtqglaowvznrkiubfpheymcjxwvdtqgnpszolrbufymkqjhxvnscratwligkzpojyqfbduxmvsphewnzqljyoikbftchxmrwzcuvgsplqaenbdiyfwxoztcshjrmqgkapvhlbncsojtpxwzkyviunfrgmwxlceaqsdotbjrzfkhvupgtaolnwbmdjcvkqxyhwrsztoifgbzpxjrnfdmklqhcaeovuwtsvbgkrpfyzliubjwvtaqxchdnoemwqsytkfvzhrgijpluxbscozwmdnfhkyaropqjstglbvcxiwzfyrnlwvqdkpmstojhxgkcyzfrubapowcqtinmvzhlpdkyjgsxwqvfnrcbtoizhjquvxdflkgwspmtcvyqzbnwheosupjrxktcidlfvnqzgmlmvqhefwajhdsfgtkpzcnxioyrlwudvbkzqpfhxmcdtuwrnbjqylshzvkpqfghxutifmldvskajerobnqzpcwhtixvmydgszuaolwrpcknqhzjvfsldtbpymqiugxchawjfrdpszblmvektcoanxwuhqpkryijcvsfbzgtuxmowlydaejzhprxqwtvkcdgtnjflspkcyiubrwzvqeafhxodjntmkuplizchqwgstvbnfcyjwrkpohmxdilzatgsqfupoyhwbvknltzjcxiqsdferuovkwnghzxqbltsjfmciukpdaoyrwhnxvgeqtlzjrsbkpwfiqmhxuvdtonawcygslzkrqtefpbxdjihmvoycquznwpkxjrgfhstlzvmdyqbncoiutpxwzchrsfajgkyvbelkmnpqwiuzotcslfhdvnjarxgzhqwydbpkmvcnjfiwltqoszrvyxpgujedkhcmwbaztjnofrpvlhyqkxdugwszctbjmviarhfpyqowlknstzghxcpduijmrwfbvovqtlszkdhyfpcanugmjoqrwxtisvlkhbpzfuegpmtncxwrldjoabfuzkvqhsdygclmniprawojktvfbxzqsydhcnluiwrobyxfmpkjlazgsqchwdmntirvbkpjcfhyuzsxtqglaowvznrkiubfpheymcjxwvdtqgnpszolrbufymkqjhxvnscratwligkzpojyqfbduxmvsphewnzqljyoikbftchxmrwzcuvgsplqaenbdiyfwxoztcshjrmqgkapvhlbncsojtpxwzkyviunfrgmwxlceaqsdotbjrzfkhvupgtaolnwbmdjcvkqxyhwrsztoifgbzpxjrnfdmklqhcaeovuwtsvbgkrpfyzliubjwvtaqxchdnoemwqsytkfvzhrgijpluxbscozwmdnfhkyaropqjstglbvcxiwzfyrnlwvqdkpmstojhxgkcyzfrubapowcqtinmvzhlpdkyjgsxwqvfnrcbtoizhjquvxdflkgwspmtcvyqzbnwheosupjrxktcidlfvnqzgmowlknstzghxcpduijmrwfbvovqtlszkdhyfpcanugmjoqrwxtisvlkhbpzfuegpmtncxwrldjoabfuzkvqhsdygclmniprawojktvfbxzqsydhcnluiwrobyxfmpkjlazgsqchwdmntirvbkpjcfhyuzsxtqglaowvznrkiubfpheymcjxwvdtqgnpszolrbufymkqjhxvnscratwligkzpojyqfbduxmvsphewnzqljyoikbfkgwspmtcvyqzbnwheosupjrxk"}
    conocenos_controller.guardar(request, response)

    expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"La descripción no es valida. Intente una más corta"})
    done()
  })

  test("Debe guardar las descripciones",(done)=>{
    // Confirguración request
    request.body = {text_1:"¿Quiénes somos?", text_2:"consejos"}    
    conocenos_controller.guardar(request, response)

    setTimeout(()=>{
        expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Elemento guardado correctamente"})
        done()
    },80)  
  })

  test("Debe actualizar las descripciones",(done)=>{
    // Confirguración request
    request.body = {text_1:"¿Quiénes somos?", text_2:"consejos"}    
    conocenos_controller.guardar(request, response)

    setTimeout(()=>{
        expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Elemento actualizado correctamente"})
        done()
    },60)  
  })

  test("Borrado",(done)=>{
    conocenos_model.myModel.deleteMany({}).then((respuesta)=>{
        setTimeout(()=>{
            expect("ok").toBe("ok")
            done()
        },60)  
      })
    })
    
  afterAll(()=>{
    conocenos_model.myModel.deleteMany({}).then((respuesta)=>{})
  })

})
  
describe("post:/conocenos/listar", () =>{
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
   
    test("Debe guardar las descripciones",(done)=>{
        // Confirguración request
        request.body = {text_1:"¿Quiénes somos?", text_2:"consejos"}    
        conocenos_controller.guardar(request, response)
    
        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"Elemento guardado correctamente"})
            done()
        },60)  
      })

    test("Debe validar que exista un producto",(done)=>{
      // Confirguración request
      request.body = {}    
      conocenos_controller.listar(request, response)
  
      setTimeout(()=>{
          expect(response.json.mock.calls[0][0].length).toBe(1)
          done()
      },60)  
    })

    test("Borrado",(done)=>{
        conocenos_model.myModel.deleteMany({}).then((respuesta)=>{
            setTimeout(()=>{
                expect("ok").toBe("ok")
                done()
            },60)  
          })
        })
  
    afterAll(()=>{
      conocenos_model.myModel.deleteMany({}).then((respuesta)=>{})
    })
  
})
