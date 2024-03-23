require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const clientRoutes = require('./routes/client');
const categoryRoutes = require('./routes/catgeory')
const productItemRoutes = require('./routes/productItem')
const orderRoutes= require("./routes/order")
const orderDetailRoutes= require("./routes/orderDetail")
const reviewRoutes= require("./routes/review")
const vendorRoutes= require("./routes/vendor")

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/client', clientRoutes);
app.use('/api/vendor', vendorRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/product_item', productItemRoutes)
app.use('/api/order', orderRoutes)
app.use("/api/order_detail", orderDetailRoutes)
app.use("/api/review", reviewRoutes)

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
