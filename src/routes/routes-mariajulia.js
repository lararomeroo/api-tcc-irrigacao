const express = require('express'); 
const router = express.Router(); 

const MensagensController = require('../controllers/mensagens'); 


router.get('/mensagens', MensagensController.listarMensagens); 
router.post('/mensagens', MensagensController.cadastrarMensagens); 
router.patch('/mensagens/:id_mens', MensagensController.editarMensagens); 
router.delete('/mensagens/:id_mens', MensagensController.apagarMensagens); 


module.exports = router;