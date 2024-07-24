const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cors= require('cors');
const invoiceRoutes = require('./routes/invoiceRoutes');

app.use(cors());

dotenv.config();
connectDB();

app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/invoices', invoiceRoutes);
app.get('/', (req, res) => {
    res.send('API is running...');
});

module.exports = app;
