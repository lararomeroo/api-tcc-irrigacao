const express = require('express'); 
const router = express.Router(); 

const RotasLara = require('./routes-lara'); 
const RotasGiulia = require('./routes-giulia'); 
const RotasLaura = require('./routes-laura'); 
const RotasStefany = require('./routes-stefany'); 
const RotasRaphael = require('./routes-raphael'); 
const RotasMariajulia = require('./routes-mariajulia'); 

router.use('/', RotasLara);
router.use('/', RotasGiulia);
router.use('/', RotasLaura);
router.use('/', RotasStefany);
router.use('/', RotasRaphael);
router.use('/', RotasMariajulia);

module.exports = router;