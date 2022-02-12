const { validationResult } = require("express-validator")
const userQueries = require('../database/userQueries');
const users = userQueries('users');
const generalQueries = require('../database/generalQueries');
const general = generalQueries('general');
const productQueries = require('../database/productQueries');
const products = productQueries('products');
const bcrypt = require ('bcrypt')
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const constants = require('../database/constants');

const usersControllers = {
    userLogin: async (req, res) => {
        try{
            const categories = await general.findCategories();
            res.render('users/userLogin',{constants, categories})
        }catch (error) {
            console.log(error);
        }
    },

    processLogin: async (req, res) => {
        try{
            const emailToLogin = req.body.email;
            const passwordToLogin = req.body.password;
            const categories = await general.findCategories();
            const userToLogin = await users.findUserByEmail(emailToLogin);
            
            if (userToLogin){
                
                const isPasswordOk = bcrypt.compareSync(passwordToLogin, userToLogin.Password);
               
                if (isPasswordOk){
                    delete userToLogin.Password; 
                    req.session.userLogged = userToLogin;

                    if (req.body.remember_user){
                        res.cookie("userEmail", emailToLogin ,{maxAge:((1000*60)*1)*60});
                    }
                    
                    return res.redirect('/');
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

    userRegister: async (req, res) => {
        try{
            const categories = await general.findCategories();
            res.render('users/userRegister', {constants, categories});
        }catch (error) {
            console.log(error);
        } 
    },

    processRegister: async (req, res) => {
        try{
            const resultvalidations = validationResult(req);
        
            let newUser = req.body;
        
            if(!resultvalidations.isEmpty()){
                return res.render('users/userRegister',{
                    errors: resultvalidations.mapped(),
                    oldData: newUser,
                    constants,
                })
            }
                    
            emailToRegister = newUser.email;
            const categories = await general.findCategories();
            const checkEmail = await users.findUserByEmail(emailToRegister);
            
            if(checkEmail){
            return res.render('users/userRegister',{
                    errors:{email:{msg:"Este mail ya se encuentra registrado"}},
                    oldData: newUser,
                    constants,
                    categories
                });
            }
           
            await users.createUser(newUser, req.file);
                        
            res.redirect('/');
        }catch (error) {
            console.log(error);
        }
    },

    userEdit: async (req, res) => {
        try{
            const IdUser = req.params.id;
            const userSession = req.session.userLogged.UserID;

            if(userSession != IdUser) return res.redirect('/');
            
            const categories = await general.findCategories();
            const userToEdit = await users.findUserById(IdUser);
            
            res.render('users/userEdit', {userToEdit, constants, categories});
        }catch (error) {
            console.log(error);
        }
    },

    processEdit: async (req, res)=> {
        try{
            const resultvalidations = validationResult(req);
            const userTypeLogged = req.session.userLogged.UserTypeID;
            const IdUser = req.params.id;

            const categories = await general.findCategories();
            const userToEdit = await users.findUserById(IdUser);
        
            const userEdited = req.body;
            
            if(!resultvalidations.isEmpty())
            {
                return res.render('users/userEdit',{
                    errors: resultvalidations.mapped(),
                    oldData: req.body,
                    userToEdit : userToEdit, 
                    constants,
                    categories
                })
            }
            
            await users.updateUser(userEdited, req.file, IdUser, userTypeLogged);

            if(req.file){
            res.clearCookie("userEmail");
            req.session.destroy();
            }
            
            res.redirect('/');
        }catch (error) {
            console.log(error);
        }
    },

    userDestroy: async (req, res) => {
        try{
            const Iduser = req.params.id
            const userSession = req.session.userLogged.UserID;
            const avatarID = req.session.userLogged.AvatarID;

            if(userSession != Iduser) return res.redirect('/');
            
            await users.deleteUser(userSession, avatarID);
            
		    res.redirect('/')
        }catch (error) {
            console.log(error);
        }
	},

    profile: async (req,res)=>{
        try{
            const categories = await general.findCategories();
            return res.render('users/userProfile', {user:req.session.userLogged, constants, categories});
        }catch (error) {
            console.log(error);
        }
    },

    logout:(req,res)=>{
        res.clearCookie("userEmail");
        req.session.destroy();
        return res.redirect('/');
    },

    userProducts: async (req, res)=>{
        try{
            const categories = await general.findCategories();
            const userTypeLogged = req.session.userLogged.UserTypeID;                                
            const userLogged = req.session.userLogged.UserID;
            const userLoggedName= req.session.userLogged.Name;
                    
            if(userTypeLogged == 1){      
                productList = await users.findUserProducts(userLogged); 
                
                res.render('users/userProducts',  { productList, constants, categories, userTypeLogged, userLoggedName});
            }
            else if (userTypeLogged == 2)
            {
                productList = await products.findAllProducts();
                 
                res.render('users/userProducts',  { productList, constants, categories, userTypeLogged, userLoggedName});
            }
        }catch (error) {
            console.log(error);
        }
    }
} 

module.exports= usersControllers

