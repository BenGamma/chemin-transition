require('coffee-script/register');
var express      = require('express');
var path         = require('path');
var favicon      = require('static-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var mongoose     = require('mongoose');
var passport     = require('passport');
var flash        = require('connect-flash');
var session      = require('express-session');
var env          = require('./config/environement');
var swig         = require('swig');


mongoose.connect(env.development.db);
var app = express();

// view engine setup

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// Swig will cache templates for you, but you can disable
// that and use Express's caching instead, if you like:
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

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
require('./config/passport')(passport);

var api = require('./config/routes/api');
app.use('/api', api)


module.exports = app;
