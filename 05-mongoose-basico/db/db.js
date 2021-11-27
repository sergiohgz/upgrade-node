const mongoose = require('mongoose');

const DB_URL = "mongodb://localhost:27017/ejemplo-todas-semillas";

const dbConnection = mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = dbConnection;
