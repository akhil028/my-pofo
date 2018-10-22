const data = require('../myData.json')
const router = require('express').Router();
const datass = require('../seed-data')


router.get('/', (req, res) => {
    console.log(req.session)
    req.session.name = 'akhil'
    res.render('index', {
        title: 'Akhilesh Sooji',
        layout: 'layout-index'
    })
})


router.get('/contact', (req, res) => {
    console.log('Heloooooo index')
    res.render('contact', {
        title: 'Contact',
        layout: 'layout',
        nav: true,
        navContact: true,
        footer: true
    })
})



module.exports.about = (req, res) => {
    res.render('about', {
        title: 'About',
        layout: 'layout',
    })
}


router.get('/resume', (req, res) => {
    res.redirect('/Akhil2018-converted.pdf')
})



router.get('/sign-up', (req, res) => {
    res.render('signup', {
        title: 'Sign Up',
        layout: 'layout-signin'
    })
})


router.post('/sign-up', (req, res) => {
    let bodyData = req.body;
    let email = req.body.email;
    let password = req.body.password

    req.checkBody('email', 'Please enter the email').notEmpty().isEmail().withMessage('Email not correct');
    req.checkBody('password', 'Password field cannot be empty').notEmpty().isLength({
        min: 6,
        max: undefined
    }).withMessage('Password is too short')

    let errors = req.validationErrors();

    if (errors && errors.length > 0) {
        let messages = [];

        errors.forEach(error => {
            messages.push(error.msg)
        });

        res.render('signup', {
            title: 'Sign up',
            layout: 'layout-signin',
            errors: messages
        });
    } else {
        data.users.push(bodyData);
        res.render('/sign-in');
    }
})




router.get('/sign-in', (req, res) => {
    res.render('signin', {
        title: 'Sign In',
        layout: 'layout-signin',
        nav: false,
        extraCss: ['/css/signin.css'],
        footer: false
    })
})

router.post('/sign-in', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    if (data.user.email == email && data.user.password == password) {
        req.session.isAuthenticated = true
        req.session.user = data.user;
        res.locals.user = data.user;
        console.log('Hello')
        res.redirect('/admin')
    } else {
        res.render('signin', {
            title: 'Login',
            layout: 'layout-siginin',
            nav: false,
            extraCss: ['/css/signin.css'],
            footer: false
        })
    }
})




router.get('/logout', (req, res) => {
    req.session.isAuthenticated = false;
    delete req.session.user;
    res.redirect('/')
})




module.exports = router
























// module.exports.admin = (req,res) => {
//     res.render('admin', {
//         title:'admin',
//         layout:'layout-admin'
//     })
// }









// module.exports.doContact = (req,res) => {
//     let dat = req.body;
//     let email = req.body.email
//     console.log(JSON.stringify(dat))
//     req.checkBody('email', 'Please enter the email').notEmpty().isEmail().withMessage('Email not correct')

//     let error = req.validationErrors();

//     if(error && error.length > 0) {
//         let messages = [];

//         error.forEach(error => {
//             messages.push(error.msg)
//         });
//         res.render('contact', {
//             title:'contact',
//             layout:'layout',
//             errors: messages
//         })
//     } else {
//         data.users.push(dat) 
//         res.send('Got it')
//     }
// }