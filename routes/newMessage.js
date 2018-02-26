var express = require('express');
var router = express.Router();
var Message = require('../schemas/messages');

router.post('/', function(req, res, next){
    const message = new Message({
        roomId: req.query.roomId,
        text: req.body.message,
        user: req.query.userId,
    })

    message.save(function (err){
        if(err){
            res.json({success: false, error: err});
        } else {
            res.json({success: true});
        }

    })
});

module.exports = router;