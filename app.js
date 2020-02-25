const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");

// DB Connection
mongoose
  .connect(
    `mongodb+srv://dante:${process.env.MONGO_ATLAS_PASSWORD}@shop-api-cluster-qvlun.mongodb.net/test?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(result =>
    console.log(
      `MongoDB Connected to db=${result.connections[0].name}:host=${result.connections[0].host} `
    )
  )
  .catch(err => console.log(err));

/*
 * Middlewares
 */

// Logger Middleware
app.use(morgan("dev"));

// Body-Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Handling CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // '*' gives access to any origin
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

// Routes
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

// Handling Errors
app.use((req, res, next) => {
  const error = new Error("404 - Not found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: { message: err.message }
  });
});

module.exports = app;
