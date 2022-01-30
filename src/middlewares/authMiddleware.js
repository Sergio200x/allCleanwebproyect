function authMiddleware(req,res,next){
    if (!req.session.userLogged){
        return res.redirect('/users/Login');
    }
    next();
}

module.exports = authMiddleware