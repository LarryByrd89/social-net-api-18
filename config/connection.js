const mongoose = require('mongoose');

const DB_NAME = 'social-net-api-18';

mongoose.connect(process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/${DB_NAME}`);

module.exports = mongoose.connection;

