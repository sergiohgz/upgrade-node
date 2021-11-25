require('./db/db');
const express = require('express');
const usuariosRouter = require('./router/usuarios.router');
const server = express();
const PORT = 3000;

server.use('/usuarios', usuariosRouter);

server.use('*', (req, res) => {
    res.status(404).json('Not found')
});

server.listen(PORT, () => {
    console.log(`Servidor arrancado en el puerto ${PORT}`);
});
