const path = require('path');
const { body } = require('express-validator')


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

module.exports = validations