const express = require('express'); 
const router = express.Router(); 

const UsuarioController = require('../controllers/usuario'); 

router.get('/usuarios', UsuarioController.listarUsuarios); 
router.post('/usuarios', UsuarioController.cadastrarUsuarios); 
router.patch('/usuarios/:id_usu', UsuarioController.editarUsuarios); 
router.delete('/usuarios/:id_usu', UsuarioController.apagarUsuarios); 
router.get('/login', UsuarioController.login);


module.exports = router;