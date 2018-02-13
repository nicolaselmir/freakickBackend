var express = require('express');
var router = express.Router();
var User = require('../../schemas/users');

router.post('/', function(req, res, next) {
   // create a sample user
   var user = new User({  
    name: req.body.name, 
    email: req.body.email,
    password: req.body.password,
    token:"null"
  });

  // save the sample user
  user.save(function(err) {
    res.json({ success: true, error: err});
  });
});

module.exports = router;
