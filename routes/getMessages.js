var express = require('express');
var router = express.Router();
var Message = require('../schemas/messages');

router.get('/', function(req, res, next){
    Message.find({ roomId: req.query.roomId })
      .select('createdAt text user')
      .sort('-createdAt')
      .populate({
        path: 'user',
        select: 'name'
      })
      .exec(function(err, messages) {
        if (err) {
          res.send({ error: err });
          return next(err);
        }
  
        res.status(200).json({ messages: messages });
    });
    
});

module.exports = router;