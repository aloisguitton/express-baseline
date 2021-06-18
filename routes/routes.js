let express = require('express');
let router = express.Router();

const Ctrl = require('../controllers/controllers');

router.get('/', Ctrl.get);


module.exports = router;