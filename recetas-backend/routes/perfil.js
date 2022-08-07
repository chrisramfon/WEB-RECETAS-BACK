var express = require('express');
var router = express.Router();
const perfil = require('../controllers/perfil');

router.post('/', perfil.buscar);

router.post('/Seguidores', perfil.seguidores);

router.post('/Seguidos', perfil.seguidos);

router.post('/ValidaSeguido', perfil.validaseguido);

router.post('/Seguir', perfil.seguir);

router.post('/DejarSeguir', perfil.dejarseguir)

module.exports = router;