const data = require('../seed-data')

function getProjects(alias) {
    if(alias) {
        var index = data.projectIndex[alias];
        console.log(index);
        return data.myProjects[index];
    } else {
        return data.myProjects;
    }
}


module.exports.index = (req,res) => {
    res.render('index', {
    title: 'Akhilesh Sooji',
    layout: 'layout-index'
    })
}


module.exports.projects = (req,res) => {
    res.render('projects', {
        title:'Projects',
        layout:'layout',
        navProjects:true,
        projects:getProjects()
    })
}


module.exports.projectDetail = (req,res) => {
    var alias = req.params.alias;
    res.render('project-detail', {
        title:'Details',
        layout:'layout',
        project:getProjects(alias)
    })
}


module.exports.blogList = (req,res) => {
    res.render('blog', {
        title:'Blogs',
        layout:'layout',
        navBlogs: true,
        blogs:getBlog()
    })
}

module.exports.signin = (req,res) => {
    res.render('signin', {
        title:'Sign In',
        layout:'layout-signin'
    })
}


module.exports.signup = (req,res) => {
    res.render('signup', {
        title:'Sign Up',
        layout:'layout-signin'
    })
}



module.exports.doSignup = (req,res) => {
    let bodyData = req.body;
    let email = req.body.email;
    let password = req.body.password

    req.checkBody('email', 'Please enter the email').notEmpty().isEmail().withMessage('Email not correct');
    req.checkBody('password', 'Password field cannot be empty').notEmpty().isLength({min:6, max:undefined}).withMessage('Password is too short')

    let errors = req.validationErrors();

    if(errors && errors.length > 0) {
        let messages = [];

        errors.forEach(error => {
            messages.push(error.msg)
        });

        res.render('signup', {
            title:'Sign up',
            layout:'layout-signin',
            errors: messages
        });
    } else {
        data.users.push(bodyData);
        res.send('Got it');
    }
}


module.exports.doSignin = (req,res) => {
    let datas = req.body;
    let email = req.body.email
    let password = req.body.password

    req.checkBody('email', 'Please enter the email').notEmpty().isEmail().withMessage('Email not correct')
    req.checkBody('password', 'Password field cannot be empty').notEmpty().isLength({min:6, max:undefined}).withMessage('Password is too short')

    let errors = req.validationErrors();


    if(errors && errors.length > 0) {
        let messages = [];

        errors.forEach(error => {
            messages.push(error.msg)
        });

        res.render('signin', {
            title:'Sign in',
            layout:'layout-signin',
            errors: messages
        });
    } else {
        data.users.push(datas);
        res.send('Got it');
    }
}


module.exports.dashboard = (req,res) => {
    res.render('dashboard', {
        title:'Dashboard',
        layout:'layout-dashboard'
    })
}





