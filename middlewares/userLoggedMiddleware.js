const jsonTable = require('../database/jsonTable');
const users = jsonTable('users');


function userLoggedMiddleware(req,res,next){
    
    res.locals.isLogged=false;
    let emailInCookies=req.cookies.userEmail;
    let userFromCookie=users.findByField("email",emailInCookies)
    if (userFromCookie)
    req.session.userLogged=userFromCookie
    

    if (req.session.userLogged){
        
        res.locals.isLogged=true;
        res.locals.userLogged=req.session.userLogged    
    }
        
         
    next();

}
module.exports=userLoggedMiddleware