const express = require('express')
const router = express.Router()
const userApiController = require('../../controllers/api/userController.js')

//GET ALL USERS
router.get('/api/users', userApiController.users)

//GET USER SEARCH NAV BAR
//router.get('/search', userApiController.search)



module.exports = router;