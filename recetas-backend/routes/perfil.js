var express = require('express');
var router = express.Router();
const perfil = require('../controllers/perfil');

router.post('/', perfil.buscar);

router.post('/Seguidores', perfil.seguidores);

module.exports = router;