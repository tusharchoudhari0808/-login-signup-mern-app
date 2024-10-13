const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter.js'); // Make sure the path is correct
require('dotenv').config();
require('./Models/db.js'); // Check that your DB connection file path is correct
const ProductRouter = require('./Routes/ProductRouter.js'); // Make sure the path 

const PORT = process.env.PORT || 8080;

// Test route to check if server is running
app.get('/ping', (req, res) => {
  res.send('PONG');
});
app.use(express.json());
app.use(bodyParser.json()); 
app.use(cors()); 
app.use('/auth', AuthRouter); 
app.use('/product', ProductRouter);

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
