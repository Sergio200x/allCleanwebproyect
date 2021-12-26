const { validationResult } = require("express-validator")
const jsonTable = require('../database/jsonTable');

const products = jsonTable('products');

const controllers = {
    index:(req, res) => {
        const productList = products.all()

        res.render('index', {productList : productList})
    },

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

    productCreate:(req, res) => {res.render('products/productCreate')},


    products: (req, res) => {

        const productList = products.all()

        res.render('products/products',  { productList });
    },

    search: (req, res) => {
		const busqueda = req.query.search
        const productList = products.all()
		let productsFilter = productList

		if(busqueda){
			productsFilter = productList.filter(producto =>  
				producto.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(busqueda.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()))
				if(!productsFilter.length){
					productsFilter = undefined;
				}
		}
	
		res.render('products/productResults', {productsFilter: productsFilter, busqueda})
	},
}

module.exports= controllers