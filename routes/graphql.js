const express = require('express');
const passport = require('passport');
const GraphqlController = require('../controllers/graphqlController');

const router = express.Router();

router.get(
    '/graphql', 
    passport.authenticate('jwt', { session: false }),
    GraphqlController.Graphql
);

module.exports = router;