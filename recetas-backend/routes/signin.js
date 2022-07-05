var express = require('express');
var router = express.Router();
const signin = require('../controllers/signin');

router.post('/', signin.reg);

module.exports = router;