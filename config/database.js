const mongoose = require('mongoose');
const debug = require('debug')('app:configDatabase');
const { dbConnectionString } = require('../keys');

mongoose.connect(
    dbConnectionString,
    {
        useNewUrlParser: true
    }
);

const db = mongoose.connection;
db.on('error', (err) => debug('database connection error:' + err));
db.once('open', function () {
    // we're connected!
    debug('Connected to MongoDB database');
});

//setup schema
require('../models/user');
require('../models/event');

module.exports = db;