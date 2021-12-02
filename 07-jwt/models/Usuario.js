const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    // Otra información de cara a registro (nombre, direccion, ...)
}, {
    timestamps: true,
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
