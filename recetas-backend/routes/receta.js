var express = require('express');
var router = express.Router();
const receta = require('../controllers/receta');

router.post('/', receta.reg);

router.get('/', receta.explore);

router.get('/encontrar', receta.encontrar);

module.exports = router;