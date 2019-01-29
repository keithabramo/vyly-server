//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var User = new Schema({
    username: String,
    passwordHash: String,
    DisplayName: String,
    PictureUrl: String,
    IsDeleted: Boolean,
    visitedEvents: []
});

mongoose.model('user', User );
