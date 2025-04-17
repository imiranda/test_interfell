const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/proxyController');
const auth = require('../middlewares/authMiddleware');

router.post('/register', ctrl.register);
router.post('/wallet/deposit', auth, ctrl.deposit);
router.post('/wallet/purchase', auth, ctrl.purchase);
router.post('/wallet/confirm', auth, ctrl.confirm);
router.get('/wallet/balance', auth, ctrl.balance);
router.post('/login', ctrl.login);

module.exports = router;
