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
const adPlacementRoutes= require("./routes/adPlacement")
const adPerformanceRoutes= require("./routes/adPerformance")
const shippingInfoRoutes= require("./routes/shippingInfo")
const verifyAuth= require("./middleware/verifyAuth")

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/client', clientRoutes);
app.use('/api/vendor', vendorRoutes)
app.use('/api/categories',verifyAuth, categoryRoutes)
app.use('/api/product_item', verifyAuth, productItemRoutes)
app.use('/api/order', verifyAuth, orderRoutes)
app.use("/api/order_detail",verifyAuth, orderDetailRoutes)
app.use("/api/review",verifyAuth, reviewRoutes)
app.use("/api/products_from_vendor", verifyAuth, productsFromVendorRoutes)
app.use("/api/payment_transaction",verifyAuth, paymentTransactionRoutes)
app.use("/api/user_activity",verifyAuth, userActivityRoutes)
app.use("/api/advertiser",verifyAuth, advertiserRoutes)
app.use("/api/advertisement",verifyAuth, advertisementRoutes)
app.use("/api/ad_placement",verifyAuth, adPlacementRoutes)
app.use("/api/ad_performance",verifyAuth, adPerformanceRoutes)
app.use("/api/shipping_info",verifyAuth, shippingInfoRoutes)

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
