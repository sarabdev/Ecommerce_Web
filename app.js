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
const productsFromVendorRoutes= require("./routes/productsFromVendor")
const paymentTransactionRoutes= require("./routes/paymentTransaction")
const userActivityRoutes= require("./routes/userActivity")
const advertiserRoutes= require("./routes/advertiser")
const advertisementRoutes= require("./routes/advertisement")

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
app.use("/api/products_from_vendor", productsFromVendorRoutes)
app.use("/api/payment_transaction", paymentTransactionRoutes)
app.use("/api/user_activity", userActivityRoutes)
app.use("/api/advertiser", advertiserRoutes)
app.use("/api/advertisement", advertisementRoutes)

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
