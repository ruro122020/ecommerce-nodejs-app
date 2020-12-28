const express = require("express");
const productsController = express.Router();
const db = require("../../dbconfig");
const { geProductsSL, addProductSL } = require("./productsService");

productsController.get("/products", async (req, res) => {
  try {
    const products = await geProductsSL();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

productsController.post("/product", async (req, res) => {
  try {
    const product = req.body;
    const response = await addProductSL(product);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({
      msg: err,
    });
  }
});
module.exports = productsController;
