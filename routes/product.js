const { Product } = require("../models/product");
const express = require("express");
const router = express.Router();

router.get(`/`, async (req, res) => {
  const productList = await Product.find();

  if (!productList) {
    res.status(500).json({ success: false });
  }
  res.send(productList);
});

router.post(`/`, async (req, res) => {
  let product = new Product({
    name: req.body.name,
  });

  product = await product.save();

  if (!product) return res.status(404).send("This product cannot be created");

  res.send(product);
});

router.delete("/:id", (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then((product) => {
      if (product) {
        return res.status(200).json({
          success: true,
          message: "This product has been deleted successfully",
        });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "This product has not been found" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

module.exports = router;
