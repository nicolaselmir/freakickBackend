var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const roomSchema = new Schema({
    gameId: {type: String, Required: true},
    participants : [{type: Schema.Types.ObjectId, ref: 'User'}],
},{
    timestamps: true
});

var Room = mongoose.model('Room', roomSchema);

module.exports = Room;