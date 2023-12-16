const express = require("express");

const router = express.Router();

const {
  getAllProducts,
  getAllProductsStatic,
  mobiTestingRoute,
} = require("../controllers/products");

// we router.route() first then we can call the Http methods
router.route("/").get(getAllProducts);
router.route("/static").get(getAllProductsStatic);
router.route("/mobi").get(mobiTestingRoute);

module.exports = router;
