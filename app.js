var express = require('express');
var server = require('http').Server(express);
const io = require('socket.io')();
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

const Message = require('./schemas/messages');
var newRoom = require('./routes/newRoom');
var newMessage = require('./routes/newMessage');
var getMessages = require('./routes/getMessages');
var addFavTeam = require('./routes/addFavTeam');
var getFavs = require('./routes/getFavs');


var app = express();
io.listen(3001);
console.log('socket listening on port ', 3001);
mongoose.connect(config.database); // connect to database

io.on('connection', function (socket) {
  console.log('connected');
  socket.on('new room', (mes) => {
    socket.join(mes.roomId);
  });
  socket.on('new message', (mes) => {
    const message = new Message({
      roomId: mes.roomId,
      text: mes.message,  
      user: mes.user._id,
    });
    message.save(function (err, res){
      if(err){
          console.log(err); 
      } else {
         console.log(res);
         socket.to(mes.roomId).emit('new message', {
           _id: res._id,
           text: res.text,
           roomId: mes.roomId,
           createdAt: res.createdAt,
           user: {
             _id: mes.user._id,
           }
         });
      }
    })
  });
});


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
app.use('/api/newRoom', newRoom);
app.use('/api/newMessage', newMessage);
app.use('/api/getMessages', getMessages);
app.use('/api/addFavTeam', addFavTeam);
app.use('/api/getFavs', getFavs);

module.exports = app;
