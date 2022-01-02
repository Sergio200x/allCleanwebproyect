const constants = require('../database/constants')

const jsonTable = require('../database/jsonTable');
const products = jsonTable('products');

const mainControllers = {
    index:(req, res) => {
        const productList = products.all()
		const category = constants
		console.log(constants);
        res.render('index', {productList : productList, constants})
    },

    search: (req, res) => {
		const busqueda = req.query.search

		productsFilter = products.all();

		if(busqueda){
			productsFilter = productsFilter.filter(producto =>  
				producto.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(busqueda.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()))
				if(!productsFilter.length){
					productsFilter = undefined;
				}
		}
	
		res.render('products/productResults', {productsFilter: productsFilter, busqueda})
	},
}

module.exports= mainControllers