const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/usersController');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const validations = require('../middlewares/userValidations');
const upload = require('../middlewares/userAvatarStorage');

//GET LOGIN PAGE 
router.get('/login/', guestMiddleware, usersControllers.userLogin)
router.post('/login/', usersControllers.processLogin)

//CREATE ONE USER
router.get('/register/', guestMiddleware, usersControllers.userRegister)
router.post('/register/', upload, validations, usersControllers.processRegister)

//EDIT ONE USER
router.get('/edit/:id/', usersControllers.userEdit);
router.put('/edit/:id/', upload , validations, usersControllers.processEdit);

//PROFILE
router.get('/userProfile/', authMiddleware, usersControllers.profile)
router.get('/logout/', authMiddleware, usersControllers.logout)

//DELETE ONE USER 
router.delete('/delete/:id', usersControllers.userDestroy);

module.exports = router;