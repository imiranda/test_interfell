const axios = require('axios');
const { generateToken } = require('../services/jwtService');

const backend = axios.create({
  baseURL: process.env.BACKEND_URL
});

// Registro
exports.register = async (req, res) => {
  try {
    const response = await backend.post('/register', req.body);
    const token = generateToken({ documento: req.body.documento }); // Firmamos token local del BFF
    res.json({ ...response.data, token });
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { code: 500, message: 'Error interno' });
  }
};

// Recarga
exports.deposit = async (req, res) => {
  try {
    const response = await backend.post('/wallet/deposit', req.body);
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { code: 500, message: 'Error interno' });
  }
};

// Compra
exports.purchase = async (req, res) => {
  try {
    const response = await backend.post('/wallet/purchase', req.body);
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { code: 500, message: 'Error interno' });
  }
};

// Confirmación
exports.confirm = async (req, res) => {
  try {
    const response = await backend.post('/wallet/confirm', req.body);
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { code: 500, message: 'Error interno' });
  }
};

// Consulta de saldo
exports.balance = async (req, res) => {
  try {
    const response = await backend.get('/wallet/balance', { params: req.query });
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { code: 500, message: 'Error interno' });
  }
};

// Consulta de saldo
exports.login = async (req, res) => {
  try {
    const response = await backend.get('/wallet/balance', { params: req.body });
    const token = generateToken({ documento: req.body.documento });
    res.json({ ...response.data, token });
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { code: 500, message: 'Error interno' });
  }
};