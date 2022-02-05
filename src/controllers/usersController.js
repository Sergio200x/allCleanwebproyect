const { validationResult } = require("express-validator")
const jsonTable = require('../database/jsonTable');
const users = jsonTable('users');
const bcryptjs=require("bcryptjs");
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const constants = require('../database/constants');

const Category = db.Category;
const User = db.User;

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
                let isOkThePassword = bcryptjs.compareSync(passwordToLogin, userToLogin.Password);
               
                if (isOkThePassword){
                    delete userToLogin.Password 
                    req.session.userLogged = userToLogin

                    if (req.body.remember_user){
                        res.cookie("userEmail", emailToLogin ,{maxAge:(1000*60)*1})
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

    processRegister: (req, res) => {
        const resultvalidations = validationResult(req);
        
        let newUser = req.body
    
        if(!resultvalidations.isEmpty())
        {
            res.render('users/userRegister',{
                errors: resultvalidations.mapped(),
                oldData: req.body,
                constants,
            })}
        else{
            const porMail=users.findByField("email",req.body.email)
             if(porMail){
               return res.render('users/userRegister',{
                    errors:{email:{msg:"Este mail ya se encuentra registrado"}},
                    oldData: req.body,
                    constants
                });
             }
    
        let userCreated = users.createUser(newUser, req)

        res.redirect('/')
        }
    },

    
    userEdit:(req, res) => {
        const IdUser = req.params.id;
		const userToEdit = users.find(IdUser);

		res.render('users/userEdit', {userToEdit: userToEdit, constants})
    },

    processEdit: (req, res)=> {
        const resultvalidations = validationResult(req);
        const IdUser = req.params.id;
        const userToEdit = users.find(IdUser);
		const keepImage = userToEdit.avatar
        
		let userEdited = req.body
        
        if(!resultvalidations.isEmpty())
        {
            res.render('users/userEdit',{
                errors: resultvalidations.mapped(),
                oldData: req.body,
                userToEdit : userToEdit, 
                constants
            })}
        else
        {
            users.updateUser(userEdited, req, keepImage, IdUser)
            res.redirect('/')
        }
    },

    userDestroy: (req, res) => {
		const Iduser = req.params.id

		users.delete(Iduser)

		res.redirect('/')
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
    }
} 
module.exports= usersControllers

