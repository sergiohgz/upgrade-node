const logger = (req, res, next) => {
    console.log('REQ Recibida', req.url, req.method, req.body);
    return next();
};

module.exports = {
    logger,
};
