const mongoose = require('mongoose');

const sesionSchema = new mongoose.Schema({
  clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
  token: String,
  createdAt: { type: Date, default: Date.now, expires: 300 } // expira en 5 minutos
});

module.exports = mongoose.model('Sesion', sesionSchema);