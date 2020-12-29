const ObjectID = require("mongodb").ObjectId;
const { getProductsDAL, addProductDAL } = require("../products/productsDAL");

const geProductsSL = async () => {
  try {
    const products = await getProductsDAL();
    return products;
  } catch (err) {
    return err;
  }
};

const addProductSL = async (product) => {
  try {
    const productInfo = {
      _id: ObjectID(),
      name: product.name,
      description: product.description,
      price: product.price,
      discounts: product.discounts,
      SEO: product.SEO,
      date: new Date(),
    };
    //check to see if product already exist

    const addToListOfProducts = await addProductDAL(productInfo);
    return addToListOfProducts;
  } catch (err) {
    console.log("err product Service.js", err);
  }
};

module.exports = { geProductsSL, addProductSL };
