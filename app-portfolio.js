// Import modules
var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var hbs = require('hbs');
var session = require('express-session');
// var routeHandler = require('./routes/index');
var validator = require('express-validator')
var appMiddle = require('./middlewares/app-middleware')
var auth = require('./middlewares/auth')
var index = require('./routes/index')
var blog = require('./routes/blogs')
var projects = require('./routes/projects')
var admin = require('./routes/admin')



// register view engines
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/views/partials')

app.use(session({
    secret: 'my secret',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 30 * 24 * 60 * 1000
    },
}));

// register static resources
app.use(express.static(__dirname + '/static'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(validator());
app.use(appMiddle.logger)
app.use(auth.authenticated);




// app Routes

app.use('/', index)
app.use('/blogs', blog)
app.use('/projects', projects)
app.use('/admin', auth.authenticate, admin)




// app.get('/', routeHandler.index)
// app.get('/projects', routeHandler.projects)
// app.get('/blogs', routeHandler.blogList)
// app.get('/blog/:alias', routeHandler.blogDetail)
// app.get('/sign-in', routeHandler.signin)
// app.get('/sign-up', routeHandler.signup)
// app.post('/sign-up', routeHandler.doSignup)
// app.post('/sign-in', routeHandler.doSignin)
// app.post('/sign-in', routeHandler.doSignin)
// app.get('/admin', auth.authenticate, routeHandler.admin)
// app.get('/project/:alias', routeHandler.projectDetail)
// app.get('/blogs/:alias', routeHandler.blogDetail)
// app.get('/resume', routeHandler.resume)
// app.get('/contact', routeHandler.contact)
// app.post('/contact', routeHandler.doContact)
// app.get('/about', routeHandler.about)
// app.get('/logout', routeHandler.logout)




app.use(appMiddle.notFound);
app.use(appMiddle.errors);


// start Server
app.listen(3000, () => console.log('server is running on port 3000'));