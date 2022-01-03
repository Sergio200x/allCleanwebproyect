const express = require('express')
const router = express.Router()
const mainControllers = require('../controllers/mainController')

//GET INDEX PAGE
router.get('/', mainControllers.index)

//GET USER SEARCH NAV BAR
router.get('/search', mainControllers.search)


module.exports = router;

