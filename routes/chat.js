var express = require('express');
var router = express.Router();
var Chat = require('../schemas/chat');
var config = require('../config');
var jwt = require('jsonwebtoken');
var axios = require('axios');

var http = require("http").Server(app);
var io= require("socket.io")(http)
var app = express();

router.post('/', function(req, res, next) {
    var chat = new Chat(req.body);
    
      // save the sample user
      chat.save(function(err) {
        res.json({ success: true, error: err});
      });

      io.emit("chat",req.body);
});

module.exports = router;
