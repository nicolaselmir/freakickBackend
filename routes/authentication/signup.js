var express = require('express');
var bcrypt = require('bcrypt')
var router = express.Router();
var User = require('../../schemas/users');

const saltRounds = 10;

router.post('/', function(req, res, next) {
   // create a sample user
   const PlainTextPassword = req.body.password;
   bcrypt.hash(PlainTextPassword, saltRounds, function(err, hash){
    var user = new User({  
      name: req.body.name, 
      email: req.body.email,
      password: hash,
      token:"null"
    });
    // save the sample user
    user.save(function(err) {
      res.json({ success: true, error: err});
    });
   }); 
});

module.exports = router;
