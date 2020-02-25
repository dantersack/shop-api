const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Product = require("../models/product");

// GET
router.get("/", (req, res, next) => {
  Product.find()
    .select("-__v") // equivalent to .select("_id name price")
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            ...doc._doc,
            request: {
              type: "GET",
              url: `http://localhost:3000/products/${doc._id}`
            }
          };
        })
      };
      res.status(200).json(response);
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
      res.status(201).json({
        createdProduct: {
          id: result._id,
          name: result.name,
          price: result.price,
          request: {
            type: "GET",
            url: `http://localhost:3000/products/${result._id}`
          }
        }
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
    .select("-__v")
    .then(doc => {
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
      res.status(200).json({
        updatedProduct: {
          name: req.body.name,
          price: req.body.price,
          request: {
            type: "GET",
            url: `http://localhost:3000/products/${result._id}`
          }
        }
      });
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
      res.status(200).json({ message: "Product deleted" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
