var express = require('express');
var router = express.Router();
var User = require('../schemas/users');

router.post('/', function(req, res, next){
    User.findById(req.body.userId)
        .select('favs')
        .exec(function(err, data){
            if(err)
                res.status(500).send({success: false, err: err});
            else
                res.status(200).send({success: true, favs: data.favs});
        })
});

module.exports = router;