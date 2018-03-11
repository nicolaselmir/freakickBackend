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

  axios.get('http://api.football-api.com/2.0/matches?Authorization=565ec012251f932ea4000001fa542ae9d994470e73fdb314a8a56d76'+"&comp_id="+req.body.comp_id+"&match_date="+req.body.match_date)
  .then(function(response){
    var arr = Object.values(response.data);
    
    var data = arr.map(function(item) {
        info = ({
            id:item.id,
            comp_id:item.comp_id,
            formatted_date:item.formatted_date,
            season: item.season,
            week: item.week,
            venue: item.venue,
            venue_id: item.venue_id,
            venue_city: item.venue_city,
            status: item.status,
            timer:item.timer,
            time: item.time,
            localteam_id: item.localteam_id,
            localteam_name: item.localteam_name,
            localteam_score:item.localteam_score,
            visitorteam_id: item.visitorteam_id,
            visitorteam_name: item.visitorteam_name,
            visitorteam_score: item.visitorteam_score,
            ht_score: item.ht_score,
            ft_score: item.ft_score,
            et_score: item.et_score,
            penalty_local: item.penalty_local,
            penalty_visitor: item.penalty_visitor,
            events:item.events,
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
