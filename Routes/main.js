const express = require('express')
const router = express.Router()

const {test} = require('../Controllers/main')

router.all("/", test)


module.exports = router