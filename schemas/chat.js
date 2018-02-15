var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var chat = new Schema({
  name: String,
  message: String,
});

// the schema is useless so far
// we need to create a model using it
var Chat = mongoose.model('Chat', chat);

// make this available to our users in our Node applications
module.exports = Chat;