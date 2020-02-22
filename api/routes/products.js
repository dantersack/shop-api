const express = require("express");
const router = express.Router();

// GET
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET requests to /products"
  });
});

// POST
router.post("/", (req, res, next) => {
  res.status(201).json({
    message: "Handling POST requests to /products"
  });
});

// GET {id}
router.get("/:productID", (req, res, next) => {
  const id = req.params.productID;
  res.status(200).json({
    message: `The product ID is: ${id}`
  });
});

// PATCH
router.patch("/:productID", (req, res, next) => {
  res.status(200).json({
    message: `Product updated.`
  });
});

// DELETE
router.delete("/:productID", (req, res, next) => {
  res.status(200).json({
    message: `Product deleted.`
  });
});

module.exports = router;
