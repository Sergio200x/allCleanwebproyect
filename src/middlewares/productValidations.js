const { body } = require('express-validator')
const path = require('path');

const validations=[
  body('name')
    .notEmpty().withMessage('El nombre del producto no puede estar vacio').bail()
    .isLength({ min: 5 }).withMessage('El nombre debe tener un mínimo de 5 caracteres').bail()
    .isLength({ max: 30 }).withMessage('El nombre debe tener un máximo de 30 caracteres'),
  body('description')
    .notEmpty().withMessage('Debes ingresar una descripción').bail()
    .isLength({ min: 20 }).withMessage('La descripción debe tener un mínimo de 20 caracteres').bail()
    .isLength({ max: 45 }).withMessage('La descripción debe tener un máximo de 45 caracteres'),
  body('category')
    .notEmpty().withMessage('Debes elegir una categoría'),
  body('price')
    .notEmpty().withMessage('Debes ingresar un precio para el producto').bail()
    .isDecimal({ min:1}).withMessage('El precio debe ser mayor a cero'),
  body('quantity')
    .notEmpty().withMessage('Debes ingresar al menos 1 unidad para el producto').bail()
    .isNumeric().withMessage('Solo se admiten números').bail()
    .isInt({ min:1}).withMessage('La cantidad debe ser mayor a cero'),
  body('photo').custom((value, {req})=>{
    const file = req.file;
    const acceptedExtensions = ['.jpg', '.jpeg', '.gif', '.png'];
    if(file){
      const fileExtension = path.extname(file.originalname)
      if(!acceptedExtensions.includes(fileExtension)){
        throw new Error(`Las extensiones válidas son ${acceptedExtensions.join(', ')}`);
      }
    }
    return true
  }),
  body('discount').custom((value, { req }) => {
      const isOffer = req.body.isOffer
      if(isOffer == 'ofertado'){
          
          if(value <= 0){
              throw new Error('Descuento inválido');
          }

          if(!parseInt(value)){
            throw new Error('Sólo se admiten números');
          }
      }
      return true
    })
  ]

  module.exports = validations