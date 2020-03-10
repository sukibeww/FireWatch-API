const express = require('express')
const router = express.Router();
const { getSouth } = require('../controller/south')

router.get('/south', getSouth )

module.exports = router;