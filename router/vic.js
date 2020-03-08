const express = require('express')
const router = express.Router();
const { getVIC } = require('../controller/vic')

router.get('/vic', getVIC )

module.exports = router;