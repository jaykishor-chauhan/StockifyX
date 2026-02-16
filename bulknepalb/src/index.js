const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// connect DB
connectDB();

app.use('/bulknepal/api/v1/nepselive/market', require('./routes/home'));
app.use('/bulknepal/api/v1/cdsc/application', require('./routes/ipo'));
app.use('/bulknepal/api/v1/auth', require('./routes/auth'));
// simple health
app.get('/', (req, res) => res.json({ success: true, message: "BulkNepal API is running.." }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`BulkNepal server running on port ${PORT}`));
