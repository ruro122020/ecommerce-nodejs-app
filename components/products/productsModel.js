const db = require("../../dbconfig");
const productsCollection = "products";

const checkIfProductExist = async (productInfo) => {
  return new Promise(async (resolve, reject) => {
    const productName = productInfo.name;
    const dbState = db.getDB();
    const collection = await dbState.collection(productsCollection);
    const findProduct = await collection.find({
      name: productName,
    });
    const product = await findProduct.toArray((err, product) => {
      if (err) reject(err);
      if (product.length === 0) {
        return resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};

module.exports = { checkIfProductExist };
