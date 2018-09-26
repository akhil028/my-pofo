// Import modules
var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var hbs = require('hbs');
var routeHandler =require('./routes/index');
var validator = require('express-validator')
var appMiddle = require('./middlewares/app-middleware')



// register view engines
app.set('views', __dirname+'/views');
app.set('view engine', 'hbs')
hbs.registerPartials(__dirname+'/views/partials')

// register static resources
app.use(express.static(__dirname+'/static'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(validator());
app.use(appMiddle.logger)


// app Routes
app.get('/', routeHandler.index)
app.get('/projects', routeHandler.projects)
app.get('/blogs', routeHandler.blogList)
app.get('/sign-in', routeHandler.signin)
app.get('/sign-up', routeHandler.signup)
app.post('/sign-up', routeHandler.doSignup)
app.post('/sign-in', routeHandler.doSignin)
app.get('/dashboard', routeHandler.dashboard)
app.get('/project/:alias', routeHandler.projectDetail)



app.use(appMiddle.notFound);
app.use(appMiddle.errors);


// start Server
app.listen(3000, () => console.log('server is running on port 3000'));

