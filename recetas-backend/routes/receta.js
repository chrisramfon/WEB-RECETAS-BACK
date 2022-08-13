var express = require('express');
var router = express.Router();
const receta = require('../controllers/receta');

router.post('/', receta.reg);

router.get('/', receta.explore);

router.post('/encontrar', receta.encontrar);

router.post('/ValidaFavorito', receta.favorito);

router.post('/GuardarFavorito', receta.gfavorito);

router.post('/Favoritos', receta.lfavorito);

router.post ('/Usuario', receta.usuario);

router.post ('/Modificar', receta.modificar)
module.exports = router;