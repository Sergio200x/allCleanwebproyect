const { validationResult } = require("express-validator")


const controllers = {
    index:(req, res) => {res.render('index')},
    login:(req, res) => {res.render('login')},
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
    },
    productDetail:(req, res) => {res.render('products/productDetail')},
    productCart:(req, res) => {res.render('products/productCart')},
}

module.exports= controllers