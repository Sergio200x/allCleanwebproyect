const express = require('express')
const router = express.Router()
const controllers = require('../controllers/mainControllers')

router.get('/', controllers.productCart)


module.exports = router;