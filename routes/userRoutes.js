const express = require('express')
const { body } = require('express-validator')
const multer = require('multer')
const router = express.Router()
const usersControllers = require('../controllers/usersController')
const path = require('path');
const guestMiddleware=require('../middlewares/guestMiddleware');
const authMiddleware=require('../middlewares/authMiddleware');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/avatars')
    },
    filename: function (req, file, cb) {
      let fileName = `Avatar-${Date.now()}${path.extname(file.originalname)}`;
      cb(null, fileName);
    }
  })
  
var upload = multer({storage: storage}).single('avatar');

const validations=[
  body('userType').notEmpty().withMessage('Debes ingresar un tipo de usuario'),
  body('name')
    .notEmpty().withMessage('Debes ingresar un Nombre y Apellido').bail()
    .isLength({ min: 6 }).withMessage('El nombre debe tener un mínimo de 6 caracteres'),
  body('user')
    .notEmpty().withMessage('Debes ingresar un Nombre de Usuario').bail()
    .isLength({ min: 5 }).withMessage('El usuario debe tener un mínimo de 5 caracteres'),
  body('email')
    .notEmpty().withMessage('Debes ingresar un Email').bail()
    .isEmail().withMessage('Debes ingresar un Email valido'),
  body('password')
    .notEmpty().withMessage('Debes ingresar un Password').bail()
    .isLength({ min: 6 }).withMessage('El password debe tener un mínimo de 6 caracteres'),
  body('validarPassword')
    .notEmpty().withMessage('Debes ingresar un Password').bail()
    .isLength({ min: 6 }).withMessage('El password debe tener un mínimo de 5 caracteres'),
  body('avatar').custom((value, {req})=>{
    const file = req.file;
    const acceptedExtensions = ['.jpg', '.jpeg', '.gif', '.png'];
    if(file){
      const fileExtension = path.extname(file.originalname)
      if(!acceptedExtensions.includes(fileExtension)){
        throw new Error(`Las extensiones válidas son ${acceptedExtensions.join(', ')}`);
      }
    }
    return true
  })
]





//GET LOGIN PAGE 
router.get('/login/',guestMiddleware,usersControllers.userLogin)
router.post('/login/',usersControllers.processLogin)
//CREATE ONE USER
router.get('/register/', guestMiddleware,usersControllers.userRegister)
router.post('/register/', upload, validations, usersControllers.processRegister)

//EDIT ONE USER
router.get('/edit/:id/', usersControllers.userEdit);
router.put('/edit/:id/', upload , validations, usersControllers.processEdit);

//PROFILE
router.get('/userProfile/',authMiddleware,usersControllers.profile)
router.get('/logout/',authMiddleware,usersControllers.logout)

//DELETE ONE USER 
router.delete('/delete/:id', usersControllers.userDestroy); 

module.exports = router;