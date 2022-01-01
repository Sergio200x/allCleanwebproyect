const { validationResult } = require("express-validator")
const jsonTable = require('../database/jsonTable');
const products = jsonTable('products');

const productList = products.all()

const productsControllers = {
    products: (req, res) => {
<<<<<<< HEAD

        
=======
        const productList = products.all()
>>>>>>> 8f7c5ba8f835f4f62170c39c4b8692aa8e315b31

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
    
    processCreate:(req,res)=>{
        const resultvalidations = validationResult(req);
        
		let newproduct = req.body

        if(!resultvalidations.isEmpty())
        {
            res.render('products/productCreate',{
                errors: resultvalidations.mapped(),
                oldData: req.body
            })}
        else
        {
            idProduct = products.createProduct(newproduct, req)
            res.redirect('/products/detail/' + idProduct)
        }
    }
}

module.exports= productsControllers