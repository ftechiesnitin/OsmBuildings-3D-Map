var dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.load();

var config = module.exports = {};

config.env = process.env.NODE_ENV;
config.port = process.env.APP_PORT;
