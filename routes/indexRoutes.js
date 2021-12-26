const express = require('express')
const router = express.Router()
const controllers = require('../controllers/mainControllers')

router.get('/', controllers.index)
router.get('/search', controllers.search)


module.exports = router;