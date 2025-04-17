const Cliente = require('../models/Cliente');
const Sesion = require('../models/Sesion');
const generateToken = require('../utils/tokenGenerator');
const { sendToken } = require('../services/emailService');

exports.depositar = async (req, res) => {
  try {
    const { documento, celular, valor } = req.body;

    if (!documento || !celular || !valor) {
      return res.status(400).json({ code: 400, message: 'Datos incompletos' });
    }

    const cliente = await Cliente.findOne({ documento, celular });
    if (!cliente) {
      return res.status(404).json({ code: 404, message: 'Cliente no encontrado' });
    }

    cliente.saldo += Number(valor);
    await cliente.save();

    res.json({ code: 200, message: 'Recarga exitosa' });
  } catch (err) {
    res.status(500).json({ code: 500, message: 'Error interno', error: err.message });
  }
};

exports.generarCompra = async (req, res) => {
  try {
    const { documento, celular } = req.body;

    if (!documento || !celular) {
      return res.status(400).json({ code: 400, message: 'Datos incompletos' });
    }

    const cliente = await Cliente.findOne({ documento, celular });
    if (!cliente) {
      return res.status(404).json({ code: 404, message: 'Cliente no encontrado' });
    }

    const token = generateToken();

    console.log(`token: ${token}`);    

    const nuevaSesion = await Sesion.create({
      clienteId: cliente._id,
      token,
    });

    // Enviar correo
    await sendToken(cliente.email, token);

    res.json({
      code: 200,
      message: 'Se ha enviado un token de confirmación al correo del cliente.',
      sessionId: nuevaSesion._id,
    });
  } catch (err) {
    res.status(500).json({ code: 500, message: 'Error interno', error: err.message });
  }
};

exports.confirmarCompra = async (req, res) => {
  try {
    const { sessionId, token, valor } = req.body;

    if (!sessionId || !token || !valor) {
      return res.status(400).json({ code: 400, message: 'Datos incompletos' });
    }

    const sesion = await Sesion.findById(sessionId);
    if (!sesion || sesion.token !== token) {
      return res.status(401).json({ code: 401, message: 'Token inválido o sesión no encontrada' });
    }

    const cliente = await Cliente.findById(sesion.clienteId);
    if (!cliente) {
      return res.status(404).json({ code: 404, message: 'Cliente no encontrado' });
    }

    if (cliente.saldo < valor) {
      return res.status(400).json({ code: 400, message: 'Saldo insuficiente' });
    }

    cliente.saldo -= Number(valor);
    await cliente.save();

    // Elimina la sesión usada
    await sesion.deleteOne();

    res.json({ code: 200, message: 'Compra confirmada, saldo descontado' });
  } catch (err) {
    res.status(500).json({ code: 500, message: 'Error interno', error: err.message });
  }
};

exports.consultarSaldo = async (req, res) => {
  try {
    const { documento, celular } = req.query;

    if (!documento || !celular) {
      return res.status(400).json({ code: 400, message: 'Datos incompletos' });
    }

    const cliente = await Cliente.findOne({ documento, celular });
    if (!cliente) {
      return res.status(404).json({ code: 404, message: 'Cliente no encontrado' });
    }

    res.json({ code: 200, saldo: cliente.saldo });
  } catch (err) {
    res.status(500).json({ code: 500, message: 'Error interno', error: err.message });
  }
};