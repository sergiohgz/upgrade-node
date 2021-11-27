const express = require('express');

const Usuario = require('../models/Usuario');

const router = express.Router();

// GET todos los usuarios
router.get('/', (req, res, next) => {
    Usuario.find()
        .then((usuarios) => {
            return res.json(usuarios);
        })
        .catch((error) => {
            const errorOcurrido = new Error();
            return next(errorOcurrido);
        })
});

// GET usuario indicado por id
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Usuario.findById(id)
        .then(usuario => {
            if (!usuario) {
                const error = new Error(`Usuario ${id} no encontrado`);
                error.status = 404;
                return next(error);
            }
            return res.json(usuario)
        })
        .catch(error => {
            return next(new Error());
        })
});

// GET de usuarios que tengan una edad especifica
router.get('/edad/:edad', (req, res, next) => {
    const edadSolicitada = req.params.edad;
    return Usuario.find({ edad: edadSolicitada })
        .then((usuarios) => {
            return res.json(usuarios);
        })
        .catch((error) => {
            return next(new Error());
        })
})

// GET de usuarios que tengan menos de una edad indicada
router.get('/edad/menosque/:edad', (req, res, next) => {
    const edadSolicitada = req.params.edad;
    return Usuario.find({ edad: { $lte: edadSolicitada } })
        .then((usuarios) => {
            return res.json(usuarios);
        })
        .catch((error) => {
            return next(new Error());
        })
})

// POST para crear usuario
// /usuarios/create -> antipatrón, la acción la debe definir el verbo (POST)
// /usuarios -> patrón correcto
router.post('/', (req, res, next) => {
    const nuevoUsuario = new Usuario({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        edad: req.body.edad,
    });

    nuevoUsuario.save()
        .then(() => {
            return res.status(201).json(nuevoUsuario);
        }).catch((error) => {
            next(error);
        });
});

// PUT de un usuario -> Editar a un usuario
router.put('/:id', (req, res, next) => {
    const usuarioId = req.params.id;
    const nuevoUsuario = new Usuario(req.body); // { nombre: req.body.nombre, edad: req.body.edad, ... }
    nuevoUsuario._id = usuarioId;
    Usuario.findByIdAndUpdate(usuarioId, nuevoUsuario, { new: true })
        .then(usuarioActualizado => {
            res.status(200).json(usuarioActualizado);
        })
        .catch(error => {
            next(error);
        });
});

// DELETE de un usuario
router.delete('/:id', (req, res, next) => {
    const usuarioId = req.params.id;
    Usuario.findByIdAndDelete(usuarioId)
        .then(() => {
            return res.status(200).json(`Usuario con id ${usuarioId} eliminado`);
        })
        .catch(error => {
            next(error);
        });
});

module.exports = router;
