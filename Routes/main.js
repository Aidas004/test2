const express = require('express')
const router = express.Router()

const {register, login, getAll, update} = require('../Controllers/main')
const { reg } = require('../middleware/main')

router.all("/register", reg, register)
router.all("/login", login)
router.all("/manage", getAll)
router.all("/update", update)


module.exports = router