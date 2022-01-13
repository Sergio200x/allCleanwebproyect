const express = require('express')
const { body } = require('express-validator')
const multer = require('multer')
const router = express.Router()
const productsControllers = require('../controllers/productsController')
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/products')
    },
    filename: function (req, file, cb) {
      let fileName = `product-${Date.now()}${path.extname(file.originalname)}`;
      cb(null, fileName);
    }
  })
  
var upload = multer({storage: storage}).single('photo');

const validations =[
    body('name')
      .notEmpty().withMessage('Debes ingresar un Nombre para el producto').bail()
      .isLength({ min: 6 }).withMessage('El nombre debe tener un mínimo de 6 caracteres').bail()
      .isLength({ max: 30 }).withMessage('El nombre debe tener un máximo de 30 caracteres'),
    body('description')
      .notEmpty().withMessage('Debes ingresar una descripción').bail()
      .isLength({ min: 6 }).withMessage('La descripción debe tener un mínimo de 6 caracteres'),
    body('category')
      .notEmpty().withMessage('Debes elegir una categoría'),
    body('price')
      .notEmpty().withMessage('Debes ingresar un precio para el producto').bail()
      .isNumeric().withMessage('Solo se admiten números').bail()
      .isInt({ min:1}).withMessage('El precio debe ser mayor a cero'),
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

//GET ALL PRODUCTS
router.get('/', productsControllers.products)

//GET ONE PRODUCT
router.get('/detail/:id/', productsControllers.productDetail)

//GET PRODUCTS FOR CATEGORY
router.get('/category/:category/', productsControllers.productCategory)

//GET CART PRODUCTS
router.get('/cart/', productsControllers.productCart)

//CREATE ONE PRODUCT
router.get('/create/', productsControllers.productCreate)
router.post('/create/', upload, validations, productsControllers.processCreate)

//EDIT ONE PRODUCT
router.get('/edit/:id/', productsControllers.productEdit);
router.put('/edit/:id/', upload , validations, productsControllers.processEdit);

//DELETE ONE PRODUCT 
router.delete('/delete/:id', productsControllers.productDestroy); 


module.exports = router;