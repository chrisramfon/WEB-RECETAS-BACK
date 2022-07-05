var express = require('express');
var router = express.Router();
const login = require('../controllers/login');

router.post('/', login.log);

module.exports = router;