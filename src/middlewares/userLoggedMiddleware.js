const userQueries = require('../database/userQueries');
const users = userQueries('users');

async function userLoggedMiddleware(req,res,next){
    res.locals.isLogged = false;
    let emailInCookies = req.cookies.userEmail;
    let userFromCookie;
    
    if(emailInCookies){
        userFromCookie = await users.findUserByEmail(emailInCookies);
    }
    
    if (userFromCookie){
        delete userFromCookie.Password;
        req.session.userLogged = userFromCookie;
    } 

    if (req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;    
    }
    
    next();
}

module.exports = userLoggedMiddleware