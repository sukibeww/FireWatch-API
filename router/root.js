const express = require('express')
const router = express.Router();
const { getAll } = require('../controller/root')

router.get('/', getAll )

module.exports = router;