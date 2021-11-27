const express = require('express');

const Empresa = require('../models/Empresa');

const router = express.Router();

// GET todas las empresas
router.get('/', (req, res, next) => {
    // No hacemos el populate('empleados') porque aqui queremos obtener los ids
    // de los empleados, pero no completar la información de los mismos
    Empresa.find()
        .then((empresas) => {
            return res.json(empresas);
        }).catch((error) => {
            next(error);
        });
});

// GET obtener una empresa indicada por id
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    // Indicamos a mongoose que obtenga la información completa
    // referenciada por los ids del campo empleados
    Empresa.findById(id).populate('empleados')
        .then(empresa => {
            if (!empresa) {
                const error = new Error(`Empresa ${id} no encontrado`);
                error.status = 404;
                return next(error);
            }
            return res.json(empresa)
        })
        .catch(error => {
            next(error);
        })
})

// GET solo empleados de la empresa indicada
router.get('/:id/empleados', (req, res, next) => {
    const empresaId = req.params.id;
    // Indicamos a mongoose que obtenga la información completa
    // referenciada por los ids del campo empleados
    Empresa.findById(empresaId).populate('empleados')
        .then(empresa => {
            if (!empresa) {
                const error = new Error(`Empresa ${id} no encontrado`);
                error.status = 404;
                return next(error);
            }
            return res.json(empresa.empleados);
        })
        .catch(error => {
            next(error);
        });
});

// POST para crear empresas
router.post('/', (req, res, next) => {
    const nuevaEmpresa = new Empresa({
        nombre: req.body.nombre,
        cif: req.body.cif,
        empleados: req.body.empleados || [],
    });

    nuevaEmpresa.save()
        .then(() => {
            return res.status(201).json(nuevaEmpresa);
        }).catch((error) => {
            next(error);
        });
});

// PUT editar una empresa
router.put('/:id', (req, res, next) => {
    const error = new Error('Metodo no implementado');
    error.status = 405;
    next(error);
});

// PUT para añadir empleado a empresa
router.put('/:id/empleados', (req, res, next) => {
    const empresaId = req.params.id;
    const usuarioId = req.body.usuarioAAnadir;

    Empresa.findByIdAndUpdate(
        empresaId,
        { $push: { empleados: usuarioId } },
        { new: true }
    )
        .then(empresaActualizada => {
            res.status(200).json(empresaActualizada)
        })
        .catch(error => {
            next(error);
        });
});

// DELETE de una empresa
router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    Empresa.findByIdAndDelete(id)
        .then(() => {
            return res.status(200).json(`Empresa con id ${id} eliminado`);
        })
        .catch(error => {
            next(error);
        });
});


module.exports = router;
