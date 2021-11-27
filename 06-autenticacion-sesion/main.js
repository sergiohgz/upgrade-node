const express = require('express');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')

const { DB_URL } = require('./db/db');
require('./authentication/passport');
const usuariosRouter = require('./router/usuarios.router');
const empleadosRouter = require('./router/empleados.router');
const empresasRouter = require('./router/empresas.router');
const server = express();
const PORT = 3000;

// Middlewares para entender los json bodys
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// Middleware para el mantenimiento de la cookie de sesión
server.use(session({
    secret: 'secreto-local',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000 // 1h = 3600 segundos * 1000 milisegundos/segundo
    },
    store: MongoStore.create({ mongoUrl: DB_URL })
}));

// Middleware para la autenticación (registro/login)
server.use(passport.initialize());

// Middleware para sesión de auth
server.use(passport.session());

// Middleware de enrutado para /usuarios
server.use('/usuarios', usuariosRouter);

// Middleware de enrutado para /empleados
server.use('/empleados', empleadosRouter);

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
