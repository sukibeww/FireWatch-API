const express = require('express')
const router = express.Router();
const { getNSW } = require('../controller/nsw')

router.get('/nsw', getNSW )

module.exports = router;