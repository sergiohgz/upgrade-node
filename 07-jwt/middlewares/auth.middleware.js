const jwt = require('jsonwebtoken');
const { SECRET_SESSION } = require('../config/config');


const isAuthenticated = (req, res, next) => {
    // 1. Obtenemos la cabecera con el token de autorización
    const authorization = req.headers.authorization;
    if (!authorization) {
        const error = new Error();
        error.status = 401;
        error.message = 'Acceso no autorizado';
        return next(error);
    }

    // 2. Verificamos la forma en que nos llega la cabecera (Bearer <token>)
    const [type, jwtReceived] = authorization.split(' ');
    if (!type || !jwtReceived || type !== 'Bearer') {
        const error = new Error();
        error.status = 400;
        error.message = 'Bad Request';
        return next(error);
    }

    // 3. Verificar la firma del token
    try {
        console.log(jwtReceived);
        const tokenData = jwt.verify(jwtReceived, req.app.get('secretKey'));

        req.authority = {
            id: tokenData.id,
            email: tokenData.email,
        };
        return next();
    } catch(error) {
        return next(error);
    }
};

module.exports = {
    isAuthenticated,
};
