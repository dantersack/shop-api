const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Product = require("../models/product");

// GET
router.get("/", (req, res, next) => {
  Product.find()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
});

// POST
router.post("/", (req, res, next) => {
  const product = new Product({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });

  product
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        createdProduct: product
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
});

// GET {id}
router.get("/:productID", (req, res, next) => {
  const id = req.params.productID;
  Product.findById(id)
    .then(doc => {
      console.log(doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
});

// PATCH {id}
router.patch("/:productID", (req, res, next) => {
  Product.findByIdAndUpdate(req.params.productID, {
    name: req.body.name,
    price: req.body.price
  })
    .then(result => {
      console.log(result);
      res.status(200).json({ message: "Product updated" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
});

// DELETE {id}
router.delete("/:productID", (req, res, next) => {
  Product.deleteOne({ _id: req.params.productID })
    .then(result => {
      console.log(result);
      res.status(200).json({ message: "Product deleted" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
