// const { validationResult } = require("express-validator");
const userQueries = require('../../database/userQueries');
const users = userQueries('users');
// const generalQueries = require('../database/generalQueries');
// const general = generalQueries('general');
// const productQueries = require('../database/productQueries');
// const products = productQueries('products');
// const bcrypt = require ('bcrypt');
// const constants = require('../database/constants');

const userApiController = {
    users: async (req, res) => {
        try{
            const usersFound = await users.findAllApiUsers();

            res.json({
                info:{ status: 200,
                    count: usersFound.length,
                    url: "api/users"},
               
                data: usersFound 
            })
        }catch (error) {
            console.log(error);
        }
    }
}
module.exports= userApiController