const { validationResult } = require("express-validator")
const jsonTable = require('../database/jsonTable');
const users = jsonTable('users');


const usersControllers = {
    userLogin:(req, res) => {res.render('users/login')},

    userRegister:(req, res) => {res.render('users/register')},

    processRegister: (req, res) => {
        const resultvalidations = validationResult(req);
        
		let newUser = req.body

        if(!resultvalidations.isEmpty())
        {
            res.render('users/productCreate',{
                errors: resultvalidations.mapped(),
                oldData: req.body
            })}
        else
        {
            users.createUser(newUser, req)
            res.redirect('/')
        }
    }
}

module.exports= usersControllers