module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
        ProductID: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        Name: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        Description: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        Price: {
            type: dataTypes.DECIMAL(10,2),
            allowNull: false
        },
        Quantity: {
            type: dataTypes.INTEGER(10),
            allowNull: false
        },
        IsOffer: {
            type: dataTypes.BOOLEAN(),
            allowNull: true
        },
        Discount: {
            type: dataTypes.DECIMAL(10,2),
            allowNull: true
        },
        UserID: dataTypes.INTEGER.UNSIGNED,
        CategoryID: dataTypes.INTEGER.UNSIGNED
    };
    let config = {
        tableName: "productos",
        timestamps: false,
        deletedAt: false
    }
    const Product = sequelize.define(alias, cols, config); 

    //Aquí debes realizar lo necesario para crear las relaciones con el modelo (Movie)
    Product.associate = function(models){
        Product.belongsTo(models.User, {
            as : "User",
            foreignKey: "UserID"
        })

        Product.belongsTo(models.Category, {
            as : "Category",
            foreignKey: "CategoryID"
        })

        Product.hasMany(models.Image, {
            as : "Image",
            foreignKey: "ProductID"
        })
    }
    
 
    return Product
};