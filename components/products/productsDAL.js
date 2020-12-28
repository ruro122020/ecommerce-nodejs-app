const db = require("../../dbconfig");

//variables
const productsCollection = "products";

//get list of all products
const getProductsDAL = async () => {
  try {
    return new Promise(async (resolve, reject) => {
      const dbState = db.getDB();
      const collection = await dbState.collection(productsCollection);
      const find = await collection.find({});
      const results = await find.toArray((err, products) => {
        if (err) reject(err);
        resolve(products);
      });
    });
  } catch (err) {
    console.log("error in productsDAL", err);
  }
};
//add new product to database
const addProductDAL = async (productInfo) => {
  /*
  note: make sure product doesn't already exist
  */
  return new Promise(async (resolve, reject) => {
    const dbState = db.getDB();
    const collection = await dbState.collection(productsCollection);
    const insertProduct = await collection.insertOne(
      productInfo,
      (err, response) => {
        if (err) reject(err);
        if (response.result.ok === 1) {
          resolve(response.result.ok);
        }
      }
    );
  });
};
module.exports = { getProductsDAL, addProductDAL };
