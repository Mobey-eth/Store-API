require("dotenv").config();
const connectDB = require("./db/connect");
const Product = require("./models/product");

const JsonProducts = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to DB");
    await Product.deleteMany();
    await Product.create(JsonProducts);
    console.log("Product created");
    process.exit(0);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

start();
