const { validationResult } = require("express-validator")

const jsonTable = require('../database/jsonTable');
const products = jsonTable('products');

const productList = products.all()

const productsControllers = {
    products: (req, res) => {

        

        res.render('products/products',  { productList });
    },

    productDetail:(req, res) => {
        
        const idproduct = req.params.id

        const productfound = productList.find(product => product.id == idproduct)

        res.render('products/productDetail',{productfound: productfound});
    },

    productCart:(req, res) => {
        res.render('products/productCart')
    },

    productCreate:(req, res) => {
        res.render('products/productCreate')
    },
}

module.exports= productsControllers