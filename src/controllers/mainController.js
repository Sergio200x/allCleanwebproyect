const constants = require('../database/constants')
const jsonTable = require('../database/jsonTable');
const products = jsonTable('products');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const Product = db.Product;
const Category = db.Category;

const mainControllers = 	{
    index: async (req, res) => {
		try {
			const categories = await Category.findAll();
			const productList = await Product.findAll({
				include : ["Image"],
			})
			
			res.render('index', {productList : productList, constants, categories})
		} catch (error) {
			console.log(error);
		}
    },

    search: async (req, res) => {
			try {
				const busqueda = req.query.search
				const categories = await Category.findAll();
				const productsFilter = await Product.findAll({
					include : ["Image"],
					where: {
						Name: { [Op.like]: '%' + busqueda + '%'}
					}
				})

				res.render('products/productResults', {productsFilter: productsFilter, busqueda, constants, categories});
			} catch (error) {
				console.log(error);
			}
		}
}
	

module.exports= mainControllers