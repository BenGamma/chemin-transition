require('coffee-script/register');
var express      = require('express')
,path            = require('path')
,favicon         = require('static-favicon')
,logger          = require('morgan')
,cookieParser    = require('cookie-parser')
,bodyParser      = require('body-parser')
,mongoose        = require('mongoose')
,passport        = require('passport')
,flash           = require('connect-flash')
,session         = require('express-session')
,env             = require('./config/environement')
,swig            = require('swig');


mongoose.connect(env.development.db);
var app = express();

// view engine setup
app.engine('html', swig.renderFile)
app.set('view engine', 'html');
app.set('views', __dirname + '/views');


app.set('view cache', false);
// To disable Swig's cache, do the following:
swig.setDefaults({ cache: false });


// required for passport
app.use(session({ 
        secret: 'qsfqsff52837HD8992937VCVKLOPZ927DBXCZLPQS89096DVXWHLSZ',
        saveUninitialized: true,
        resave: true
    })
); // session secret

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Pass to next layer of middleware
    next();
});
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/partials', express.static(__dirname + '/views/partials'));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
require('./config/passport')(passport);

var api = require('./config/routes/api');
app.use('/api', api)

var route = require('./config/routes/routes');
app.use('/', route)


module.exports = app;
