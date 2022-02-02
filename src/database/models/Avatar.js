module.exports = (sequelize, dataTypes) => {
    let alias = 'Avatar';
    let cols = {
        AvatarID: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        Name: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
    };
    let config = {
        tableName: "avatares",
        timestamps: false,
        deletedAt: false
    }
    const Avatar = sequelize.define(alias, cols, config); 

    //Aquí debes realizar lo necesario para crear las relaciones con el modelo (Movie) 
     
    return Avatar
};