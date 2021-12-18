const { validationResult } = require("express-validator")
const jsonTable = require('../database/jsonTable');

const products = jsonTable('products_json');

const controllers = {
    index:(req, res) => {res.render('index')},

    login:(req, res) => {res.render('login')},

    register:(req, res) => {res.render('users/register')},

    processRegister: (req, res) => {
        const resultvalidations = validationResult(req);
        if(!resultvalidations.isEmpty()){
            res.render('users/register',{
                errors: resultvalidations.mapped(),
                oldData: req.body
            })
        }

        return res.send('Pasaste las Validaciones, Falta que Sergio arme la Vista!!!')
    },

    productDetail:(req, res) => {res.render('products/productDetail')},

    productCart:(req, res) => {res.render('products/productCart')},

    products: (req, res) => {

        let productList = products.all()

        res.render('products/products',  { productList });
    },
}

module.exports= controllers