
const path = require('path');
const { body } = require('express-validator')

const userProfilevalidations=[
  body('Street')
    .notEmpty().withMessage('Debes ingresar una direccion').bail(),
  body('ZipCode')
    .notEmpty().withMessage('Debes ingresar un Codigo pstalo').bail(),
  body('City')
    .notEmpty().withMessage('Debes ingresar una ciudad').bail(),
  body('Town')
    .notEmpty().withMessage('Debes ingresar un Pueblo').bail(),
]

module.exports = userProfilevalidations