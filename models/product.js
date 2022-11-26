const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

exports.Product = mongoose.model("Product", productSchema);
