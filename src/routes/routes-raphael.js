const express = require('express'); 
const router = express.Router(); 

const locaisirrigacaoController = require('../controllers/locais_irrigacao'); 

router.get('/locais-irrigacao', locaisirrigacaoController.listarLocaisIrrigacao); 
router.post('/locais-irrigacao', locaisirrigacaoController.cadastrarLocalIrrigacao); 
router.patch('/locais-irrigacao/:id', locaisirrigacaoController.editarLocalIrrigacao); 
router.delete('/locais-irrigacao/:id', locaisirrigacaoController.apagarLocalIrrigacao); 


module.exports = router;