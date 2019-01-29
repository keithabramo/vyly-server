const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const debug = require('debug')('app:strategiesLocal');
const mongoose = require('mongoose');

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const userDocument = await mongoose.model('user').findOne({username: username}).exec();
        
        if(userDocument) {
            const passwordsMatch = await bcrypt.compare(password, userDocument.passwordHash);
            
            if (passwordsMatch) {
                debug('password match');
                return done(null, userDocument);
            } else {
                debug('password do not match');
                return done('Incorrect Username / Password');
            }
        } else {
            debug('password do not match');
            return done('Incorrect Username / Password');
        }
    } catch (err) {
        debug(err);
        done(err);
    }
}));