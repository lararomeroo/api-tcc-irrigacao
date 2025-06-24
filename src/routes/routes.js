const express = require('express'); 
const router = express.Router(); 

const RotasLara = require('./routes-lara'); 
const RotasLara = require('./routes-giulia'); 
const RotasLara = require('./routes-laura'); 
const RotasLara = require('./routes-stefany'); 
const RotasLara = require('./routes-raphael'); 
const RotasLara = require('./routes-mariajulia'); 

router.use('/', RotasLara);
router.use('/', RotasGiulia);
router.use('/', RotasLaura);
router.use('/', RotasStefany);
router.use('/', RotasRaphael);
router.use('/', RotasMariajulia);

module.exports = router;