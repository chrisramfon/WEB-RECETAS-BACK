var express = require('express');
var router = express.Router();
const home = require('../controllers/home');

router.post('/', home.show);

module.exports = router;