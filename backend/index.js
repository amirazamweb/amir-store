const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/db');
const authRouter = require('./routes/authRoutes');
const productRouter = require('./routes/productRoutes');


dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/product', productRouter);

const PORT = 8080 || process.env.PORT

connectDB();

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`.bgCyan.white);
})
