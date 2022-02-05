const express = require('express');
const router = express.Router();
const productsControllers = require('../controllers/productsController');
const validations = require('../middlewares/productValidations');
const upload = require('../middlewares/productImageStorage');

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

//PRODUCT OWNER
router.get('/productowner', productsControllers.productOwner)

        //EDIT ONE PRODUCT
        router.get('/edit/:id/', productsControllers.productEdit);
        router.put('/edit/:id/', upload , validations, productsControllers.processEdit);

        //DELETE ONE PRODUCT 
        router.delete('/delete/:id', productsControllers.productDestroy); 




module.exports = router;