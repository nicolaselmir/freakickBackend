var express = require('express');
var router = express.Router();
var User = require('../schemas/users');

router.post('/', function(req, res, next) {
  var userId = req.body.userId;
  var team = req.body.team;

  User.findById(userId)
    .select('favs')
    .exec(function (err, data) {
        if(err)
            console.log(err);
        else
          if(data.favs.indexOf(req.body.team) == -1){ 
            query = { '_id': userId};
            update = {
              $push : {favs: team}
            };
            option = {upsert: true, new: true};
            User.findByIdAndUpdate(query, update, option, function (err, data) {
              if (err) {
                return res.status(500).send(err);
              }
              if (!data) {
                  return res.status(404).end();
              }
              return res.status(200).send({success: true});
            });
          }else{
            return res.status(200).send({success: false, message: req.body.team+ ' already added to favorites'});
          }
            console.log(data.favs.indexOf(req.body.team));
    })
  

  


});

module.exports = router;
