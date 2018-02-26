var express = require('express');
var router = express.Router();
var Room = require('../schemas/rooms');

router.get('/', function(req, res){
    console.log(req.query);
    
    Room.find({gameId: req.query.gameId}, function(err, room){
        if(room.length > 0 ){
            res.json({success: true ,message: 'Room already exists', room_id: room[0]._id})
        }else{
            var room = new Room({
                gameId: req.query.gameId,
                participants : null,
            }
            )
            room.save(function(err){
                if(err){
                    res.json({success: false, error: err});
                } else {
                    console.log(room._id);
                    res.json({success:true, room_id: room._id});
                }
            })
        }
    })
})

module.exports= router;