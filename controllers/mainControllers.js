const controllers = {
    index:(req, res) => {res.render('index')},
    login:(req, res) => {res.render('login')},
    register:(req, res) => {res.render('register')},
    productDetail:(req, res) => {res.render('products/productDetail')},
    productCart:(req, res) => {res.render('productCart')},
}

module.exports= controllers