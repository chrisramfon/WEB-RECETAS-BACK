var express = require('express');
var router = express.Router();
const perfil = require('../controllers/perfil');

router.post('/', perfil.buscar);

module.exports = router;