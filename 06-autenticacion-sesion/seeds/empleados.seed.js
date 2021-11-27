const mongoose = require('mongoose');
const Empleado = require('../models/Empleado');
const { dbConnection } = require('../db/db');

const empleados = [
    {
        "nombre": "Pepe",
        "apellido": "Jimenez",
        "edad": 35
    },
    {
        "nombre": "Maria",
        "apellido": "Lopez",
        "edad": 28
    },
    {
        "nombre": "Javier",
        "edad": 33
    },
    {
        "nombre": "Luis",
        "edad": 28
    },
    {
        "nombre": "Jaime",
        "edad": 18
    },
    {
        "nombre": "Carla",
        "edad": 16
    },
    {
        "nombre": "Jimena",
        "edad": 45
    }
];

const empleadosDocuments = empleados.map(empleado => new Empleado(empleado));

dbConnection
    // 1. Eliminar el contenido de esta colección en Mongo
    .then(async () => {
        const allEmpleados = await Empleado.find();
        if (allEmpleados.length > 0) {
            await Empleado.collection.drop();
        }
    })
    .catch((error) => console.error('Error eliminando colección Empleados:', error))
    // 2. Añadir los empleados de la semilla a la colección
    .then(async () => {
        await Empleado.insertMany(empleadosDocuments)
    })
    .catch((error) => console.error('Error al insertar en Empleado:', error))
    // 3. Desconectarnos
    .finally(() => mongoose.disconnect());
