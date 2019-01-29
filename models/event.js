//Require Mongoose
var mongoose = require('mongoose');
var { ObjectId } = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var Rating = new Schema({
    value: Number,
    comment: String,
    rater_id: ObjectId
});

mongoose.model('rating', Rating );

var Event = new Schema({
    name: String,
    description: String,
    type: String,
    pictureUrl: String,
    startDate: Date,
    endDate: Date,
    host_id: ObjectId,
    isDeleted: Boolean,
    ratings: [Rating]
});

mongoose.model('event', Event );
