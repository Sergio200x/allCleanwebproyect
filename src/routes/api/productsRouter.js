const express = require('express')
const router = express.Router()
const productApiController = require('../../controllers/api/productController.js')

//GET ALL PRODUCTS
router.get('/api/products', productApiController.products)

//GET ONE PRODUCT
router.get('/api/product/:id', productApiController.productDetail)


module.exports = router;