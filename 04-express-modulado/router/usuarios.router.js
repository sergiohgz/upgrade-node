const express = require('express');
const fs = require('fs');

const router = express.Router();
const basePath = '/usuarios';
const filename = require.resolve('./usuarios.json');

// /usuarios/id
router.get('/:userId', (req, res) => {
    const usuarioId = Number(req.params.userId);
    if (Number.isNaN(usuarioId)) {
        res.sendStatus(400);
        return;
    }
    fs.readFile(filename, (error, data) => {
        if (error) {
            console.error('ERROR AL LEER ARCHIVO', error);
            // Responder con que ha sucedido un error
            res.status(500).send('Ha ocurrido un error, intentelo más tarde');
            return;
        }
        const usuarios = JSON.parse(data);
        const usuario = usuarios.find(
            usuarioEnBaseDeDato => usuarioEnBaseDeDato.id === usuarioId
        );
        if (!usuario) {
            res.status(404).send('Usuario no encontrado');
            return;
        }
        res.send(usuario);
    })
});

// Obtener todos los usuarios
// /usuarios
router.get('/', (req, res) => {
    fs.readFile(filename, (error, data) => {
        if (error) {
            console.error('ERROR AL LEER ARCHIVO', error);
            // Responder con que ha sucedido un error
            res.status(500).send('Ha ocurrido un error, intentelo más tarde');
            return;
        }
        const usuarios = JSON.parse(data);
        res.send(usuarios);
    })
});

// /usuarios
router.post('/', (req, res) => {
    const { nombre, apellido, edad } = req.body;
    let camposFaltantes = [];
    if (!nombre) {
        camposFaltantes.push('nombre');
    }
    if (!apellido) {
        camposFaltantes.push('apellido');
    }
    if (!edad) {
        camposFaltantes.push('edad');
    }
    if (camposFaltantes.length > 0) {
        res.status(400).send(camposFaltantes.map(campo => `${campo} es obligatorio`).join('\n'));
        return;
    }
    fs.readFile(filename, (error, data) => {
        if (error) {
            console.error('ERROR AL LEER ARCHIVO', error);
            // Responder con que ha sucedido un error
            res.status(500).send('Ha ocurrido un error, intentelo más tarde');
            return;
        }
        const usuarios = JSON.parse(data);
        const ultimoUsuario = usuarios[usuarios.length - 1];
        const usuarioAEscribir = {
            id: ultimoUsuario.id + 1,
            nombre,
            apellido,
            edad,
        };
        const usuarioConNuevoUsuario = usuarios.concat(usuarioAEscribir);
        fs.writeFile(
            filename,
            JSON.stringify(usuarioConNuevoUsuario),
            (error) => {
                if (error) {
                    console.error('Error al escribir archivo', error);
                    res.status(500).send('Ha ocurrido un error, intentelo más tarde');
                    return;
                }
                res.status(201).json(usuarioAEscribir);
            }
        );
    });
});

router.put('/:id', (req, res) => {
    const usuarioId = Number(req.params.id);
    if (Number.isNaN(usuarioId)) {
        res.sendStatus(400);
        return;
    }
    const {nombre, apellido, edad} = req.body;
    fs.readFile(filename, (error, data) => {
        if (error) {
            console.error('ERROR AL LEER ARCHIVO', error);
            // Responder con que ha sucedido un error
            res.status(500).send('Ha ocurrido un error, intentelo más tarde');
            return;
        }
        const usuarios = JSON.parse(data);
        const usuario = usuarios.find((usuarioEnDB) => usuarioEnDB.id === usuarioId);

        if (!usuario) {
            res.status(404).send('Usuario no encontrado');
            return;
        }

        usuario.nombre = nombre || usuario.nombre;
        usuario.apellido = apellido || usuario.apellido;
        usuario.edad = edad ?? usuario.edad;

        fs.writeFile(
            filename,
            JSON.stringify(usuarios),
            (error) => {
                if (error) {
                    console.error('Error al escribir archivo', error);
                    res.status(500).send('Ha ocurrido un error, intentelo más tarde');
                    return;
                }
                res.status(200).json(usuario);
            }
        );
    });
});

router.delete('/:id', (req, res) => {
    const usuarioId = Number(req.params.id);
    if (Number.isNaN(usuarioId)) {
        res.sendStatus(400);
        return;
    }
    fs.readFile(filename, (error, data) => {
        if (error) {
            console.error('ERROR AL LEER ARCHIVO', error);
            // Responder con que ha sucedido un error
            res.status(500).send('Ha ocurrido un error, intentelo más tarde');
            return;
        }
        const usuarios = JSON.parse(data);
        const usuariosSinElUsuarioEliminado = usuarios.filter(
            (usuario) => usuario.id !== usuarioId
        );
        fs.writeFile(
            filename,
            JSON.stringify(usuariosSinElUsuarioEliminado),
            (error) => {
                if (error) {
                    console.error('Error al escribir archivo', error);
                    res.status(500).send('Ha ocurrido un error, intentelo más tarde');
                    return;
                }
                res.sendStatus(200);
            }
        );
    });
});

router.use('*', (req, res) => {
    res.status(405).send('Método no encontrado');
})

module.exports = {
    router,
    basePath,
};
