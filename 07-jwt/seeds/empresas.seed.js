const mongoose = require('mongoose');
const Empresa = require('../models/Empresa');
const { dbConnection } = require('../db/db');

const empresas = [
    {
        "nombre": "Saneamientos Paco",
        "cif": "B123456789"
    },
    {
        "nombre": "Upgrade",
        "cif": "B456789123",
    },
];

const empresasDocuments = empresas.map(empresa => new Empresa(empresa));

dbConnection
    // 1. Eliminar el contenido de esta colección en Mongo
    .then(async () => {
        const allEmpresas = await Empresa.find();
        if (allEmpresas.length > 0) {
            await Empresa.collection.drop();
        }
    })
    .catch((error) => console.error('Error eliminando colección Empresas:', error))
    // 2. Añadir los empresas de la semilla a la colección
    .then(async () => {
        await Empresa.insertMany(empresasDocuments)
    })
    .catch((error) => console.error('Error al insertar en Empresa:', error))
    // 3. Desconectarnos
    .finally(() => mongoose.disconnect());
