const express = require('express'); 
const router = express.Router(); 

const MensagensController = require('./routes-mariajulia'); 

router.use('/', RotasMariajulia);

router.get('/mensagens', MensagensController.listarMensagens); 
router.post('/mensagens', MensagensController.cadastrarMensagens); 
router.patch('/mensagens/:id_mens', MensagensController.editarMensagens); 
router.delete('/mensagens/:id_mens', MensagensController.apagarMensagens); 


module.exports = router;