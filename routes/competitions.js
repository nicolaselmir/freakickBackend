var express = require('express');
var router = express.Router();
var User = require('../schemas/users');
var config = require('../config');
var jwt = require('jsonwebtoken');
var axios = require('axios');

router.post('/', function(req, res, next) {
  
    var token = req.body.token;

    if (token) {
        jwt.verify(token, config.secret, function(err, decoded) {      
          if (err) {
            return res.json({ success: false, message: 'Failed to authenticate token.' });    
          } else {
            req.decoded = decoded;    

            axios.get('http://api.football-api.com/2.0/competitions?Authorization=565ec012251f932ea4000001fa542ae9d994470e73fdb314a8a56d76')
            .then(function(response){
                var arr = Object.values(response.data);
                var data = arr.map(function(item) {
                    info = ({
                        id:item.id,
                        name:item.name,
                        region:item.region,
                    });
                    return info;
                });
                res.json(data);
            });
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
