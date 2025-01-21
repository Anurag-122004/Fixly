const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ verify: (req, res, buf) => { req.rawBody = buf; } }));

// Routes
const authRoutes = require('./src/routes/authRoutes');
const issueRoutes = require('./src/routes/issueRoutes');
const bidRoutes = require('./src/routes/bidRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');
const notificationRoutes = require('./src/routes/notificationRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/issues', issueRoutes);
app.use('/api/bids', bidRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/notifications', notificationRoutes);

module.exports = app;
