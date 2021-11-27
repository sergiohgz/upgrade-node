const express = require('express');

const Empleado = require('../models/Empleado');

const router = express.Router();

// GET todos los empleados
router.get('/', (req, res, next) => {
    Empleado.find()
        .then((empleados) => {
            return res.json(empleados);
        })
        .catch((error) => {
            const errorOcurrido = new Error();
            return next(errorOcurrido);
        })
});

// GET empleado indicado por id
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Empleado.findById(id)
        .then(empleado => {
            if (!empleado) {
                const error = new Error(`Empleado ${id} no encontrado`);
                error.status = 404;
                return next(error);
            }
            return res.json(empleado)
        })
        .catch(error => {
            return next(new Error());
        })
});

// GET de empleados que tengan una edad especifica
router.get('/edad/:edad', (req, res, next) => {
    const edadSolicitada = req.params.edad;
    return Empleado.find({ edad: edadSolicitada })
        .then((empleados) => {
            return res.json(empleados);
        })
        .catch((error) => {
            return next(new Error());
        })
})

// GET de empleados que tengan menos de una edad indicada
router.get('/edad/menosque/:edad', (req, res, next) => {
    const edadSolicitada = req.params.edad;
    return Empleado.find({ edad: { $lte: edadSolicitada } })
        .then((empleados) => {
            return res.json(empleados);
        })
        .catch((error) => {
            return next(new Error());
        })
})

// POST para crear empleado
// /empleados/create -> antipatrón, la acción la debe definir el verbo (POST)
// /empleados -> patrón correcto
router.post('/', (req, res, next) => {
    const nuevoEmpleado = new Empleado({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        edad: req.body.edad,
    });

    nuevoEmpleado.save()
        .then(() => {
            return res.status(201).json(nuevoEmpleado);
        }).catch((error) => {
            next(error);
        });
});

// PUT de un empleado -> Editar a un empleado
router.put('/:id', (req, res, next) => {
    const empleadoId = req.params.id;
    const nuevoEmpleado = new Empleado(req.body); // { nombre: req.body.nombre, edad: req.body.edad, ... }
    nuevoEmpleado._id = empleadoId;
    Empleado.findByIdAndUpdate(empleadoId, nuevoEmpleado, { new: true })
        .then(empleadoActualizado => {
            res.status(200).json(empleadoActualizado);
        })
        .catch(error => {
            next(error);
        });
});

// DELETE de un empleado
router.delete('/:id', (req, res, next) => {
    const empleadoId = req.params.id;
    Empleado.findByIdAndDelete(empleadoId)
        .then(() => {
            return res.status(200).json(`Empleado con id ${empleadoId} eliminado`);
        })
        .catch(error => {
            next(error);
        });
});

module.exports = router;
