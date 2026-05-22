const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('./config/mongoose.js');

const routes = require('./routes/routes.tasks');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 7680;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to TaskFlow API!');
});
app.use('/api/tasks', routes);


app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});