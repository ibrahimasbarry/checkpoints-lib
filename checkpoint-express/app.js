'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = require('./routes');
module.exports = app; // this line is only used to make testing easier.

// remember to plug in your router and any other middleware you may need here.

// Body parser setup
app.use(bodyParser.json()); // for parsing application/json

// Register router
app.use('/', router);

// start the server
if (!module.parent) app.listen(3000); // conditional prevents a very esoteric EADDRINUSE issue with mocha watch + supertest + npm test.
