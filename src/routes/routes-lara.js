const express = require('express'); 
const router = express.Router(); 

const LeituraController = require('../controllers/leitura'); 

router.get('/leitura', LeituraController.listarLeitura); 
router.get('/leituratipo', LeituraController.buscarLeituraPorUsuarioETipo); 
router.post('/leitura', LeituraController.cadastrarLeitura); 
router.patch('/leitura/:id', LeituraController.editarLeitura); 
router.delete('/leitura/:id', LeituraController.apagarLeitura); 


module.exports = router;