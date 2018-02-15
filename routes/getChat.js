var express = require('express');
var router = express.Router();
var Chat = require('../schemas/chat');

router.get('/', function(req, res, next) {
  Chat.find({}, function(err, users) {
    res.json(users);
  });
});

module.exports = router;
