const express = require('express')
const { body } = require('express-validator')
const multer = require('multer')
const router = express.Router()
const controllers = require('../controllers/mainControllers')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/avatars')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
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
    body('validarPassword').notEmpty().withMessage('Debes reingresar tu Password'),
]

router.get('/', controllers.register)

router.post('/', upload.single('avatar'), validations, controllers.processRegister)


module.exports = router;