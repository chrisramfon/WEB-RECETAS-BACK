var express = require('express');
var router = express.Router();
const receta = require('../controllers/receta');

router.post('/', receta.reg);


module.exports = router;