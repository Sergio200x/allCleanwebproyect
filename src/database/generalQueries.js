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
        async findCategories() {
            const categories = await Category.findAll();
            return categories;
        },
        async findCategorieByPk(CategoryID) {
            const categories = await Category.findByPk(CategoryID);
            return categories;
        },
        async findCategorieByName(name){
            const filterCategorie = await Category.findOne({
                where: {
					Name: name
				}
            })

            return filterCategorie;
        }
    }
}

module.exports = generalQueries;