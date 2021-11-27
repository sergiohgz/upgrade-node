require('./db/db');
const express = require('express');
const usuariosRouter = require('./router/usuarios.router');
const empresasRouter = require('./router/empresas.router');
const server = express();
const PORT = 3000;

// Middlewares para entender los json bodys
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// Middleware de enrutado para /usuarios
server.use('/usuarios', usuariosRouter);

// Middleware de enrutado para /empresas
server.use('/empresas', empresasRouter);

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
