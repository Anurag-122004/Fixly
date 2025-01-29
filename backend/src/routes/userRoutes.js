const express = require('express');
const userAuth = require('../middlewares/userAuth.js');
const { getUserData } = require('../controllers/userController.js');

const router = express.Router();

router.get('/data', userAuth, getUserData);

module.exports = router;