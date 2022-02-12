const jsonTable = require('../database/jsonTable');
const users = jsonTable('users');
const db = require('../database/models');

const User = db.User;

async function userLoggedMiddleware(req,res,next){
    
    res.locals.isLogged = false;
    let emailInCookies = req.cookies.userEmail;
    let userFromCookie;
    
    if(emailInCookies){
        userFromCookie = await User.findOne({
            include : ["Avatar"],
            where: {
                Email: emailInCookies,
            }
        });
    }
    //if(emailInCookies){
        //let userFromCookie = users.findByField("email",emailInCookies)
        if (userFromCookie){
            delete userFromCookie.Password;
            req.session.userLogged = userFromCookie;
        } 
    
        if (req.session.userLogged){
            res.locals.isLogged = true;
            res.locals.userLogged = req.session.userLogged;    
        }
    //}
    next();
}

module.exports = userLoggedMiddleware