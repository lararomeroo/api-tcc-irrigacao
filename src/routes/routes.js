const express = require('express'); 
const router = express.Router(); 

const LeituraController = require('../controllers/leitura'); 

router.get('/leitura', LeituraController.listarLeitura); 
router.post('/leitura', LeituraController.cadastrarLeitura); 
router.patch('/leitura', LeituraController.editarLeitura); 
router.delete('/leitura', LeituraController.apagarLeitura); 


module.exports = router;