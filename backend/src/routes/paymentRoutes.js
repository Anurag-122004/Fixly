const express = require('express');
const { createPayment, handleWebhook, getPaymentHistory } = require('../controllers/paymentController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', protect, createPayment);
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);
router.get('/history', protect, getPaymentHistory);

module.exports = router;