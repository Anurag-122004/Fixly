const express = require('express');
const { createNotification, getNotifications, markAsRead } = require('../controllers/notificationController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', protect, createNotification);
router.get('/', protect, getNotifications);
router.patch('/:id', protect, markAsRead);

module.exports = router;