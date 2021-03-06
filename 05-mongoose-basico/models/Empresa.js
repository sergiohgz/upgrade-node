const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const empresaSchema = new Schema({
    nombre: { type: String, required: true },
    cif: { type: String, required: true },
    // Definimos la propiedad empleados como un array de ids
    // de Usuario creando un enlace entre ambas colecciones
    empleados: [{ type: mongoose.Types.ObjectId, ref: 'Usuario' }],
});

const Empresa = mongoose.model('Empresa', empresaSchema);

module.exports = Empresa;
