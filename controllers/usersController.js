const { validationResult } = require("express-validator")

const jsonTable = require('../database/jsonTable');
const products = jsonTable('products');

const usersControllers = {
    login:(req, res) => {res.render('users/login')},

    register:(req, res) => {res.render('users/register')},

    processRegister: (req, res) => {
        const resultvalidations = validationResult(req);
        if(!resultvalidations.isEmpty()){
            res.render('users/register',{
                errors: resultvalidations.mapped(),
                oldData: req.body
            })
        }

        return res.send('Pasaste las Validaciones, Falta que Sergio arme la Vista!!!')
    }
}

module.exports= usersControllers