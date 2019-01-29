const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const debug = require('debug')('app');
const graphqlRouter = require('./routes/graphql');
const authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// setup database
require('./config/database');

// setup passport stategies
require('./strategies/local');
require('./strategies/jwt');

// setup body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// setup routing
app.use(authRouter);
app.use(graphqlRouter);

// start server
app.listen(PORT, () => {
    debug(`listening on port ${chalk.red(PORT)}`);
});