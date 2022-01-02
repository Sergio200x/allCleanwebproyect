const { validationResult } = require("express-validator")
const jsonTable = require('../database/jsonTable');
const products = jsonTable('products');

const productList = products.all()

const productsControllers = {
    products: (req, res) => {
        const productList = products.all()

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
    },

    productEdit:(req, res) => {
        const IdProducto = req.params.id;
		const productToEdit = products.find(IdProducto);

		res.render('products/productEdit', {productToEdit: productToEdit})
    },

    processEdit: (req, res)=> {
        const resultvalidations = validationResult(req);
        const IdProducto = req.params.id;
        const productToEdit = products.find(IdProducto);
		const keepImage = productToEdit.image
        
		let productEdit = req.body
        
        if(!resultvalidations.isEmpty())
        {
            res.render('products/productEdit',{
                errors: resultvalidations.mapped(),
                oldData: req.body
            })}
        else
        {
            idProduct = products.updateProduct(productEdit, req, keepImage, IdProducto)
            res.redirect('/products/')
        }
    }
}

module.exports= productsControllers