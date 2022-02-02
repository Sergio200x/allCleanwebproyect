const express = require('express');
const methodOverride =  require('method-override');
const app = express();
const port = 3030;
const session=require("express-session");
const cookie=require('cookie-parser');
const path = require('path');
const userLoggedMiddleware= require('./middlewares/userLoggedMiddleware');
const indexRoutes = require('./routes/indexRoutes');
const userRoutes = require('./routes/userRoutes');
const productsRoutes = require('./routes/productsRoutes');

//app.use(express.static('public'));
app.use(express.static(path.resolve(__dirname, '../public')));

//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

//sessions and cookies manager
app.use(session({secret:'its a secret',resave:false,saveUninitialized:false}));
app.use(cookie());
app.use(userLoggedMiddleware);

//view engine setup
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'ejs');

//Routes
app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/products', productsRoutes);

//Port Listening
app.listen(process.env.PORT || port, () => {
    console.log(`listening at http://localhost:${port}`)
});