// filepath: backend/src/routes/authRoutes.js
const express = require('express');
const { register, login, logout, sendVerifyOtp, verifyEmail, isAuthenticated, sendResetOtp, resetPassword} = require('../controllers/authControllerNew.js');
const userAuth = require('../middlewares/userAuth');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/send-verify-otp',userAuth, sendVerifyOtp);
router.post('/verify-account', userAuth, verifyEmail);
router.post('/is-auth', userAuth, isAuthenticated);
router.post('/send-reset-otp', sendResetOtp);
router.post('/reset-password', resetPassword);


module.exports = router;