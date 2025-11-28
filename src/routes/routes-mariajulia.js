const express = require('express'); 
const router = express.Router(); 

const MensagensController = require('../controllers/mensagens'); 
const LocalIrrigacaoCOntroller = require('../controllers/locais_irrigacao');


router.get('/mensagens', MensagensController.listarMensagens); 
router.post('/mensagens', MensagensController.cadastrarMensagens); 
router.patch('/mensagens/:id_mens', MensagensController.editarMensagens); 
router.delete('/mensagens/:id_mens', MensagensController.apagarMensagens); 

router.get('/local', LocalIrrigacaoCOntroller.listarLocaisIrrigacao); 
router.post('/local', LocalIrrigacaoCOntroller.cadastrarLocalIrrigacao); 
router.patch('/local/:id', LocalIrrigacaoCOntroller.editarLocalIrrigacao); 
router.delete('/local/:id', LocalIrrigacaoCOntroller.apagarLocalIrrigacao); 


module.exports = router;