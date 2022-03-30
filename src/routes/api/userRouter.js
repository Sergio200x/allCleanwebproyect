const express = require('express')
const router = express.Router()
const userApiController = require('../../controllers/api/userController.js')

//GET ALL USERS
router.get('/api/users', userApiController.users)

//GET ONE USER
router.get('/api/user/:id', userApiController.userDetail)



module.exports = router;