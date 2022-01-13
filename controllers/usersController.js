const { validationResult } = require("express-validator")
const jsonTable = require('../database/jsonTable');
const users = jsonTable('users');
const bcryptjs=require("bcryptjs")

const constants = require('../database/constants');


const usersControllers = {
    userLogin:(req, res) => {
       
        res.render('users/userLogin',{constants})},
        

    processLogin:(req, res) => {
        
      const userToLogin=users.findByField("email",req.body.email)
       console.log(userToLogin)
            if (userToLogin){
                let isOkThePassword=bcryptjs.compareSync(req.body.password,userToLogin.password)
                if (isOkThePassword){
                    delete userToLogin.password 
                    req.session.userLogged=userToLogin

                    if (req.body.remember_user){
                       
                        res.cookie("userEmail",req.body.email,{maxAge:(1000*60)*1})
                    }
                    
                    return res.redirect('/users/userProfile')
                }
            }
            return res.render('users/userLogin',{
                            errors:{
                            email:{
                                msg:"no se encuentra el mail en la base de datos"
                            }
                        },constants
            });            
                
           
        },

    userRegister:(req, res) => {res.render('users/userRegister', {constants})},

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
                    errors:{email:{msg:"Este mail esta registrado"}},
                    oldData: req.body,
                    constants
                
                });
             }
    
        let userCreated=users.createUser(newUser, req)
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
    profile:(req,res)=>{
        
        return res.render('users/userProfile',{user:req.session.userLogged,constants});
    },

    logout:(req,res)=>{
        res.clearCookie("userEmail")
        req.session.destroy();
        console.log("salio de la session")
        return res.redirect('/')
    }
} 
module.exports= usersControllers

