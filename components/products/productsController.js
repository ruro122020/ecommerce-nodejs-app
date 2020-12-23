const express = require("express");
const router = express.Router();
const db = require("../../dbconfig");

//variables
const productCollection = "products";

router.get("/products", (req, res) => {
  db.getDB()
    .collection(productCollection)
    .find({})
    .toArray((err, documents) => {
      if (err) {
        console.log(err);
      } else {
        console.log(documents);
        res.json(documents);
      }
    });
});

module.exports = router;
