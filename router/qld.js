const express = require('express');
const router = express.Router();
const { getQLD } = require('../controller/qld');

router.get('/qld', getQLD );

module.exports = router;