const express = require('express')
const router = express.Router()
const productsControllers = require('../controllers/productsController')

// GET ALL PRODUCTS
router.get('/', productsControllers.products)

//GET ONE PRODUCT
router.get('/detail/:id/', productsControllers.productDetail)

//GET CART PRODUCTS
router.get('/cart/', productsControllers.productCart)

//CREATE ONE PRODUCT
router.get('/create/', productsControllers.productCreate)


module.exports = router;