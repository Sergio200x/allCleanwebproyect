const { validationResult } = require("express-validator");
const jsonTable = require('../database/jsonTable');
const products = jsonTable('products');
const constants = require('../database/constants');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const usersControllers = require('./usersController')

const Product = db.Product;
const Category = db.Category;



const productsControllers = {
    products: async (req, res) => {
        //const productList = products.all()
        try {
            const categories = await Category.findAll();
            const productList = await Product.findAll({
                include : ["Image"],
            })
            res.render('products/products',  { productList, constants, categories });
        } catch (error) {
            console.log(error);
        }
    },

    productDetail: async (req, res) => {
        try{
            const idproduct = req.params.id
            //const productList = products.all()
            //const productfound = productList.find(product => product.id == idproduct)
            const categories = await Category.findAll();
            const productfound = await Product.findByPk(idproduct, {
                include : ["Image"],
            })
            res.render('products/productDetail',{productfound: productfound, constants, categories});

        }catch (error) {
            console.log(error);
        }
    },

    productCategory: async (req, res) => {
        try{
            const selectedCategory = req.params.category
            //productsFilter = products.all();

            // if(selectedCategory){
            //     productsFilter = productsFilter.filter(producto =>  producto.category == selectedCategory)
            //         if(!productsFilter.length){
            //             productsFilter = undefined;
            //         }
            // }else{
            //     productsFilter = undefined;
            // }

            const categories = await Category.findAll();
            const productsFilter = await Product.findAll({
                include : ["Image", "Category"],
            })       
            res.render('products/productCategory', {productsFilter: productsFilter, selectedCategory, constants, categories})
        }catch (error) {
            console.log(error);
        }
    },

    productCart: async (req, res) => {
        try{
            const categories = await Category.findAll();      
            res.render('products/productCart', {constants, categories})
        }catch (error) {
            console.log(error);
        }
    },

    productCreate: async(req, res) => {
        try{
            const categories = await Category.findAll();      
            res.render('products/productCreate', {constants, categories})
        }catch (error) {
            console.log(error);
        }
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

    productEdit: async (req, res) => {
        try{
            const IdProduct = req.params.id;
            const categories = await Category.findAll(); 
            //const productToEdit = products.find(IdProduct);
            const productToEdit = await Product.findByPk(IdProduct, {
            include : ["Image", "Category"],
            where: {
                ProductID: IdProduct,
            }
        })

		res.render('products/productEdit', {productToEdit: productToEdit, constants, categories})
        }catch (error) {
            console.log(error);
        }
        
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