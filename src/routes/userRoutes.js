const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/usersController');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const validations = require('../middlewares/userValidations');
const loginValidations = require('../middlewares/userLoginValidations');
const userProfilevalidations=require('../middlewares/userProfileValidations');
const upload = require('../middlewares/userAvatarStorage');

//GET LOGIN PAGE 
router.get('/login/', guestMiddleware, usersControllers.userLogin);
router.post('/login/', guestMiddleware, loginValidations, usersControllers.processLogin);

//CREATE ONE USER
router.get('/register/', guestMiddleware, usersControllers.userRegister);
router.post('/register/', upload, validations, guestMiddleware, usersControllers.processRegister);

//EDIT ONE USER
router.get('/edit/:id/', authMiddleware, usersControllers.userEdit);
router.put('/edit/:id/', authMiddleware, upload , validations, usersControllers.processEdit);

//PROFILE
router.get('/userProfile/', authMiddleware, usersControllers.profile);
router.post('/userProfile/',authMiddleware,userProfilevalidations,usersControllers.profileEdit);
router.get('/logout/', authMiddleware, usersControllers.logout);

//DELETE ONE USER 
router.delete('/delete/:id', authMiddleware, usersControllers.userDestroy);

//GET USER PRODUCTS
router.get('/userProducts', authMiddleware, usersControllers.userProducts);


module.exports = router;