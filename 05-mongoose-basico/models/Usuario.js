const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, },
    // email: { type: String, required: true },
    // contrasena: { type: String, required: true },
    edad: { type: Number, required: true },
}, {
    timestamps: true
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
