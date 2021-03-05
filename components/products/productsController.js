const express = require("express");
const router = express.Router();

const { geProductsSL, addProductSL } = require("./productsService");

router.get("/products", async (req, res) => {
  try {
    const products = await geProductsSL();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/product", async (req, res) => {
  try {
    const productInfo = req.body;
    const results = await addProductSL(productInfo);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({
      msg: err,
    });
  }
});
module.exports = router;
