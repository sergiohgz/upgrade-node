const express = require('express');

const Usuario = require('../models/Usuario');

const router = express.Router();

// GET todos los usuarios
router.get('/', (req, res) => {
    Usuario.find()
        .then((usuarios) => {
            return res.json(usuarios);
        })
        .catch((error) => {
            console.error('Error en GET /', error);
            return res.status(500).json('Ha ocurrido un error en el servidor');
        })
});

// GET usuario indicado por id
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Usuario.findById(id)
        .then(usuario => {
            if (!usuario) {
                return res.status(404).json('Usuario no encontrado');
            }
            return res.json(usuario)
        })
        .catch(error => {
            console.error(`Error en GET /${id}`, error);
            return res.status(500).json('Ha ocurrido un error en el servidor');
        })
});

// GET de usuarios que tengan una edad especifica
router.get('/edad/:edad', (req, res) => {
    const edadSolicitada = req.params.edad;
    return Usuario.find({ edad: edadSolicitada })
        .then((usuarios) => {
            return res.json(usuarios);
        })
        .catch((error) => {
            console.error(`Error en GET /edad/${edad}`, error);
            return res.status(500).json('Ha ocurrido un error en el servidor');
        })
})

// GET de usuarios que tengan menos de una edad indicada
router.get('/edad/menosque/:edad', (req, res) => {
    const edadSolicitada = req.params.edad;
    return Usuario.find({ edad: { $lte: edadSolicitada } })
        .then((usuarios) => {
            return res.json(usuarios);
        })
        .catch((error) => {
            console.error(`Error en GET /edad/${edad}`, error);
            return res.status(500).json('Ha ocurrido un error en el servidor');
        })
})

module.exports = router;
