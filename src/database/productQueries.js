const fs = require('fs');
const path = require('path');
const bcrypt = require ('bcrypt');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const Category = db.Category;
const User = db.User;
const Avatar = db.Avatar;
const Product = db.Product;

let generalQueries = function(tableName) {
    return {
        async findAllProducts() {
            productList = await Product.findAll({
                include: ["User", "Category", "Image"],
            })

            return productList;
        },
    }
}

module.exports = generalQueries;