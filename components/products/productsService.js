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

const addProductSL = async (productInfo) => {
  try {
    const product = {
      _id: ObjectID(),
      name: productInfo.name.toUpperCase(),
      description: productInfo.description,
      price: productInfo.price,
      quantity: productInfo.quantity,
      discounts: productInfo.discounts,
      SEO: productInfo.SEO,
      date: new Date(),
    };
    const result = await addProductDAL(product);
    if (result === 1) {
      return { msg: "product has been added", code: 1 };
    } else if (result === 2) {
      return { msg: "product already exist", code: 2 };
    } else {
      return { msg: "something went wrong", code: 3 };
    }
  } catch (err) {
    console.log("err product Service.js", err);
  }
};

module.exports = { geProductsSL, addProductSL };
