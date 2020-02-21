const express = require("express");

const app = express();

// next moves the request to the next middleware in line
app.use((req, res, next) => {
  res.status(200).json({
    message: "hello there"
  });
});

module.exports = app;
