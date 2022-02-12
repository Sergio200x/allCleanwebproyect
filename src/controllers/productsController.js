const { validationResult } = require("express-validator");
const jsonTable = require('../database/jsonTable');
const products = jsonTable('products');
const constants = require('../database/constants');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const usersControllers = require('./usersController');
const { is } = require("express/lib/request");

const Product = db.Product;
const Category = db.Category;
const Image = db.Image;

const productsControllers = {
    products: async (req, res) => {
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
            const IdProduct = req.params.id;
            const categories = await Category.findAll();
            const productfound = await Product.findByPk(IdProduct, {
                include : ["Image"],
            })
            res.render('products/productDetail',{productfound: productfound, constants, categories});

        }catch (error) {
            console.log(error);
        }
    },

    productCategory: async (req, res) => {
        try{
            const selectedCategory = req.params.category;
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
            })

		    res.render('products/productEdit', {productToEdit: productToEdit, constants, categories})
        }catch (error) {
            console.log(error);
        }
    },

    processEdit: async (req, res)=> {
        try{
            const resultvalidations = validationResult(req);
            const IdProduct = req.params.id;
            const categories = await Category.findAll();
            const userLogged = req.session.userLogged.UserID;
            const productToEdit = await Product.findByPk(IdProduct, {
                include: ["User", "Category", "Image"],
                where: {
                    ProductID: IdProduct,
                }
            });
            
            let productEdited = req.body
            
            if(!resultvalidations.isEmpty())
            {
                res.render('products/productEdit',{
                    errors: resultvalidations.mapped(),
                    oldData: req.body,
                    productToEdit : productToEdit, 
                    constants,
                    categories
                })
            }else
            {
                categorieFound = categories.find(category => category.Name == productEdited.category);
                   
                const product = await Product.update({
                    include: ["User", "Category", "Image"],
                    Name: productEdited.name,
                    Description: productEdited.description,
                    Price: productEdited.price,
                    IsOffer: productEdited.isOffer ? productEdited.isOffer == 'ofertado' ? 1 : 0 : 0,
                    Discount: productEdited.discount ? productEdited.discount : 0,
                    Quantity: productEdited.quantity,
                    UserID: userLogged,
                    CategoryID: categorieFound.CategoryID
                },{
                    where: {ProductID: IdProduct}, force: true
                })
                if(req.file){
                    await Image.update({
                        Name: req.file.filename,
                        ProductID : product.ProductID
                    },{
                        where: {ProductID: IdProduct}, force: true
                    })
                }
                res.redirect('/products/')
            }
        }catch (error) {
            console.log(error);
        }
    },

    productDestroy: async (req, res) => {
        try {
            const IdProduct = req.params.id;
            const userTypeLogged = req.session.userLogged.UserTypeID;
            const userLogged = req.session.userLogged.UserID;

            if(userTypeLogged == 1){
                const productfound = await Product.findByPk(IdProduct, {
                    where:{UserID : userLogged},
                })

                if(!productfound){
                    return res.redirect('/');
                }
            }

            await Image.destroy({
                where: {ProductID: IdProduct}, force: true
            })
            
            await Product.destroy({
                include : ["Image"],
                where: {ProductID: IdProduct}, force: true
            })

            res.redirect('/products')

        } catch (error) {
            console.log(error);
        }
	}

}


module.exports= productsControllers