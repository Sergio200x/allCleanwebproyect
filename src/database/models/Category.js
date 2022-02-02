module.exports = (sequelize, dataTypes) => {
    let alias = 'Category';
    let cols = {
        CategoryID: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        Name: {
            type: dataTypes.STRING(80),
            allowNull: false
        },
        Icon: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
        IsPopular: {
            type: dataTypes.BOOLEAN(),
            allowNull: true
        },
    };
    let config = {
        tableName: "categorias",
        timestamps: false,
        deletedAt: false
    }
    const Category = sequelize.define(alias, cols, config); 

    //Aquí debes realizar lo necesario para crear las relaciones con el modelo (Movie) 
 
    return Category
};