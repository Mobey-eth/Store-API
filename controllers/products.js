const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const search = "ab";
  const products = await Product.find({
    name: { $regex: search, $options: "i" },
  }); // to find single item by property
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  //console.log(req.query);
  const { featured, company, name, sort, display } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  let result = Product.find(queryObject);
  if (sort) {
    // sorting ...
    let sortQuery = sort.split(",").join(" ");
    console.log(sortQuery);
    result = result.sort(sortQuery);
  } else {
    result = result.sort("createdAt");
  }
  // To select fields to display
  let displayResult = null;
  if (display) {
    // we use select methods to select fields to display on the request response
    let displayQuery = display.split(",").join(" ");
    displayResult = result.select(displayQuery);
  }

  const products = displayResult != null ? await displayResult : await result;
  res.status(200).json({ nbHits: products.length, products });
};

const mobiTestingRoute = async (req, res) => {
  // implementing sorting
  let { sort } = req.query;
  let products;
  if (sort) {
    products = await Product.find({}).sort(sort);
  } else {
    products = await Product.find({});
  }
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = { getAllProducts, getAllProductsStatic, mobiTestingRoute };

/**
 * In order to sort data coming from monggo DB, we could apply methods such as {{Url}}?sort=name
 * const mobiTestingRoute = async (req, res) => {
  // implementing sorting
  let { sort, order } = req.query;
  order = parseInt(order);
  let products;
  if (sort && order) {
    products = await Product.find({}).sort({ [sort]: order });
  } else {
    products = await Product.find({});
  }
  res.status(200).json({ products, nbHits: products.length });
};
 */

// Old method worked?...
/**
 * 
 * const getAllProducts = async (req, res) => {
  //   throw new Error("Error getting all products");

   // throw new Error("Testing Async Errors");
  //const products = await Product.find({ featured: true }); // to find all featured
    // const products = await Product.find({ name: "vase table" }); // to find single item by property (Hardcoded)

  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (err) {
    console.log(err);
  }
};
 */
