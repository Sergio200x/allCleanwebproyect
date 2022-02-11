const { validationResult } = require("express-validator")
const jsonTable = require('../database/jsonTable');
const users = jsonTable('users');
const bcryptjs=require("bcryptjs");
const bcrypt = require ('bcrypt')
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const constants = require('../database/constants');
const { stringify } = require("nodemon/lib/utils");

const Category = db.Category;
const User = db.User;
const Avatar = db.Avatar;
const Product = db.Product;
const UserType = db.UserType;

const usersControllers = {
    userLogin: async (req, res) => {
        try {
            const categories = await Category.findAll();
            res.render('users/userLogin',{constants, categories})
        } catch (error) {
            console.log(error);
        }
    },

    processLogin: async (req, res) => {
        try {
            const emailToLogin = req.body.email;
            const passwordToLogin = req.body.password;
            const categories = await Category.findAll();
            const userToLogin = await User.findOne({
                include : ["Avatar"],
                where: {
                    Email: emailToLogin,
                }
            });
            //const userToLogin=users.findByField("email",req.body.email)
            if (userToLogin){
                //let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.Password);
                let isOkThePassword = bcrypt.compareSync(passwordToLogin, userToLogin.Password);
               
                if (isOkThePassword){
                    delete userToLogin.Password 
                    req.session.userLogged = userToLogin

                    if (req.body.remember_user){
                        res.cookie("userEmail", emailToLogin ,{maxAge:((1000*60)*1)*60})
                    }
                    
                    return res.redirect('/users/userProfile')
                }else{
                    return res.render('users/userLogin',{
                        errors:{
                            email:{ msg:"El email o el password son incorrectos"}
                        },
                        constants,
                        categories
                    });  
                }
            }
            return res.render('users/userLogin',{
                            errors:{
                                email:{ msg:"El email o el password son incorrectos"}
                            },
                            constants,
                            categories
            });
            }catch (error) {
                console.log(error);
            }               
        },

    userRegister: (req, res) => {
        res.render('users/userRegister', {constants})
    },

    processRegister: async (req, res) => {
        try{
            const resultvalidations = validationResult(req);
        
            let newUser = req.body
        
            if(!resultvalidations.isEmpty())
            {
                res.render('users/userRegister',{
                    errors: resultvalidations.mapped(),
                    oldData: newUser,
                    constants,
                })}
            else{
                emailToRegister = newUser.email;
                const categories = await Category.findAll();
                const checkEmail = await User.findOne({
                    include : ["Avatar"],
                    where: {
                        Email: emailToRegister,
                    }
                });
                //const checkEmail = users.findByField("email",req.body.email)
                if(checkEmail){
                return res.render('users/userRegister',{
                        errors:{email:{msg:"Este mail ya se encuentra registrado"}},
                        oldData: newUser,
                        constants,
                        categories
                    });
                }
                //let userCreated = users.createUser(newUser, req)
                const UserAvatar = await Avatar.create({
                    Name: req.file ? req.file.filename : 'sr-x.jpg'
                })     
               await User.create({
                    include: ["UserType", "Avatar"],
                    Name: newUser.name,
                    LastName: newUser.lastName,
                    UserName: newUser.user,
                    Email: newUser.email,
                    BirthDate: newUser.date ? newUser.date : null,
                    Password: bcrypt.hashSync(newUser.password , 10),
                    AvatarID: UserAvatar.AvatarID,
                    UserTypeID: 1
                })
                
                res.redirect('/')
            }
        }catch (error) {
            console.log(error);
        }
    },

    
    userEdit: async (req, res) => {
        try{
            const IdUser = req.params.id;
            const userSession = req.session.userLogged.UserID;

            if( userSession != IdUser) return res.redirect('/');
            
            const categories = await Category.findAll();

            const userToEdit = await User.findByPk(IdUser, {
                include : ["Avatar"],
                where: {
                    UserID: IdUser,
                }
                
            });
            console.log(userToEdit)
            res.render('users/userEdit', {userToEdit: userToEdit, constants, categories});
            
        }catch (error) {
            console.log(error);
        }
    },

    processEdit: async (req, res)=> {
        const resultvalidations = validationResult(req);
        const IdUser = req.params.id;

        const categories = await Category.findAll();
        const userToEdit = await User.findByPk(IdUser, {
            include : ["Avatar"],
            where: {
                UserID: IdUser,
            }
        });
      
		let userEdited = req.body
        
        if(!resultvalidations.isEmpty())
        {
            res.render('users/userEdit',{
                errors: resultvalidations.mapped(),
                oldData: req.body,
                userToEdit : userToEdit, 
                constants,
                categories
            })}
        else
        {
            let UserAvatar;

            if(req.file){
                UserAvatar = await Avatar.update({
                    Name: req.file.filename
                },{
                    where: {AvatarID: userToEdit.Avatar.AvatarID}
                })
            }
            
            await User.update({
                include: ["UserType", "Avatar"],
                Name: userEdited.name,
                LastName: userEdited.lastName,
                UserName:userEdited.user,
                Email: userEdited.email,
                BirthDate: userEdited.date ? userEdited.date : null,
                Password: bcrypt.hashSync(userEdited.password , 10),
                AvatarID: UserAvatar ? UserAvatar.AvatarID : userToEdit.Avatar.AvatarID,
                UserTypeID: 1
            },{
                where: {UserID: IdUser}, force: true
            })
            
            res.redirect('/')
        }
    },

    userDestroy: async (req, res) => {
        try {
            const Iduser = req.params.id
            const userSession = req.session.userLogged.UserID;
            if(userSession != Iduser) return res.redirect('/');
            User.destroy({
                where: {UserID: Iduser}, force: true
            })

		    //users.delete(Iduser)

		    res.redirect('/')

        } catch (error) {
            console.log(error);
        }
	},

    profile: async (req,res)=>{
        try {
            const categories = await Category.findAll();
            return res.render('users/userProfile', {user:req.session.userLogged, constants, categories});
        } catch (error) {
            console.log(error);
        }
    },

    logout:(req,res)=>{
        res.clearCookie("userEmail")
        req.session.destroy();
        return res.redirect('/')
    },

    userProducts: async (req, res)=>{
        
        const categories = await Category.findAll();
        const userTypeLogged = req.session.userLogged.UserTypeID;                                
        const userLogged = req.session.userLogged.UserID;
        const userLoggedName= req.session.userLogged.Name;
                   
        if(userLogged && userTypeLogged == 1){   
            try {    
                productList = await Product.findAll({
                    where:{UserID : userLogged},
                    include : ["Image"]
                })
                res.render('users/userProducts',  { productList, constants, categories, userTypeLogged, userLoggedName});
            }catch (error) {
                console.log(error);
            } 
        }
        else if (userLogged && userTypeLogged == 2)
        {
            try {
                productList = await Product.findAll({
                    include : ["Image"]
                })   
                res.render('users/userProducts',  { productList, constants, categories, userTypeLogged, userLoggedName});
            }catch (error) {
                console.log(error);
            }
        }
    }
} 

module.exports= usersControllers

