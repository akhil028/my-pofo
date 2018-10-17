
module.exports.authenticated = function(req,res,next) {
    console.log("helloooo AUTH")
    console.log(req.session.isAuthenticated)
    req.session.isAuthenticated = req.session.isAuthenticated ? true : false;
    console.log(req.session.isAuthenticated)
    
    res.locals.isAuthenticated = req.sesssion.isAuthenticated;
    if(req.session.isAuthenticated) {
        res.locals.user = req.session.user;
    } 
    next();}

module.exports.authenticate = function(req,res,next) {
    console.log("hey AUTH")
    if(req.session && req.session.isAuthenticated) {
        next()
    } else {
        res.redirect('/sign-in')
    }
}
