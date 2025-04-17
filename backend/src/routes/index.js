const express = require('express');
const router = express.Router();
const registroController = require('../controllers/registroCliente');
const walletController = require('../controllers/walletController');

router.post('/register', registroController.registrar);
router.post('/wallet/deposit', walletController.depositar);
router.post('/wallet/purchase', walletController.generarCompra);
router.post('/wallet/confirm', walletController.confirmarCompra);
router.get('/wallet/balance', walletController.consultarSaldo);

module.exports = router;