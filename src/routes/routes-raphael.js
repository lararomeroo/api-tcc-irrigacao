const express = require('express'); 
const router = express.Router(); 

const locaisirrigacaoController = require('../controllers/locais_irrigacao'); 

router.get('/locais-irrigacao', locaisirrigacaoController.listarlocais_irrigacao); 
router.post('/locais-irrigacao', locaisirrigacaoController.cadastrarlocais_irrigacao); 
router.patch('/locais-irrigacao/:id', locaisirrigacaoController.editarlocais_irrigacao); 
router.delete('/locais-irrigacao/:id', locaisirrigacaoController.apagarlocais_irrigacao); 


module.exports = router;