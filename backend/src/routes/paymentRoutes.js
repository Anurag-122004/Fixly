const express = require('express');
const { createPayment, getPaymentHistory } = require('../controllers/paymentController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', protect, createPayment);
router.get('/history', protect, getPaymentHistory);
module.exports = router;