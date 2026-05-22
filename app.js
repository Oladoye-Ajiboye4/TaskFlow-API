const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('./config/mongoose.js');
const rateLimit = require('express-rate-limit');

const routes = require('./routes/routes.tasks');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 7680;

app.set('trust proxy', 1);
app.use(cors());
app.use(express.json());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use('/api/', apiLimiter);

app.get('/', (req, res) => {
  res.send('Welcome to TaskFlow API!');
});
app.use('/api/tasks', routes);


app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});