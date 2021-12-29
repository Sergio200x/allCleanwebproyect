const express = require('express')
const app = express()
const port = 3030

const indexRoutes = require('./routes/indexRoutes')
const userRoutes = require('./routes/userRoutes')
const productsRoutes = require('./routes/productsRoutes')

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs')

app.use('/', indexRoutes)
app.use('/user', userRoutes)
app.use('/products', productsRoutes)

app.listen(process.env.PORT || port, () => {
    console.log(`listening at http://localhost:${port}`)
})