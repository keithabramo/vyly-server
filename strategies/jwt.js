const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const Keys = require('../Keys');
const debug = require('debug')('app:strategiesJWT');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: Keys.secret
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        debug(jwt_payload);
        const userDocument = await mongoose.model('user').findOne({username: jwt_payload.username}).exec();
        
        if(userDocument) {
            const payload = {
                username: userDocument.username
            };
            debug(payload);

            if (userDocument) {
                return done(null, payload);
            } else {
                return done(null, false);
            }
        } else {
            return done('Session timed out. Please relogin', false);
        }
    } catch (err) {
        return done(err, false);
    }
}));