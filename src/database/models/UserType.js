module.exports = (sequelize, dataTypes) => {
    let alias = 'UserType';
    let cols = {
        UserTypeID: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        Name: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
    };
    let config = {
        tableName: "tipo_usuarios",
        timestamps: false,
        deletedAt: false
    }
    const UserType = sequelize.define(alias, cols, config); 

    //Aquí debes realizar lo necesario para crear las relaciones con el modelo (Movie) 
 
    return UserType
};