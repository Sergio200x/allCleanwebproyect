const path = require('path')
const controllers = {
    index:(req, res) => {res.render(path.resolve(__dirname + '/../views/users/index'))},
    login:(req, res) => {res.render(path.resolve(__dirname + '/../views/users/login.ejs'))},
    register:(req, res) => {res.render(path.resolve(__dirname + '/../views/users/register'))},
    productDetail:(req, res) => {res.render(path.resolve(__dirname + '/../views/users/productDetail'))},
    productCart:(req, res) => {res.render(path.resolve(__dirname + '/../views/users/productcart'))},
}

module.exports= controllers