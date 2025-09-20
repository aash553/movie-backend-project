const winston = require('winston')
const express = require('express');
const app = express();

require('./startup/logging')()
require('./startup/routes')(app);
require('./startup/db')()  
require('./startup/config')()
require('./startup/validation')()
require('./startup/prod')(app)

// we are creating a validation function so that we dont have to cpy it
const port = process.env.PORT || 3000;
const server = app.listen(port ,()=>winston.info(`Server is running on port ${port}`));

module.exports = server;

