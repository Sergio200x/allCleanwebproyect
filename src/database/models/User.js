module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        UserID: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        Name: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        LastName: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        UserName: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        BirthDate: {
            type: dataTypes.DATE,
            allowNull: true
        },
        Password: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
        Email: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        UserTypeID: dataTypes.INTEGER.UNSIGNED,
        AvatarID: dataTypes.INTEGER.UNSIGNED
    };
    let config = {
        tableName: "usuarios",
        timestamps: false,
        deletedAt: false
    }
    const User = sequelize.define(alias, cols, config); 

    //Aquí debes realizar lo necesario para crear las relaciones con el modelo (Movie)
    User.associate = function(models){
        User.belongsTo(models.UserType, {
            as : "UserType",
            foreignKey: "UserTypeID"
        })
    }

    User.associate = function(models){
        User.belongsTo(models.Avatar, {
            as : "Avatar",
            foreignKey: "AvatarID"
        })
    }
    
 
    return User
};