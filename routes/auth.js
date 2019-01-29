const express = require('express');
const passport = require('passport');
const AuthController = require('../controllers/authController');

const router = express.Router();

// Test endpoint. Delete before production deployment
router.get(
    '/login', 
    (req, res) => {
        const location = 'C:\\dev\\vyly\\server\\views\\login.html';
        res.sendFile(location);
    }
);

router.post(
    '/register', 
    AuthController.Register
);

router.post(
    '/login', 
    passport.authenticate('local', { session: false }), 
    AuthController.Login
);

module.exports = router;