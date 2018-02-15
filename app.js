var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var hbs = require('hbs');

var jwt = require('jsonwebtoken');
var config = require('./config');

var index = require('./routes/index');
var users = require('./routes/users');

var signup = require('./routes/authentication/signup');
var login = require('./routes/authentication/login');

var profile = require('./routes/profile');
var matches = require('./routes/matches');
var competitions = require('./routes/competitions');

var chat = require('./routes/chat');
var getChats = require('./routes/getChat');

var app = express();
mongoose.connect(config.database); // connect to database

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('superSecret', config.secret); // secret variable

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api/users', users);

app.use('/api/signup', signup);
app.use('/api/login', login);

app.use('/api/profile',profile);
app.use('/api/matches',matches);
app.use('/api/competitions',competitions);

app.use('/api/chat',chat);
app.use('/api/chats',getChats);

module.exports = app;
