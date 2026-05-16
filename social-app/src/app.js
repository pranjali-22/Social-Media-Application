const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
connectDB();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', require('./routes/auth.routes'));

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ success: false, error: { message: err.message || 'Internal server error' } });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));