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
const User = db.User;
const Image = db.Image;



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
    
    processCreate: async (req,res)=>{
        try{
            const resultvalidations = validationResult(req);
            const categories = await Category.findAll();
            const userLogged = req.session.userLogged.UserID;
            
            const newProduct = req.body;

            if(!resultvalidations.isEmpty())
            {
                res.render('products/productCreate',{
                    errors: resultvalidations.mapped(),
                    oldData: req.body,
                    constants,
                    categories
                })}
            else
            {
               categorieFound = categories.find(category => category.Name == newProduct.category)

               console.log('ENCONTRE LA CATEGORIA <<<<<<<<<<<<<<<<<<');
               console.log(newProduct.category);
               console.log(categorieFound);
                   
               const product = await Product.create({
                    include: ["User", "Category", "Image"],
                    Name: newProduct.name,
                    Description: newProduct.description,
                    Price: newProduct.price,
                    IsOffer: newProduct.isOffer ? newProduct.isOffer == 'ofertado' ? 1 : 0 : 0,
                    Discount: newProduct.discount ? newProduct.discount : 0,
                    Quantity: newProduct.quantity,
                    UserID: userLogged,
                    CategoryID: categorieFound.CategoryID
                })
                await Image.create({
                    Name: req.file ? req.file.filename : 'no-photo.jpeg',
                    ProductID : product.ProductID
                })  
                
                res.redirect('/products/')
            }
        }catch (error) {
            console.log(error);
        }
    },

    productEdit: async (req, res) => {
        try{
            const IdProduct = req.params.id;
            const categories = await Category.findAll(); 
            const userTypeLogged = req.session.userLogged.UserTypeID;
            const userLogged = req.session.userLogged.UserID;  

            if(userTypeLogged == 1){
                productList = await Product.findAll({
                    where:{UserID : userLogged},
                    include : ["Image"]
                })

                productFound = productList.find(product => product.ProductID == IdProduct);

                if(!productFound){
                    return res.redirect('/products/');
                }
            }

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