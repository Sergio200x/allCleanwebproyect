const express = require('express')
const app = express()
const port = 3030

const indexRoutes = require('./routes/indexRoutes')
const loginRoutes = require('./routes/loginRoutes')
const productDetailRoutes = require('./routes/productDetailRoutes')
const productCartRoutes = require('./routes/productCartRoutes')
const registerRoutes = require('./routes/registerRoutes')
const productsRoutes = require('./routes/productsRoutes')

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs')

app.use('/', indexRoutes)
app.use('/login', loginRoutes)
app.use('/productDetail', productDetailRoutes)
app.use('/productCart', productCartRoutes)
app.use('/register', registerRoutes)
app.use('/products', productsRoutes)

app.listen(process.env.PORT || port, () => {
    console.log(`listening at http://localhost:${port}`)
})