const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const rutasIndex = require('./routes/indexRoutes')
const rutasLogin = require('./routes/loginRoutes')
const rutasProductDetail = require('./routes/productDetailRoutes')
const rutasProductCart = require('./routes/productCartRoutes')
const rutasRegister = require('./routes/registerRoutes')

app.use(express.static('public'));

app.set('view engine', 'ejs')

app.use('/', rutasIndex)
app.use('/login', rutasLogin)
app.use('/productDetail', rutasProductDetail)
app.use('/productCart', rutasProductCart)
app.use('/register', rutasRegister)

app.listen(process.env.PORT || 3000, () => {
    console.log(`listening at http://localhost:${port}`)
})