const express = require('express');
const router = express.Router();
const productsControllers = require('../controllers/productsController');
const validations = require('../middlewares/productValidations');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/productImageStorage');

//GET ALL PRODUCTS
router.get('/', productsControllers.products)

//GET ONE PRODUCT
router.get('/detail/:id/', productsControllers.productDetail)

//GET PRODUCTS FOR CATEGORY
router.get('/category/:category/', productsControllers.productCategory)

//GET CART PRODUCTS
router.get('/cart/', authMiddleware, productsControllers.productCart)

//CREATE ONE PRODUCT
router.get('/create/', authMiddleware, productsControllers.productCreate)
router.post('/create/', upload, validations, authMiddleware, productsControllers.processCreate)

//EDIT ONE PRODUCT
router.get('/edit/:id/', authMiddleware, productsControllers.productEdit);
router.put('/edit/:id/', upload , validations, authMiddleware, productsControllers.processEdit);

//DELETE ONE PRODUCT 
router.delete('/delete/:id', authMiddleware, productsControllers.productDestroy); 





module.exports = router;