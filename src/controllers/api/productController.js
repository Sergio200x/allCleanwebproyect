const productQueries = require('../../database/productQueries');
const products = productQueries('products');
const generalQueries = require('../../database/generalQueries');
const general = generalQueries('general');

const productApiController = {
    products: async (req, res) => {
        try{
            const productsFound = await products.findAllApiProducts();

            res.json({
                info:{ 
                    status: 200,
                    count: productsFound.length,
                    countByCategory: {
                        "Limpieza de Cocina": await products.findProductsByCategory("Limpieza de Cocina", true),
                        "Limpieza de Baño": await products.findProductsByCategory("Limpieza de Baño", true) ,
                        "Desinfectantes": await products.findProductsByCategory("Desinfectantes", true) ,
                        "Accesorios limpieza": await products.findProductsByCategory("Accesorios limpieza", true) ,
                        "Limpieza piso y muebles": await products.findProductsByCategory("Limpieza piso y muebles", true) ,
                        "Otros": await products.findProductsByCategory("Otros", true) ,
                    },
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