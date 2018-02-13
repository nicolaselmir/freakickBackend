var express = require('express');
var router = express.Router();
var User = require('../schemas/users');
var config = require('../config');
var jwt = require('jsonwebtoken');

router.post('/', function(req, res, next) {
  
    var token = req.body.token;

    if (token) {
        jwt.verify(token, config.secret, function(err, decoded) {      
          if (err) {
            return res.json({ success: false, message: 'Failed to authenticate token.' });    
          } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;    
            
            User.findById(req.body.id, function(err, result) {
                res.send(result);
            })
          }
        });
      } else {
        return res.status(403).send({ 
            success: false, 
            message: 'Not Authorized' 
        });
    
      }
});

module.exports = router;
