const { validationResult } = require("express-validator")
const jsonTable = require('../database/jsonTable');
const products = jsonTable('products');
const constants = require('../database/constants')


const productsControllers = {
    products: (req, res) => {
        const productList = products.all()

        res.render('products/products',  { productList, constants });
    },

    productDetail:(req, res) => {
        const idproduct = req.params.id
        const productList = products.all()
        const productfound = productList.find(product => product.id == idproduct)

        res.render('products/productDetail',{productfound: productfound, constants});
    },

    productCategory:(req, res) => {
        
        const selectedCategory = req.params.category
        productsFilter = products.all();

        if(selectedCategory){
			productsFilter = productsFilter.filter(producto =>  producto.category == selectedCategory)
				if(!productsFilter.length){
					productsFilter = undefined;
				}
		}else{
            productsFilter = undefined;
        }
	
		res.render('products/productCategory', {productsFilter: productsFilter, selectedCategory, constants})
    },

    productCart:(req, res) => {
        res.render('products/productCart', {constants})
    },

    productCreate:(req, res) => {
        res.render('products/productCreate', {constants})
    },
    
    processCreate:(req,res)=>{
        const resultvalidations = validationResult(req);
        
		let newproduct = req.body

        if(!resultvalidations.isEmpty())
        {
            res.render('products/productCreate',{
                errors: resultvalidations.mapped(),
                oldData: req.body,
                constants
            })}
        else
        {
            products.createProduct(newproduct, req)
            res.redirect('/products/')
        }
    },

    productEdit:(req, res) => {
        const IdProduct = req.params.id;
		const productToEdit = products.find(IdProduct);

		res.render('products/productEdit', {productToEdit: productToEdit, constants})
    },

    processEdit: (req, res)=> {
        const resultvalidations = validationResult(req);
        const IdProduct = req.params.id;
        const productToEdit = products.find(IdProduct);
		const keepImage = productToEdit.image
        
		let productEdited = req.body
        
        if(!resultvalidations.isEmpty())
        {
            res.render('products/productEdit',{
                errors: resultvalidations.mapped(),
                oldData: req.body,
                productToEdit : productToEdit, 
                constants
            })}
        else
        {
            products.updateProduct(productEdited, req, keepImage, IdProduct)
            res.redirect('/products/')
        }
    },

    productDestroy: (req, res) => {
		const IdProducto = req.params.id

		products.delete(IdProducto)

		res.redirect('/products')
	}
}

module.exports= productsControllers