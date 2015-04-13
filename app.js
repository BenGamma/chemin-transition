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
,swig            = require('swig')
,busboy          = require('connect-busboy');


//mongoose.connect(env.development.db);

var Sequelize = require('sequelize')
  , sequelize = new Sequelize('db', 'root', 'blabla', {
      dialect: "mysql", // or 'sqlite', mysql', 'mariadb'
      port:    3306, // or 5432 (for postgres)
    })
 
sequelize
  .authenticate()
  .complete(function(err) {
    if (!!err) {
      console.log('Unable to connect to the database:', err)
    } else {
      console.log('Connection has been established successfully.')
    }
  })

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

app.use(busboy());

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,X-token, X-email, Cache-Control, X-Requested-With");

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
//module.exports = sequelize;