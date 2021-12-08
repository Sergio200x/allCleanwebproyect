const express = require('express')
const router = express.Router()
const controllers = require('../controllers/mainControllers')

router.get('/', controllers.register)


module.exports = router;