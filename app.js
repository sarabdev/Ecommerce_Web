require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const clientRoutes = require('./routes/client');
const categoryRoutes = require('./routes/catgeory')
const productItemRoutes = require('./routes/productItem')

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/client', clientRoutes);
app.use('/api/categories', categoryRoutes)
app.use('/api/productItem', productItemRoutes)

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
