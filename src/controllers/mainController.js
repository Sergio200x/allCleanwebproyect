const constants = require('../database/constants')
const generalQueries = require('../database/generalQueries');
const general = generalQueries('general');
const productQueries = require('../database/productQueries');
const products = productQueries('products');

const mainControllers = 	{
    index: async (req, res) => {
		try {
			const categories = await general.findCategories();
			const productList = await products.findAllProducts();
			
			res.render('index', {productList, constants, categories})
		} catch (error) {
			console.log(error);
		}
    },

    search: async (req, res) => {
		try {
			const busqueda = req.query.search
			const categories = await general.findCategories();
			const productsFilter = await products.findProductsByName(busqueda);
			
			res.render('products/productResults', {productsFilter, busqueda, constants, categories});
		} catch (error) {
			console.log(error);
		}
	}
}
	

module.exports= mainControllers