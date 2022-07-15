var express = require('express');
var router = express.Router();
const receta = require('../controllers/receta');

router.post('/', receta.reg);
router.get('/img', receta.img);

module.exports = router;