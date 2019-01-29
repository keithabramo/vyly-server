const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../keys');
const mongoose = require('mongoose');
const debug = require('debug')('app:authController');

class authController {
    static async Register(req, res) {
        
        const { username, password } = req.body;
        debug(`found username pass: ${username} : ${password}`);

        // authentication will take approximately 13 seconds
        // https://pthree.org/wp-content/uploads/2016/06/bcrypt.png
        const hashCost = 10;

        try {
            const passwordHash = await bcrypt.hash(password, hashCost);
            const userDocument = new mongoose.model('user')({ username, passwordHash });
            await userDocument.save();
            debug('document saved');
            res.status(200).json({ username });
        
        } catch (err) {
            debug(err);
            res.status(400).send({
                error: 'req body should take the form { username, password }',
            });
        }
    }

    static Login (req, res){
        
        if (!req.user) {
            res.status(400).send();
        }

        /** This is what ends up in our JWT */
        const payload = {
            username: req.user.username
        };

        try {
            /** generate a signed json web token and return it in the response */
            const token = jwt.sign(JSON.stringify(payload), keys.secret);
            debug('logged in token: ' + token);

            /** assign our jwt to the cookie */
            //res.cookie('jwt', token, { httpOnly: true, secure: true });
            res.status(200).json({ token });
        } catch (err) {
            debug(err);
            res.status(400).json({ err });
        }
    }
}

module.exports = authController;