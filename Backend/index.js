require('dotenv').config();

const connectToMongo = require('./db')
connectToMongo();

const express = require('express')
const app = express()
const port = process.env.PORT || 3001

const cors = require('cors')
const router = require('./Routes/router')
const authRouter = require('./Routes/auth')

// Updated CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(authRouter);
app.use(router);

app.get('/', (req, res) => {
  res.send('Inventory Management System API is running!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})