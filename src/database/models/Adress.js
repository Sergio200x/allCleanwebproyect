
module.exports=(sequelize,dataTypes)=>{
let alias="Address";
let cols = {
    HomeID:{
        type:dataTypes.INTEGER.UNSIGNED,
        primaryKey:true,
        autoIncrement: true,
        allowNull:false
    },
    Street:{
        type:dataTypes.STRING(45),
        allowNull:false,
    },
    ZipCode:{
        type:dataTypes.INTEGER(11),
        allowNull:false
    },
    City:{
        type:dataTypes.STRING(45),
    },
    Town:{
        type:dataTypes.STRING(45),
        allowNull:false,
    },
    ExtraIndications:{
        type:dataTypes.STRING(45),
        allowNull:true,
    },
    UserID:dataTypes.INTEGER.UNSIGNED

};
let config={
    tableName:"domicilios",
    timestamps:false,
    deletedAt:false

}
const Address=sequelize.define(alias,cols,config)

Address.associate = function(models){
    Address.belongsTo(models.User, {
        as : "User",
        foreignKey: "UserID"
    })
}



return Address

};