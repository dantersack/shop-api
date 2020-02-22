const express = require("express");
const app = express();

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");

// next moves the request to the next middleware in line
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

module.exports = app;
