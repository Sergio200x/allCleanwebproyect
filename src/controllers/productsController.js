const { validationResult } = require("express-validator");
const constants = require('../database/constants');
const generalQueries = require('../database/generalQueries');
const general = generalQueries('general');
const productQueries = require('../database/productQueries');
const products = productQueries('products');

const productsControllers = {
    products: async (req, res) => {
        try {
            const categories = await general.findCategories();
            const productList = await products.findAllProducts();

            res.render('products/products',  { productList, constants, categories });
        } catch (error) {
            console.log(error);
        }
    },

    productDetail: async (req, res) => {
        try{
            const IdProduct = req.params.id;
            const categories = await general.findCategories();
            const productfound = await products.findProductByPk(IdProduct);
            
            res.render('products/productDetail',{productfound, constants, categories});
        }catch (error) {
            console.log(error);
        }
    },

    productCategory: async (req, res) => {
        try{
            const selectedCategory = req.params.category;
            const categories = await general.findCategories();
            const productsFilter = await products.findProductsByCategory(selectedCategory);

            res.render('products/productCategory', {productsFilter, selectedCategory, constants, categories})
        }catch (error) {
            console.log(error);
        }
    },

    productCart: async (req, res) => {
        try{
            const categories = await general.findCategories();     

            res.render('products/productCart', {constants, categories})
        }catch (error) {
            console.log(error);
        }
    },

    productCreate: async(req, res) => {
        try{
            const categories = await general.findCategories();   

            res.render('products/productCreate', {constants, categories})
        }catch (error) {
            console.log(error);
        }
    },
    
    processCreate: async (req,res)=>{
        try{
            const resultvalidations = validationResult(req);
            const userLogged = req.session.userLogged.UserID;
            
            const newProduct = req.body;

            if(!resultvalidations.isEmpty()){
                const categories = await general.findCategories();

                return res.render('products/productCreate',{
                    errors: resultvalidations.mapped(),
                    oldData: req.body,
                    constants,
                    categories
                })
            }

            await products.createProduct(newProduct, userLogged, req.file);
            
            res.redirect('/products/');
        }catch (error) {
            console.log(error);
        }
    },

    productEdit: async (req, res) => {
        try{
            const IdProduct = req.params.id;
            const categories = await general.findCategories(); 
            const userTypeLogged = req.session.userLogged.UserTypeID;
            const userLogged = req.session.userLogged.UserID;  

            if(userTypeLogged == 1){
                const isProductBelongToUser = await products.checkProductBelongToUser(userLogged, IdProduct);

                if(!isProductBelongToUser){
                    return res.redirect('/products/');
                }
            }

            const productToEdit = await products.findProductByPk(IdProduct);

		    res.render('products/productEdit', {productToEdit, constants, categories})
        }catch (error) {
            console.log(error);
        }
    },

    processEdit: async (req, res)=> {
        try{
            const resultvalidations = validationResult(req);
            const IdProduct = req.params.id;
            const userLogged = req.session.userLogged.UserID;
                        
            let productEdited = req.body
            
            if(!resultvalidations.isEmpty())
            {
                const productToEdit = await products.findProductByPk(IdProduct);
                const categories = await general.findCategories();

                return res.render('products/productEdit',{
                    errors: resultvalidations.mapped(),
                    oldData: req.body,
                    productToEdit, 
                    constants,
                    categories
                })
            }

            await products.updateProduct(productEdited, userLogged, IdProduct, req.file);

            res.redirect('/products/');
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
                const isProductBelongToUser = await products.checkProductBelongToUser(userLogged, IdProduct);

                if(!isProductBelongToUser){
                    return res.redirect('/products/');
                }
            }

            await products.deleteProduct(IdProduct);

            res.redirect('/products');
        } catch (error) {
            console.log(error);
        }
	}
}


module.exports= productsControllers