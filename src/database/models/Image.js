module.exports = (sequelize, dataTypes) => {
    let alias = 'Image';
    let cols = {
        ImageID: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        Name: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
        ProductID: dataTypes.INTEGER.UNSIGNED,
    };
    let config = {
        tableName: "imagenes",
        timestamps: false,
        deletedAt: false
    }
    const Image = sequelize.define(alias, cols, config); 

    //Aquí debes realizar lo necesario para crear las relaciones con el modelo (Movie) 
    Image.associate = function(models){
        Image.belongsTo(models.Product, {
            as : "Product",
            foreignKey: "ProductID"
        })
    }
 
    return Image
};