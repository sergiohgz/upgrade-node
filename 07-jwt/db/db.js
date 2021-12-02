const mongoose = require('mongoose');

const { DB_URL } = require('../config/config');

const dbConnection = mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = { dbConnection };
