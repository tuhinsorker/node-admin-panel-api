require('dotenv').config();
const express = require('express');
const app = express();

const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const errorHandler = require('./middleware/errorHandler');

const userRoutes = require('./routes/userRoutes');
const productRoute = require('./routes/productRoute');
const dashboardRoute = require('./routes/dashboardRoute');
const reportRoute = require('./routes/reportRoute');

app.use(helmet());
app.disable('x-powered-by');

app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));


app.use(express.json({ limit: '10kb' }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, 
  message: {
    success: false,
    message: 'Too many requests, try again later'
  }
});

app.use('/api',limiter);

app.use('/uploads', express.static('uploads'));




app.use('/api', userRoutes);
app.use('/api', productRoute);
app.use('/api', dashboardRoute);
app.use('/api', reportRoute);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

