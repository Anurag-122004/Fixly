// filepath: backend/src/routes/issueRoutes.js
const express = require('express');
const { createReport, getReports, updateReportStatus } = require('../controllers/issueController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', protect, createReport);
router.get('/', protect, getReports);
router.patch('/:id', protect, updateReportStatus);

module.exports = router;