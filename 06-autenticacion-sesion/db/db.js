const mongoose = require('mongoose');

const DB_URL = "mongodb://localhost:27017/autenticacion-con-passport";

const dbConnection = mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = { dbConnection, DB_URL };
