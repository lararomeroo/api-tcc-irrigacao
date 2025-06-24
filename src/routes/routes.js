const express = require('express'); 
const router = express.Router(); 

const RotasLara = require('./routes-lara'); 

router.use('/', RotasLara);

module.exports = router;