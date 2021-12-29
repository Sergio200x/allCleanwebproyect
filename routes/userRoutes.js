const express = require('express')
const { body } = require('express-validator')
const multer = require('multer')
const router = express.Router()
const usersControllers = require('../controllers/usersController')
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/avatars')
    },
    filename: function (req, file, cb) {
      let fileName = `Avatar-${Date.now()}${path.extname(file.originalname)}`;
      cb(null, fileName);
    }
  })
  
const upload = multer({ storage: storage })

const validations =[
    body('nombreCompleto').notEmpty().withMessage('Debes ingresar un Nombre y Apellido'),
    body('usuario').notEmpty().withMessage('Debes ingresar un Nombre de Usuario'),
    body('email')
        .notEmpty().withMessage('Debes ingresar un Email').bail()
        .isEmail().withMessage('Debes ingresar un Email Valido'),
    body('password').notEmpty().withMessage('Debes ingresar un Password'),
    body('validarPassword').notEmpty().withMessage('Debes ingresar un Password'),
]

//GET LOGIN PAGE 
router.get('/login/', usersControllers.login)

//GET REGISTER PAGE 
router.get('/register/', usersControllers.register)

//PROCESS REGISTER
router.post('/register/', upload.single('avatar'), validations, usersControllers.processRegister)


module.exports = router;