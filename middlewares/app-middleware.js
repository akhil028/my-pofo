module.exports.notFound = (req,res,next) => {
    console.log('Hey Middleware')
    res.render('404', {
        title:'Page Not Found',
        layout:'layout-signin'
    })
}

module.exports.errors = (err,req,res,next) => {
    console.log(err)
    res.render('500', {
        title:'Server error',
        layout:'layout-signin'
    })
}


module.exports.logger = (req,res,next) => {
    console.log(`${req.method} ${req.url}`);
    next();
}
