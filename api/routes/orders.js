const express = require("express");
const router = express.Router();

// GET
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET requests to /orders"
  });
});

// POST
router.post("/", (req, res, next) => {
  const order = {
    productId: req.body.productId,
    quantity: req.body.quantity
  };
  res.status(201).json({
    message: "Handling POST requests to /orders",
    createdOrder: order
  });
});

// GET {id}
router.get("/:orderID", (req, res, next) => {
  const id = req.params.orderID;
  res.status(200).json({
    message: `The order ID is: ${id}`
  });
});

// DELETE
router.delete("/:orderID", (req, res, next) => {
  res.status(200).json({
    message: `Order deleted.`
  });
});

module.exports = router;
