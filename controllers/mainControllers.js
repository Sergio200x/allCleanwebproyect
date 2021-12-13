const path = require('path')
const controllers = {
    index:(req, res) => {res.render(path.resolve('index'))},
    login:(req, res) => {res.render(path.resolve('login'))},
    register:(req, res) => {res.render(path.resolve('register'))},
    productDetail:(req, res) => {res.render(path.resolve('productDetail'))},
    productCart:(req, res) => {res.render(path.resolve('productCart'))},
}

module.exports= controllers