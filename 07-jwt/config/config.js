const dotenv = require('dotenv'); // require('dotenv').config();
dotenv.config();

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;
const SECRET_SESSION = process.env.SECRET_SESSION;
const SALTOS_ENCRIPTADO_PASSWORD = Number(process.env.SALTOS_ENCRIPTADO_PASSWORD);

module.exports = {
    PORT,
    DB_URL,
    SECRET_SESSION,
    SALTOS_ENCRIPTADO_PASSWORD,
};
