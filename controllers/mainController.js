const { validationResult } = require("express-validator")

const jsonTable = require('../database/jsonTable');
const products = jsonTable('products');

const mainControllers = {
    index:(req, res) => {
        const productList = products.all()

        res.render('index', {productList : productList})
    },

    search: (req, res) => {
		const busqueda = req.query.search
        const productList = products.all()
		let productsFilter = productList

		if(busqueda){
			productsFilter = productList.filter(producto =>  
				producto.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(busqueda.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()))
				if(!productsFilter.length){
					productsFilter = productList;
				}
		}
	
		res.render('products/productResults', {productsFilter: productsFilter, busqueda})
	},
}

module.exports= mainControllers