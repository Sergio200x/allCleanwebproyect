const path = require('path');
const { body } = require('express-validator')


const loginValidations=[
  body('email')
    .notEmpty().withMessage('Debes ingresar un Email').bail()
    .isEmail().withMessage('Debes ingresar un Email valido'),
  body('password')
    .notEmpty().withMessage('Debes ingresar un Password').bail()
    .isLength({ min: 8 }).withMessage('El password debe tener un mínimo de 8 caracteres'),
]

module.exports = loginValidations