var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const messageSchema = new Schema({
    roomId: {type: String, required: true},
    text: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
},
{
    timestamps: true,
});

module.exports = mongoose.model('Message', messageSchema);