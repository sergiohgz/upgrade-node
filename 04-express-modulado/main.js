const express = require('express');
const { basePath: usuariosPath, router: usuariosRouter } = require('./router/usuarios.router');

const app = express();
const PORT = 3000;

app.use(
    usuariosPath,
    usuariosRouter
);

app.use('*', (req, res) => {
    res.send('Ruta no encontrada');
});

app.listen(PORT, () => {
    console.log('Aplicacion express iniciada correctamente');
});
