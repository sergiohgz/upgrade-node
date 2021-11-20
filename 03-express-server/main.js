const express = require('express');

const app = express();
const PORT = 3000;

const routerUsuario = express.Router();

// /usuarios/1 -> /usuarios/:id
routerUsuario.get('/:id', (req, res) => {
    res.send('Funcionalidad no implementada: Obtener 1 solo usuario')
});
// /usuarios
routerUsuario.get('/', (req, res) => {
    const usuarios = [
        { id: 1, nombre: 'Pepe', apellido: 'Jimenez' },
        { id: 2, nombre: 'María', apellido: 'Tocornal' }
    ];
    res
        .setHeader('Content-Type', 'application/json')
        .send(usuarios);
});
routerUsuario.post('/', (req, res) => {
    res.send('Funcionalidad no implementada: CrearUsuario');
});
routerUsuario.put('/', (req, res) => {
    res.send('Funcionalidad no implementada: EditarUsuario');
});
routerUsuario.delete('', (req, res) => {
    res.send('Funcionalidad no implementada: EliminarUsuario');
});

app.use('/usuarios', routerUsuario);

app.get('*', (req, res) => {
    res.send('Hola mundo');
});

app.listen(PORT, () => {
    console.log('Aplicacion express iniciada correctamente');
});


// localhost:3000/ <-> localhost:3000
// localhost:3000/usuarios/ <-> localhost:3000/usuarios
// localhost:3000/usuarios/:id
// localhost:3000/piedras
