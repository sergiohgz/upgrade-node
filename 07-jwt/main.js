const express = require('express');

const { PORT, DB_URL, SECRET_SESSION } = require('./config/config');
require('./db/db');
const { isAuthenticated } = require('./middlewares/auth.middleware');
const usuariosRouter = require('./router/usuarios.router');
const empleadosRouter = require('./router/empleados.router');
const empresasRouter = require('./router/empresas.router');
const server = express();
const cors = require("cors");

server.set('secretKey', SECRET_SESSION);

// Middleware de cabeceras para CORS
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
server.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
}));

// Middlewares para entender los json bodys
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// Middleware de enrutado para /usuarios
server.use('/usuarios', usuariosRouter);

// Middleware de enrutado para /empleados
server.use('/empleados', [isAuthenticated], empleadosRouter);

// Middleware de enrutado para /empresas
server.use('/empresas', [isAuthenticated], empresasRouter);

// Middleware de enrutado para rutas no existentes
server.use('*', (req, res, next) => {
    const error = new Error('Ruta no encontrada');
    error.status = 404;
    next(error);
});

// Manejador/Middleware de errores, siempre se define con los 4 parametros (err, req, res, next)
server.use((err, req, res, next) => {
    console.error('[ERROR] Ha ocurrido un error', err.status, err.message);
	return res.status(err.status || 500).json(err.message || 'Ha ocurrido un error en el servidor');
});

server.listen(PORT, () => {
    console.log(`Servidor arrancado en el puerto ${PORT}`);
});
