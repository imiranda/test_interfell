const Cliente = require('../models/Cliente');

exports.registrar = async (req, res) => {
  try {
    const { documento, nombres, email, celular } = req.body;

    const existe = await Cliente.findOne({ documento });
    if (existe) return res.status(400).json({ code: 400, message: 'Cliente ya registrado' });

    const nuevo = new Cliente({ documento, nombres, email, celular });
    await nuevo.save();

    res.json({ code: 200, message: 'Cliente registrado exitosamente' });
  } catch (err) {
    res.status(500).json({ code: 500, message: 'Error interno', error: err.message });
  }
};
