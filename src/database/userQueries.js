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

let userQueries = function(tableName) {
    return {
        async findUserByEmail(email){
            const userFound = await User.findOne({
                include : ["Avatar"],
                where: {
                    Email: email,
                }
            });

            return(userFound);
        },
        async createAvatar(avatar){
            const UserAvatar = await Avatar.create({
                Name: avatar ? avatar.filename : 'sr-x.jpg'
            })

            return UserAvatar;
        },
        async updateAvatar(newAvatar, avatarID){
            UserAvatar = await Avatar.update({
                Name: newAvatar.filename
            },{
                where: {AvatarID: avatarID}
            })

            return UserAvatar;
        },
        async createUser(newUser, avatar){
            const userAvatar = await this.createAvatar(avatar);

            const userCreated = await User.create({
                include: ["UserType", "Avatar"],
                Name: newUser.name,
                LastName: newUser.lastName,
                UserName: newUser.user,
                Email: newUser.email,
                BirthDate: newUser.date ? newUser.date : null,
                Password: bcrypt.hashSync(newUser.password , 10),
                AvatarID: userAvatar.AvatarID,
                UserTypeID: 1
            })

            return userCreated;
        },
        async findUserById(userID){
            const userFound = await User.findByPk(userID, {
                include : ["Avatar"]
            });

            return userFound;
        },
        async findAllApiUsers(){
            const usersFound = User.findAll({
                attributes: ['UserID','Name','LastName','Email', [sequelize.fn('CONCAT', '/api/user/', sequelize.col('UserID')), 'Detail']]
            });

            return usersFound;
        },
        async updateUser(editedUser, newAvatar, userID, userTypeID){
            let userAvatar;
            const oldUser = await this.findUserById(userID);
            const avatarID = oldUser.Avatar.AvatarID;

            if(newAvatar){
                userAvatar = await this.updateAvatar(newAvatar, avatarID);
            }

            const userEdited = await User.update({
                include: ["UserType", "Avatar"],
                Name: editedUser.name,
                LastName: editedUser.lastName,
                UserName:editedUser.user,
                Email: editedUser.email,
                BirthDate: editedUser.date ? editedUser.date : null,
                Password: bcrypt.hashSync(editedUser.password , 10),
                AvatarID: userAvatar ? userAvatar.AvatarID : oldUser.Avatar.AvatarID,
                UserTypeID: userTypeID == 2 ? 2 : 1
            },{
                where: {UserID: userID}, force: true
            })

            return userEdited;
        },
        async deleteUser(userID, avatarID){
            await User.destroy({
                where: {UserID: userID}, force: true
            })

            await Avatar.destroy({
                where: {AvatarID: avatarID}, force: true
            })

            return 1;
        },
        async findUserProducts(userID){
            productList = await Product.findAll({
                where:{UserID : userID},
                include : ["Image"]
            })

            return productList;
        }
    }
}

module.exports = userQueries;