const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
const allowedOrigins = ['http://localhost:5173' ]

// Middleware
app.use(cors({origin : allowedOrigins,credentials: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ verify: (req, res, buf) => { req.rawBody = buf; } }));
app.use(cookieParser());  // <-- Add this line to parse cookies

// Routes
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const issueRoutes = require('./src/routes/issueRoutes');
const bidRoutes = require('./src/routes/bidRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');
const notificationRoutes = require('./src/routes/notificationRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/issues', issueRoutes);
app.use('/api/bids', bidRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/notifications', notificationRoutes);

module.exports = app;
