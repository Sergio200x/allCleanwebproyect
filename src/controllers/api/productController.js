const productQueries = require('../../database/productQueries');
const products = productQueries('products');
const generalQueries = require('../../database/generalQueries');
const general = generalQueries('general');

const productApiController = {
    products: async (req, res) => {
        try{
            const productsFound = await products.findAllApiProducts();

            //const categories = await general.findCategorieByPk();

            res.json({
                info:{ 
                    status: 200,
                    count: productsFound.length,
                    countByCategory: {},
                    url: "api/products"
                },
                data: productsFound 
            })
        }catch (error) {
            console.log(error);
        }
    },

    // userDetail: async (req, res) => {
    //     try{
    //         const userID = req.params.id;
    //         const userFound = await users.findUserDetail(userID);
            
    //         res.json({
    //             info:{ 
    //                 status: 200,
    //                 url: "api/user/" + userID
    //             },
    //             data: userFound 
    //         })
    //     }catch (error) {
    //         console.log(error);
    //     }
    // }
}

module.exports= productApiController