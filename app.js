// async errors - express-async-errors
require("express-async-errors");

const express = require("express");
const app = express();

const connectDB = require("./db/connect");

const productsRouter = require("./routes/products");
const notfoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

require("dotenv").config();

const port = process.env.PORT || 3000;

// middleware
app.use(express.json());

// routes handler

app.get("/", (req, res) => {
  res.send(`<h1>Store API</h1><a href="/api/vi/products"> Products </a>`);
});

app.use("/api/vi/products", productsRouter);

// products routes

app.use(notfoundMiddleware);
app.use(errorMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listeninig on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};

// console.log("Connection URI: ", process.env.MONGO_URI);
start();
