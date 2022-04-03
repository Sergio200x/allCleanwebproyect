const productQueries = require('../../database/productQueries');
const products = productQueries('products');
const generalQueries = require('../../database/generalQueries');
const general = generalQueries('general');

const productApiController = {
    products: async (req, res) => {
        try{
            const productsFound = await products.findAllApiProducts();
            const totalProductsByCategory = await products.findTotalProductsByCategory();

            res.json({
                info:{ 
                    status: 200,
                    count: productsFound.length,
                    countByCategory: totalProductsByCategory,
                    url: "/api/products"
                },
                data: productsFound 
            })
        }catch (error) {
            console.log(error);
        }
    },

    productDetail: async (req, res) => {
        try{
            const productID = req.params.id;
            const productFound = await products.findProductDetail(productID);
            
            res.json({
                info:{ 
                    status: 200,
                    url: `/api/product/${productID}`
                },
                data: productFound 
            })
        }catch (error) {
            console.log(error);
        }
    }
}

module.exports= productApiController