const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  documento: { type: String, required: true, unique: true },
  nombres: { type: String, required: true },
  email: { type: String, required: true },
  celular: { type: String, required: true },
  saldo: { type: Number, default: 0 },
});

module.exports = mongoose.model('Cliente', clienteSchema);