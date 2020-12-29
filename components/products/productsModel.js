const db = require("../../dbconfig");
const productsCollection = "products";

const checkIfProductExist = async (productInfo) => {
  return new Promise(async (resolve, reject) => {
    const productName = productInfo.productName;
    const dbState = db.getDB();
    const collection = await dbState.collection(productsCollection);
    const findUser = await collection.find({
      productName: productName,
    });
    const user = await findUser.toArray((err, user) => {
      if (err) reject(err);
      if (user.length === 0) {
        return resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};

module.exports = { checkIfProductExist };
