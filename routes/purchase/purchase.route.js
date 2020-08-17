const express = require('express')
const Purchase = require('../../controllers/purchase/purchase.controller')

const router = express.Router()

router.post('/create', Purchase.create)

module.exports = router