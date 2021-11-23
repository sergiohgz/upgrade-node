const express = require('express');
const { basePath: usuariosPath, router: usuariosRouter } = require('./router/usuarios.router');

const app = express();
const PORT = 3000;

app.use(express.json()); // middleware para activar los bodys en formato JSON
app.use(express.urlencoded({ extended: false }));

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
