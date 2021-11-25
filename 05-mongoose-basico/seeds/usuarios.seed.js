const mongoose = require('mongoose');
const Usuario = require('../models/Usuario');
const dbConnection = require('../db/db');

const usuarios = [
    {
        "nombre": "Pepe",
        "apellido": "Jimenez",
        // "email" : "pjimenez@gmail.com",
        // "contrasena": "1234",
        "edad": 35
    },
    {
        "nombre": "Maria",
        "apellido": "Lopez",
        // "email" : "mlopez@yahoo.es",
        // "contrasena": "qwerty",
        "edad": 28
    },
    {
        "nombre": "Javier",
        // "email" : "javier@gmail.com",
        // "contrasena": "asdfg123",
        "edad": 33
    },
    {
        "nombre": "Luis",
        // "email" : "luis@gmail.com",
        // "contrasena": "asdfg123",
        "edad": 28
    },
    {
        "nombre": "Jaime",
        // "email" : "luis@gmail.com",
        // "contrasena": "asdfg123",
        "edad": 18
    },
    {
        "nombre": "Carla",
        // "email" : "luis@gmail.com",
        // "contrasena": "asdfg123",
        "edad": 16
    },
    {
        "nombre": "Jimena",
        // "email" : "luis@gmail.com",
        // "contrasena": "asdfg123",
        "edad": 45
    }
];

const usuariosDocuments = usuarios.map(usuario => new Usuario(usuario));

dbConnection
    // 1. Eliminar el contenido de esta colección en Mongo
    .then(async () => {
        const allUsuarios = await Usuario.find();
        if (allUsuarios.length > 0) {
            await Usuario.collection.drop();
        }
    })
    .catch((error) => console.error('Error eliminando colección Usuarios:', error))
    // 2. Añadir los usuarios de la semilla a la colección
    .then(async () => {
        await Usuario.insertMany(usuariosDocuments)
    })
    .catch((error) => console.error('Error al insertar en Usuario:', error))
    // 3. Desconectarnos
    .finally(() => mongoose.disconnect());
