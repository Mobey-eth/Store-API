const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product Name must be provided"],
    trim: true,
    maxlength: [50, "Produt name cannot be more than 50 characters"],
  },
  price: {
    type: Number,
    required: [true, "Product Name must be provided"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    emum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "{VALUE} is not a supported company",
    },
  },
});

// product_Model = mongoose.model('Product', productSchema)

module.exports = mongoose.model("Product", productSchema);
