const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const generalQueries = require ('./generalQueries');
const general = generalQueries('general');

const Product = db.Product;
const Image = db.Image;
const Category = db.Category;
const User = db.User

let productQueries = function(tableName) {
    return {
        async findAllProducts() {
            productList = await Product.findAll({
                include: ["User", "Category", "Image"],
            })

            return productList;
        },
        async findProductsByName(name){
            const productsFilter = await Product.findAll({
				include: ["User", "Category", "Image"],
				where: {
					Name: { [Op.like]: '%' + name + '%'}
				}
			})

            return productsFilter;
        },
        async findProductByPk(productID){
            const productfound = await Product.findByPk(productID, {
                include: ["User", "Category", "Image"],
            })

            return productfound;
        },
        async findProductsByCategory(category, isApi = false){
            const filterCategorie = await general.findCategorieByName(category);

            const productsFilter = await Product.findAll({
				include: ["User", "Category", "Image"],
				where: {
					CategoryID: filterCategorie.CategoryID
				}
			})

            if(!isApi) return productsFilter;

            return productsFilter.length;
        },
        async findTotalProductsByCategory(category, isApi = false){
            const totalProductsByCategory = await Product.findAll({
                include: [{
                    model: Category,
                    as: 'Category',
                    required: true,
                    attributes: ['Name'],
                }],

                attributes: {
                    include : [[sequelize.fn('COUNT', sequelize.col('Product.CategoryID')), 'Total'], 'Product.CategoryID'],
                    exclude : ['Name', 'Description', 'Price', 'IsOffer', 'Discount', 'Quantity', 'UserID', 'ProductID']
                },

                group: [ 'Product.CategoryID' ],
            });

            return totalProductsByCategory;
        },
        async createImage(image, productID){
            const imageCreated = await Image.create({
                Name: image ? image.filename : 'no-photo.jpeg',
                ProductID : productID
            })

            return imageCreated;
        },
        async createProduct(newProduct, userID, image){
            const filterCategorie = await general.findCategorieByName(newProduct.category);
                
            const productCreated = await Product.create({
                include: ["User", "Category", "Image"],
                Name: newProduct.name,
                Description: newProduct.description,
                Price: newProduct.price,
                IsOffer: newProduct.isOffer ? newProduct.isOffer == 'ofertado' ? 1 : 0 : 0,
                Discount: newProduct.discount ? newProduct.discount : 0,
                Quantity: newProduct.quantity,
                UserID: userID,
                CategoryID: filterCategorie.CategoryID
            })

            const productImage = await this.createImage(image, productCreated.ProductID);

            return productCreated;
        },
        async findAllApiProducts(){
            const productsFound = await Product.findAll({
                include: ["Category"],
                attributes: ['ProductID','Name','Description', [sequelize.fn('CONCAT', '/api/product/', sequelize.col('ProductID')), 'Detail']]
            });

            return productsFound;
        },
        async checkProductBelongToUser(userID, productID){
            const productFound = await Product.findOne({
                include: ["User", "Category", "Image"],
                where:{
                    UserID : userID,
                    ProductID : productID
                },
            })
                        
            if(productFound) return true;

            return false;
        },
        async findProductDetail(ProductID){
            const productFound = await Product.findByPk(ProductID,{
                include: [{
                    model: Image,
                    as: 'Image',
                    required: true,
                    attributes: [],
                },{
                    model: User,
                    as: 'User',
                    required: true,
                    attributes : {
                        exclude : ['Password', 'UserTypeID']
                    } 
                }, "Category"],

                attributes: {
                    include : [[sequelize.fn('CONCAT', '/api/product/', sequelize.col('Product.ProductID'), '/image/', sequelize.col('Image.Name')), 'Imagen']],
                    exclude : ['UserID', 'CategoryID']
                },
            });

            return productFound;
        },
        async updateImage(image, productID){
            await Image.update({
                Name: image.filename,
                ProductID : productID
            },{
                where: {ProductID: productID}, force: true
            })

            return 1;
        },
        async updateProduct(productEdited, userID, productID, image){
            const filterCategorie = await general.findCategorieByName(productEdited.category);
                
            const product = await Product.update({
                include: ["User", "Category", "Image"],
                Name: productEdited.name,
                Description: productEdited.description,
                Price: productEdited.price,
                IsOffer: productEdited.isOffer ? productEdited.isOffer == 'ofertado' ? 1 : 0 : 0,
                Discount: productEdited.discount ? productEdited.discount : 0,
                Quantity: productEdited.quantity,
                UserID: userID,
                CategoryID: filterCategorie.CategoryID
            },{
                where: {ProductID: productID}, force: true
            })

            if(image){
                await this.updateImage(image, productID);
            }
            
            return product;
        },
        async deleteImage(productID){
            await Image.destroy({
                where: {ProductID: productID}, force: true
            })

            return 1;
        },
        async deleteProduct(productID){
            await this.deleteImage(productID);

            await Product.destroy({
                include: ["User", "Category", "Image"],
                where: {ProductID: productID}, force: true
            })

            return 1;
        }
    }
}

module.exports = productQueries;