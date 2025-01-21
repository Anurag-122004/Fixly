const express = require('express');
const { createBid, getBids, updateBidStatus } = require('../controllers/bidController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', protect, createBid);
router.get('/:reportId', protect, getBids);
router.patch('/:id', protect, updateBidStatus);

module.exports = router;